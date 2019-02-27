'use strict';

// Load dependencies.
var Babel = require('babel-standalone');
var minify = require('babel-minify');

// URI-encode only a subset of characters. Most user agents are permissive with
// non-reserved characters, so don't obfuscate more than we have to.
var specialCharacters = ['%', '"', '<', '>', '#', '@', ' ', '\\&', '\\?'];

// CDN URL for jQuery.
var jQueryURL = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';

// Default minimum jQuery version.
var jQueryMinVersion = 1.7;

// Create a bookmarklet.
var bookmarkleter = function (code, options) {

  options = options || {};

  // URL-encode by default.
  options.urlencode = (options.urlencode === false) ? false : true;

  // Add jQuery, if requested (also adds IIFE wrapper).
  if (options.jQuery) {
    code =
      'void function ($) {' +
      '  var loadBookmarklet = function ($) {' + code + '};' +
      '  var hasJQuery = $ && $.fn && parseFloat($.fn.jquery) >= ' + jQueryMinVersion + ';' +
      '  if(hasJQuery) {' +
      '    loadBookmarklet($);' +
      '  } else {' +
      '    var s = document.createElement("script");' +
      '    s.src = "' + jQueryURL + '";' +
      '    s.onload = s.onreadystatechange = function () {' +
      '      var state = this.readyState;' +
      '      if(!state || state === "loaded" || state === "complete") {' +
      '        loadBookmarklet(jQuery.noConflict());' +
      '      }' +
      '    };' +
      '  }' +
      '  document.getElementsByTagName("head")[0].appendChild(s);' +
      '}(window.jQuery);';
  }

  // Add IIFE wrapper, if requested.
  if ((options.iife || options.anonymize) && !options.jQuery) {
    code = 'void function () {' + code + '}();';
  }

  // Transpile to ES5, if requested.
  if (options.transpile) {
    code = Babel.transform(code, { presets: ['es2015'] }).code.replace( /\n+/g, '' );
  }

  // Parse and minify code.
  if (options.minify || options.mangleVars) {
    code = minify(code, { mangle: true }).code;
  }

  // If code minifies down to nothing, stop processing.
  if (!code || code === '"use strict";') {
    return;
  }

  // URI-encode special characters, if requested.
  if (options.urlencode) {
    specialCharacters.forEach(function (char) {
      var charRegex = new RegExp(char, 'g');
      code = code.replace(charRegex, encodeURIComponent(char.replace(/\\/g, '')));
    });
  }

  // Add javascript prefix.
  code = 'javascript:' + code;

  // Return bookmarklet.
  return code;

};

module.exports = bookmarkleter;
