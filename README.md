[![Build Status](https://travis-ci.org/t2ym/i18n-number.svg?branch=master)](https://travis-ci.org/t2ym/i18n-number)
[![Coverage Status](https://coveralls.io/repos/github/t2ym/i18n-number/badge.svg?branch=master&build=26)](https://coveralls.io/github/t2ym/i18n-number?branch=master)
[![npm version](https://badge.fury.io/js/i18n-number.svg)](https://badge.fury.io/js/i18n-number)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/t2ym/i18n-number)

### i18n-number

Wrapper element for [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

[Demo](https://t2ym.github.io/i18n-number/components/i18n-number/demo/) and [API Docs](https://www.webcomponents.org/element/t2ym/i18n-number/elements/i18n-number)

<img src="https://raw.githubusercontent.com/wiki/t2ym/i18n-number/i18n-number-demo.gif" width="600px">

### Install

```
    npm install i18n-number
```

### Import

```js
    import "i18n-number/i18n-number.js";
```

### Usage

```html
    <i18n-number 
      lang="en"
      options='{ "style": "currency", "currency": "USD" }' 
      >123456.78</i18n-number>
```

This renders as follows:

```
    $123,456.78
```

### Demo

#### Prerequisite for Building and Serving Demo

```sh
    npm install -g polymer-cli
```

#### On-the-fly Build

```sh
    # Serve at http://localhost:8080/components/i18n-number/demo/
    polymer serve --npm --module-resolution=node -p 8080
```

#### Static Builds

- Build

```sh
    polymer build
```

- Targets

| target | browser | minify | bundled |
|:-----:|:-------:|:------:|:-------:|
|build/esm-unbundled|es6,modules|no|no|
|build/esm-bundled  |es6,modules|yes|yes|
|build/es6-bundled  |es6        |yes|yes|
|build/es5-bundled  |es5        |yes|yes|

- Serve

```sh
    # Serve at http://localhost:8080/
    cd build/{esm-unbundled|esm-bundled|es6-bundled|es5-bundled}
    python -m SimpleHTTPServer 8080 # or any HTTP(S) server
```

### License

[BSD-2-Clause](https://github.com/t2ym/i18n-number/blob/master/LICENSE.md)
