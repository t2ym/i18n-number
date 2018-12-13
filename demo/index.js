import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-styles/demo-pages.js";
import "@polymer/iron-demo-helpers/demo-snippet.js";
import "@polymer/iron-demo-helpers/demo-pages-shared-styles.js";
import "../i18n-number.js";
import "./nano-calc.js";

{
  const $_documentContainer = document.createElement('template');
  $_documentContainer.setAttribute('style', 'display: none;');

  $_documentContainer.innerHTML = `<style is="custom-style" include="demo-pages-shared-styles">
        .vertical-section-container {
          max-width: 768px;
        }

        @media (max-width: 640px) {

          body {
            font-size: 14px;
            margin: 0;
            padding: 4px;
            background-color: var(--paper-grey-50);
          }

          .horizontal-section {
            background-color: white;
            padding: 8px;
            margin-right: 4px;
            min-width: 200px;

            @apply(--shadow-elevation-2dp);
          }

          .vertical-section {
            background-color: white;
            padding: 8px;
            margin: 0 4px 8px 4px;

            @apply(--shadow-elevation-2dp);
          }

        }
      </style>`;

  document.head.appendChild($_documentContainer.content);
}
{
  const $_documentContainer = document.createElement('template');
  $_documentContainer.setAttribute('style', 'display: none;');

  $_documentContainer.innerHTML = `<style is="custom-style">
        --demo-snippet-code {
          @apply(--paper-font-code1);
        }
    
        paper-item {
          display: block;
        }

        code {
          font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
          color: black;
        }

        .input {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          border-width: 0px;
          outline-width: 0px;
        }

        .select {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          outline-width: 0px;
          border-width: 0px;
          background-color: rgba(255,255,255,0.0);
        }

        option {
          position: relative;
          top: -1;
          color: black;
          outline-width: 0px;
          border-width: 0px;
        }

        .dropdown {
          --editable-dropdown-menu: {
            display: inline-block;
            margin-right: 8px;
            text-align: left;
            width: 180px;
          };
        }

        .demo-paper-dropdown-menu {
          font-family: 'Roboto', 'Noto', Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          text-align: left;
          margin: auto;
          width: 180px;
        }

        @media (max-width: 640px) {

          body {
            font-size: 14px;
            margin: 0;
            padding: 4px;
            background-color: var(--paper-grey-50);
          }

          .horizontal-section {
            background-color: white;
            padding: 8px;
            margin-right: 4px;
            min-width: 200px;

            @apply(--shadow-elevation-2dp);
          }

          .vertical-section {
            background-color: white;
            padding: 8px;
            margin: 0 4px 8px 4px;

            @apply(--shadow-elevation-2dp);
          }

        }
      </style>`;

  document.head.appendChild($_documentContainer.content);
}
{
  const $_documentContainer = document.createElement('template');

  $_documentContainer.innerHTML = `<div class="vertical-section-container centered">

        <h1><code>&lt;i18n-number&gt;</code> Demo</h1>

        <div class="vertical-section-container">
          <h2>Number in English (en) locale</h2>
          <demo-snippet class="centered-demo">
            <template>
              <i18n-number lang="en">123456.78</i18n-number>
            </template>
            <script type="text/markdown">
              <i18n-number lang="en">123456.78</i18n-number>
            <${''}/script>
          </demo-snippet>

          <h2>Currency - USD in English (en) locale</h2>
          <demo-snippet class="centered-demo">
            <template>
              <i18n-number lang="en" options="{ &quot;style&quot;: &quot;currency&quot;, &quot;currency&quot;: &quot;USD&quot; }">123456.78</i18n-number>
            </template>
            <script type="text/markdown">
              <i18n-number 
                lang="en"
                options='{ "style": "currency", "currency": "USD" }' 
                >123456.78</i18n-number>
            <${''}/script>
          </demo-snippet>

          <!--
          <h2><code>&lt;i18n-number&gt;</code> with different parameters</h2>
          <demo-snippet id="demo-snippet" class="left-aligned-demo" _markdown="{{markdown}}">
            <template>
              <i18n-number-demo id="i18n-number-demo"></i18n-number-demo>
            </template>
          </demo-snippet>
          -->

          <h2>Digits display for <code>&lt;nano-calc&gt;</code></h2>
          <demo-snippet class="centered-demo">
            <template>
              <nano-calc x="123456.789"></nano-calc>
            </template>
            <script type="text/markdown">
              <dom-module id="nano-calc">
                <template>
                  ...
                  <span class="layout horizontal digits-display">
                    <span class="flex"></span>
                    <i18n-number id="value" 
                      formatted="{{value}}"
                      options='{ "maximumFractionDigits": 16 }'
                      >{{pickDisplayValue(x,y,op)}}</i18n-number>
                    </span>
                  </span>
                  ...
                </template>
                ...
              </dom-module> 
            <${''}/script>
          </demo-snippet>


    

  </div></div>`;

  document.body.appendChild($_documentContainer.content);
}
