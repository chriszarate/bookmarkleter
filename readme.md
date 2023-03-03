# Bookmarkleter

[![Build status][build-status]][travis-ci]
[![Test coverage][test-coverage]][codecov]
[![NPM version][npm-version]][fury-io]

You have JavaScript. You need a [bookmarklet][bookmarklet]. This does that.

## Browser tool

Create bookmarklets in your browser with a simple copy and paste.

**https://chriszarate.github.io/bookmarkleter/**

## NPM module

```
npm install --save bookmarkleter
```

```js
const bookmarkleter = require( 'bookmarkleter' );
const bookmarklet = bookmarkleter( code, options );
```

## Options

All options are Boolean flags.

  * `urlencode` (default `true`): URL-encode reserved characters: \[space\], %,
    ", <, >, #, @, &, ?

  * `iife` (default `false`): Wrap in an [IIFE][iife] (anonymizing function) to
    prevent exposing variables to the page on which the bookmarklet is running.

  * `mangleVars` (default `false`): Mangle variable names and other tokens to
    further reduce size.

  * `transpile` (default `false`): Transpile for browsers using [Babel][babel].

  * `jQuery` (default `false`): Make sure a modern version (>= 1.7) of
    [jQuery][jquery] is available for your code.

### Deprecated options

  * `minify`: Code is always minified (with comments removed) using
    [babel-minify][babel-minify]. Bookmarklets require minification to function
    correctly. Use `mangleVars` option for additional compactness.

## License

This is free software. It is released to the public domain without warranty.

## Thanks

Thanks to [@jpillora][jpillora] and [@alanhogan][alanhogan] for updates and contributions.


[build-status]: https://secure.travis-ci.org/chriszarate/bookmarkleter.svg?branch=master
[travis-ci]: http://travis-ci.org/chriszarate/bookmarkleter
[test-coverage]: https://codecov.io/gh/chriszarate/bookmarkleter/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/chriszarate/bookmarkleter
[npm-version]: https://badge.fury.io/js/bookmarkleter.svg
[fury-io]: http://badge.fury.io/js/bookmarkleter
[bookmarklet]: http://en.wikipedia.org/wiki/Bookmarklet "Wikipedia entry on Bookmarklets"
[iife]: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression "Immediately invoked function expression"
[babel]: https://babeljs.io
[babel-minify]: https://github.com/babel/minify
[jquery]: http://jquery.com
[jpillora]: https://github.com/jpillora
[alanhogan]: https://github.com/alanhogan
