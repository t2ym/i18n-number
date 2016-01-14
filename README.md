### i18n-number

Wrapper element for [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

[Demo](https://t2ym.github.io/i18n-number/components/i18n-number/demo) and [API Docs](https://t2ym.github.io/i18n-number/components/i18n-number/)

![i18n-number-demo](https://raw.githubusercontent.com/wiki/t2ym/i18n-number/i18n-number-demo.gif)

### Install

```
    bower install --save i18n-number
```

### Import

```html
    <link rel="import" href="/path/to/bower_components/i18n-number/i18n-number.html">
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

### License

[BSD-2-Clause](https://github.com/t2ym/i18n-number/blob/master/LICENSE.md)
