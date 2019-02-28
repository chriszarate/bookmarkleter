// Load dependencies.
const babelMinify = require( 'babel-minify' );
const { transform } = require( 'babel-standalone' );

// URI-encode only a subset of characters. Most user agents are permissive with
// non-reserved characters, so don't obfuscate more than we have to.
const specialCharacters = [ '%', '"', '<', '>', '#', '@', ' ', '\\&', '\\?' ];

// CDN URL for jQuery.
const jQueryURL = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';

// Default minimum jQuery version.
const jQueryMinVersion = 1.7;

const jquery = code => `void function ($) {
  var loadBookmarklet = function ($) {${code}};
  if($ && $.fn && parseFloat($.fn.jquery) >= ${jQueryMinVersion}) {
    load($);
    return;
  }

  var s = document.createElement('script');
  s.src = '${jQueryURL}';
  s.onload = s.onreadystatechange = function () {
    var state = this.readyState;
    if(!state || state === 'loaded' || state === 'complete') {
      loadBookmarklet(jQuery.noConflict());
    }
  };

  document.getElementsByTagName('head')[0].appendChild(s);
}(window.jQuery);`;

const iife = code => `void function () {${code}}();`;
const minify = code => babelMinify( code, { mangle: true } ).code;
const prefix = code => `javascript:${code}`;
const transpile = code => transform( code, { presets: [ 'es2015' ] } ).code.replace( /\n+/g, '' );
const urlencode = code => code.replace( new RegExp( specialCharacters.join( '|' ), 'g' ), encodeURIComponent );

// Create a bookmarklet.
module.exports = ( code, options = {} ) => {
  let result = code;

  // Add jQuery? (also adds IIFE wrapper).
  if ( options.jQuery || options.jquery ) {
    result = jquery( result );
  }

  // Add IIFE wrapper?
  if ( ( options.iife || options.anonymize ) && !options.jQuery ) {
    result = iife( result );
  }

  // Transpile to ES5?
  if ( options.transpile ) {
    result = transpile( result );
  }

  // Minify?
  if ( options.minify || options.mangleVars ) {
    result = minify( result );
  }

  // If code minifies down to nothing, stop processing.
  if ( !result || result === '"use strict";' ) {
    return null;
  }

  // URL-encode by default.
  if ( options.urlencode || 'undefined' === typeof options.urlencode ) {
    result = urlencode( result );
  }

  // Add javascript prefix.
  return prefix( result );
};
