# Bookmarkleter

[![Build status][build-status]][travis-ci]
[![Test coverage][test-coverage]][code-climate]
[![Code climate][code-climate-gpa]][code-climate]
[![NPM version][npm-version]][fury-io]

You have JavaScript. You need a [bookmarklet][bookmarklet]. This does that.

### Browser tool

Create bookmarklets in your browser with a simple copy and paste.

**http://chriszarate.github.io/bookmarkleter**

### NPM module

```
npm install bookmarkleter
```

or

```
yarn add bookmarkleter
```

```js
var bookmarkleter = require('./bookmarkleter');
var bookmarklet = bookmarkleter(code, options);
```

### Options

All options are Boolean flags.

  * `urlencode` (default `true`): URL-encode reserved characters: \[space\], %,
    ", <, >, #, @, &, ?

  * `anonymize` (default `false`): Wrap in an [IIFE][iife] (anonymizing
    function) to prevent exposing variables to the page on which the
    bookmarklet is running.

  * `mangleVars` (default `false`): Minify using [UglifyJS][uglify] to reduce
    the size of the bookmarklet.

  * `jQuery` (default `false`): Make sure a modern version (>= 1.7) of
    [jQuery][jquery] is available for your code.

### License

This is free software. It is released to the public domain without warranty.

### Thanks

Thanks to [@jpillora][jpillora] for updates and contributions.


[build-status]: https://secure.travis-ci.org/chriszarate/bookmarkleter.svg?branch=master
[travis-ci]: http://travis-ci.org/chriszarate/bookmarkleter
[test-coverage]: https://codeclimate.com/github/chriszarate/bookmarkleter/badges/coverage.svg
[code-climate]: https://codeclimate.com/github/chriszarate/bookmarkleter
[code-climate-gpa]: https://codeclimate.com/github/chriszarate/bookmarkleter/badges/gpa.svg
[npm-version]: https://badge.fury.io/js/bookmarkleter.svg
[fury-io]: http://badge.fury.io/js/bookmarkleter
[bookmarklet]: http://en.wikipedia.org/wiki/Bookmarklet "Wikipedia entry on Bookmarklets"
[iife]: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression "Immediately invoked function expression"
[uglify]: https://github.com/mishoo/UglifyJS
[jquery]: http://jquery.com
[jpillora]: https://github.com/jpillora
