/**
@license https://github.com/t2ym/i18n-number/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
/**
`<i18n-number>` renders a number in international formats by Intl.NumberFormat 
(http://www.ecma-international.org/ecma-402/1.0/#sec-11.1) object.
If Intl.NumberFormat is unavailable, [Intl.js Polyfill](https://github.com/andyearnshaw/Intl.js) and 
its locale modules are dynamically loaded as a fallback.

    <i18n-number lang="en"
                 options='{ "style": "currency", "currency": "USD" }'
                 offset="1"
                 >123456.78</i18n-number>

This example renders the following number string.

    $123,455.78

@element i18n-number
@hero hero.svg
@demo demo/index.html
*/
import { polyfill } from 'wc-putty/polyfill.js';
import { html, render } from 'lit-html/lit-html.js';

const formatCache = new Map();

export class I18nNumber extends polyfill(HTMLElement) {
  static get is() {
    return 'i18n-number';
  }

  static get observedAttributes() {
    return [ 'lang', 'options', 'offset' ];
  }

  __render() {
    return html`<span id="number">${this.formatted || ''}</span>`;
  }

  /**
   * Fired whenever the formatted text is rendered.
   *
   * @event rendered
   */

  constructor() {
    super();
    /**
     * Default locale constant 'en'
     */
    this.DEFAULT_LANG = 'en';
    /**
     * The locale for the formatted number.
     * The typical value is bound to `{{effectiveLang}}` when the containing element has
     * `BehaviorsStore.I18nBehavior`.
     */
    //this.lang = this.DEFAULT_LANG; // put off to connectedCallback
    /**
     * Offset for number
     *
     * Note: number = rawNumber - offset 
     */
    this.offset = 0;
    /**
     * Raw string synchronized with textContent
     */
    //this.raw = undefined;
    /**
     * Options object for Intl.NumberFormat 
     * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
     */
    //this.options = undefined;
    /**
     * Raw number parsed from raw
     */
    //this.rawNumber = undefined;
    /**
     * Number calculated from rawNumber and offset
     */
    //this.number = undefined;
    /**
     * Formatted string rendered for UI
     */
    //this.formatted = undefined;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'lang':
      this._langChanged(newValue);
      break;
    case 'options':
      try {
        this.options = JSON.parse(newValue);
      }
      catch (ex) {
        this.options = undefined;
      }
      break;
    case 'offset':
      this.offset = parseInt(newValue);
      break;
    /* istanbul ignore next */
    default:
      /* istanbul ignore next */
      break;
    }
  }

  /**
   * root property to imitate a Polymer element
   */
  get root() {
    return this.shadowRoot;
  }

  /**
   * options property for options object for Intl.NumberFormat
   * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
   *
   * Note: _optionsChanged() is called on every change
   */
  get options() {
    return this._options;
  }

  set options(value) {
    this._optionsChanged(this._options = value);
  }

  /**
   * raw property to store a raw number string from textContent
   *
   * Note: _rawChanged() is called on every change
   */
  get raw() {
    return this._raw;
  }

  set raw(value) {
    this._rawChanged(this._raw = value);
  }

  /**
   * Offset for number
   *
   * Note:
   *  - Calculation: number = rawNumber - offset
   *  - _offsetChanged() is called on every change
   */
  get offset() {
    return this._offset;
  }

  set offset(value) {
    this._offsetChanged(this._offset = value);
  }

  /**
   * connectedCallback for custom elements
   *
   * Tasks:
   *  - Sets this.lang if not set
   *  - Sets up observers if not set up
   *  - Sets this.raw from this.textNode.data
   *  - Triggers rendering
   */
  connectedCallback() {
    if (!this.lang) {
      this.lang = this.DEFAULT_LANG;
    }
    if (!this.observer) {
      this._setupObservers();
    }
    this.raw = this.textNode.data;
    this.invalidate();
  }

  /**
   * Sets up observers of textContent mutations
   */
  _setupObservers() {
    let i = 0;
    do {
      this.textNode = this.childNodes[i++];
      if (!this.textNode) {
        this.textNode = this.childNodes[0];
        break;
      }
    }
    while (this.textNode.nodeType !== this.textNode.TEXT_NODE);
    if (!this.textNode) {
      this.appendChild(document.createTextNode(''));
      this.textNode = this.childNodes[0];
    }
    this.observer = new MutationObserver(this._textMutated.bind(this));
    this.observer.observe(this.textNode, { characterData: true });
    this.nodeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function(mutation) {
        switch (mutation.type) {
        case 'childList':
          let i = 0;
          do {
            if (mutation.addedNodes[i] &&
                mutation.addedNodes[i].nodeType === mutation.addedNodes[i].TEXT_NODE) {
              this.textNode = mutation.addedNodes[i];
              this.raw = this.textNode.data;
              //console.log('i18n-number: text node added with ' + this.raw);
              this.observer.observe(this.textNode, { characterData: true });
              break;
            }
            i++;
          }
          while (i < mutation.addedNodes.length);
          break;
        /* istanbul ignore next */
        default:
          /* istanbul ignore next: mutation.type is characterData or attributes */
          break;
        }
      }, this);
    }.bind(this));
    this.nodeObserver.observe(this, { childList: true });
  }

  /**
   * MutationObserver callback of the child text node to re-render on text mutations.
   *
   * @param {Array} mutations Array of MutationRecord (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
   */
  _textMutated(mutations) {
    mutations.forEach(function(mutation) {
      switch (mutation.type) {
      case 'characterData':
        //console.log('i18n-number: _textMutated: raw = ' + mutation.target.data);
        if (this.raw !== mutation.target.data) {
          this.raw = mutation.target.data;
        }
        break;
      /* istanbul ignore next: mutation.type is characterData */
      default:
        /* istanbul ignore next: mutation.type is characterData */
        break;
      }
    }, this);
  }

  /**
   * Observer of `raw` property to re-render the formatted number.
   *
   * @param {string} raw New raw number string.
   */
  _rawChanged(raw) {
    if (this.textNode) {
      if (raw !== this.textNode.data) {
        this.textNode.data = raw;
      }
      //console.log('i18n-number: _rawChanged: raw = ' + raw);
      this._render(this.lang, this.options, raw, this.offset);
    }
  }

  /**
   * Observer of `lang` property to re-render the formatted number.
   *
   * @param {string} lang New locale.
   */
  _langChanged(lang) {
    if (!lang || lang === 'null') {
      this.lang = this.DEFAULT_LANG;
      lang = this.lang;
    }
    if (this.textNode) {
      //console.log('i18n-number: _langChanged: lang = ' + lang);
      this._render(lang, this.options, this.raw, this.offset);
    }
  }

  /**
   * Observer of `options` property to re-render the formatted number.
   *
   * @param {Object} options New options for Intl.NumberFormat.
   */
  _optionsChanged(options) {
    if (this.textNode) {
      //console.log('i18n-number: _optionsChanged: options = ' + JSON.stringify(options));
      this._render(this.lang, options, this.raw, this.offset);
    }
  }

  /**
   * Partially emulates notifyPath() in Polymer library
   * Just calls _onOptionsPropertyChanged() to re-render
   */
  notifyPath(path, value) {
    this._onOptionsPropertyChanged();
  }

  /**
   * Observer of `options` sub-properties to re-render the formatted number.
   */
  _onOptionsPropertyChanged(/* changeRecord */) {
    if (this.textNode) {
      //console.log('_onOptionsPropertyChanged: path = ' + changeRecord.path + ' value = ' + JSON.stringify(changeRecord.value));
      this._render(this.lang, this.options, this.raw, this.offset);
    }
  }

  /**
   * Observer of `offset` property to re-render the formatted number.
   *
   * @param {number} offset New offset.
   */
  _offsetChanged(offset) {
    if (this.textNode) {
      //console.log('i18n-number: _offsetChanged: offset = ' + offset);
      this._render(this.lang, this.options, this.raw, offset);
    }
  }

  /**
   * Gets a cached Intl.NumberFormat object
   *
   * @param {string} lang Locale for formatting.
   * @param {Object} options Options for Intl.NumberFormat.
   * @return {Object} Intl.NumberFormat object.
   */
  _getNumberFormatObject(lang, options) {
    if (!lang || lang === 'null') {
      lang = this.DEFAULT_LANG;
    }
    let formatId = lang + JSON.stringify(options);
    let formatObject = formatCache.get(formatId);
    if (!formatObject) {
      formatObject = new Intl.NumberFormat(lang, options);
      formatCache.set(formatId, formatObject);
    }
    return formatObject;
  }

  /**
   * Formats the number
   *
   * @param {string} lang Locale for formatting.
   * @param {Object} options Options for Intl.NumberFormat.
   * @param {number} number Number to format.
   * @return {string} Formatted number string.
   */
  _formatNumber(lang, options, number) {
    if (!lang) {
      lang = this.DEFAULT_LANG;
    }
    try {
      return this._getNumberFormatObject(lang, options).format(number);
    }
    catch (e) {
      return number.toString();
    }
  }

  /**
   * Renders the formatted number
   *
   * @param {string} lang Locale for formatting.
   * @param {Object} options Options for Intl.NumberFormat.
   * @param {string} raw Raw number string.
   * @param {number} offset Offset for number.
   */
  _render(lang, options, raw, offset) {
    // TODO: rendering may be done redundantly on property initializations
    raw = raw.trim();
    if (!raw && !this.formatted) {
      //console.log('i18n-number: skipping _render as raw is null');
      return;
    }
    if (raw) {
      this.rawNumber = Number(raw);
      this.number = this.rawNumber - offset;
      this.formatted = this._formatNumber(lang, options, this.number);
    }
    else {
      this.rawNumber = undefined;
      this.number = undefined;
      this.formatted = '';
    }
    this.invalidate();
    //console.log('i18n-number: _render ' + this.formatted);
  }

  /**
   * Renders shadowRoot with this.__render()
   */
  invalidate() {
    if (!this.needsRender) {
      this.needsRender = true;
      Promise.resolve().then(() => {
        this.needsRender = false;
        if (!this.shadowRoot) {
          this.attachShadow({ mode: 'open' });
        }
        render(this.__render(), this.shadowRoot);
        //console.log(`rendered "${this.formatted}"`);
        if (typeof this.formatted !== 'undefined') {
          this.dispatchEvent(new Event('rendered', { bubbles: true, cancelable: false, composed: true }));
        }
      });
    }
  }

  /**
   * Renders the formatted number with the current parameters
   *
   * Note: (As of Polymer 1.2.3)
   *   Explicit render() call is needed whenever the observer 
   *   `_onOptionsPropertyChanged(options.*)` is NOT invoked 
   *   after a property of `options` is changed.  An explicit call 
   *   `this.notifyPath('options', this.options, true)` can also 
   *   trigger re-rendering.
   *
   *   If the changed property of `options` is bound in an annotation
   *   like `{{options.currency}}`, the observer `_onOptionsPropertyChanged(options.*)`
   *   is automatically called whenever the property value is changed
   *   and thus no explicit call of `render()` or `notifyPath()` is
   *   required.
   */
  render() {
    this._render(this.lang, this.options, this.raw, this.offset);
  }
}
customElements.define(I18nNumber.is, I18nNumber);
