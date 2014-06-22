# Bookmarkleter

[![Build Status][build-status]][travis-ci]

You have JavaScript. You need a [bookmarklet](http://en.wikipedia.org/wiki/Bookmarklet). This does that.

### Features

* Removes newlines, tabs, optional spaces, and comments
* URL-encodes special ASCII characters: \[space\], %, ", <, >, #, @, &, ?
* Places code in a wrapper function (if not done already)
* Does not hex-encode non-ASCII characters (you should probably use [String.fromCharCode](http://www.w3schools.com/jsref/jsref_fromcharcode.asp) for that)

### Use it

Please visit **<a href="http://chriszarate.github.io/bookmarkleter">http://chriszarate.github.io/bookmarkleter</a>**.

### License

This is free software. It is released to the public domain without warranty.

[build-status]: https://secure.travis-ci.org/chriszarate/bookmarkleter.svg?branch=master
[travis-ci]: http://travis-ci.org/chriszarate/bookmarkleter
