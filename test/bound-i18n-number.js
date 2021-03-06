/**
@license https://github.com/t2ym/i18n-number/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
import { Polymer, html } from '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-selector/iron-selector.js';
Polymer({
  importMeta: import.meta,

  _template: html`
    <span id="placeholder">
      <i18n-number id="num">{{number}}</i18n-number>
      <i18n-number id="num2">{{number2}}</i18n-number>
      <i18n-number id="empty"></i18n-number>
      <i18n-number id="currency" options="{{options}}">123456.789</i18n-number>
      <iron-selector id="currencySelector" attr-for-selected="value" selected="{{options.currency}}">
        <div name="USD" iron-selected="">USD</div>
        <div name="JPY">JPY</div>
      </iron-selector>
    </span>
`,

  is: 'bound-i18n-number',

  properties: {
    number: {
      type: String,
      value: '',
      notify: true
    },
    number2: {
      type: String,
      value: '12.34',
      notify: true
    },
    options: {
      type: Object,
      value: function () {
        return { 'style': 'currency', 'currency': 'USD' };
      },
      notify: true
    }
  },

  attached: function() {
    this.$.num.setAttribute('lang', this.$.num.getAttribute('lang'));
    this.$.num.setAttribute('lang', this.$.num.getAttribute('lang'));
    this.$.num.setAttribute('attr', 'value');
    this.$.num.setAttribute('options', '<');
    this.$.num.constructor.importMeta;
    this.$.num.root;
  }
});
