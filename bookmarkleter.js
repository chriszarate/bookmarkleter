'use strict';

// Load dependencies.
var uglify = require('uglify-js');

// URI-encode only a subset of characters. Most user agents are permissive with
// non-reserved characters, so don't obfuscate more than we have to.
var specialCharacters = ['%', '"', '<', '>', '#', '@', ' ', '\\&', '\\?'];

// CDN URL for jQuery.
var jQueryURL = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';

// Create a bookmarklet.
var bookmarkleter = function (code, options) {

  // Set fromString options for Uglify.
  options = options || {};
  options.uglify = options.uglify || {};
  options.uglify.fromString = true;

  // Add jQuery, if requested.
  if (options.jQuery) {
    code = 'var __hasjq = function () {' + code + '};' +
    'if (window.jQuery) __hasjq();' +
    'else {' +
    'var s = document.createElement("script");' +
    's.src = "' + jQueryURL + '";' +
    's.onload = __hasjq;' +
    'document.body.appendChild(s);}';
  }

  // Add anonymous function wrapper, if requested.
  if (options.anonymize) {
    code = '(function(){' + code + '})()';
  }

  // Parse and uglify code.
  var minifiedCode = uglify.minify(code, options.uglify).code;

  // If code uglifies down to nothing, stop processing.
  if (!minifiedCode) return;

  // URI-encode special characters.
  specialCharacters.forEach(function (char) {
    var charRegex = new RegExp(char, 'g');
    minifiedCode = minifiedCode.replace(charRegex, encodeURI(char));
  });

  // Add javascript prefix.
  minifiedCode = 'javascript:' + minifiedCode;

  // Return bookmarklet.
  return minifiedCode;

};

module.exports = bookmarkleter;
