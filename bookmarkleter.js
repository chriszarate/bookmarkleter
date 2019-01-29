'use strict';

// Load dependencies.
var uglify = require('uglify-js');
var Babel = require('babel-standalone');

// URI-encode only a subset of characters. Most user agents are permissive with
// non-reserved characters, so don't obfuscate more than we have to.
var specialCharacters = ['%', '"', '<', '>', '#', '@', ' ', '\\&', '\\?'];

// CDN URL for jQuery.
var jQueryURL = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';

// Default minimum jQuery version.
var jQueryMinVersion = 1.7;

// Create a bookmarklet.
var bookmarkleter = function (code, options) {

  options = options || {};

  // URL-encode by default.
  options.urlencode = (options.urlencode === false) ? false : true;

  // Set Uglify options.
  var uglifyOptions = {
    compress: {
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      negate_iife: false
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    },
    fromString: true,
    mangle: options.mangleVars
  };

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

  // Transpile, parse, and uglify/minify code.
  var transpiledCode = Babel.transform(code, { presets: ['es2015'] }).code;
  var minifiedCode = uglify.minify(transpiledCode, uglifyOptions).code;

  // If code uglifies down to nothing, stop processing.
  if (!minifiedCode || minifiedCode === '"use strict";') {
    return;
  }

  // URI-encode special characters, if requested.
  if (options.urlencode) {
    specialCharacters.forEach(function (char) {
      var charRegex = new RegExp(char, 'g');
      minifiedCode = minifiedCode.replace(charRegex, encodeURIComponent(char.replace(/\\/g, '')));
    });
  }

  // Add javascript prefix.
  minifiedCode = 'javascript:' + minifiedCode;

  // Return bookmarklet.
  return minifiedCode;

};

module.exports = bookmarkleter;
