'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.injectJQuery = function (test) {

  var options = {
    jQuery: true
  };

  var data = [
    ['var test;', 'javascript:void%20function($){var%20loadBookmarklet=function(){},hasJQuery=$%26%26$.fn%26%26parseFloat($.fn.jquery)%3E=1.7;if(hasJQuery)loadBookmarklet($);else{var%20s=document.createElement(%22script%22);s.src=%22//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js%22,s.onload=s.onreadystatechange=function(){var%20state=this.readyState;state%26%26%22loaded%22!==state%26%26%22complete%22!==state||loadBookmarklet(jQuery.noConflict())}}document.getElementsByTagName(%22head%22)[0].appendChild(s)}(window.jQuery);'],
    ['console.log("test");', 'javascript:void%20function($){var%20loadBookmarklet=function(){console.log(%22test%22)},hasJQuery=$%26%26$.fn%26%26parseFloat($.fn.jquery)%3E=1.7;if(hasJQuery)loadBookmarklet($);else{var%20s=document.createElement(%22script%22);s.src=%22//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js%22,s.onload=s.onreadystatechange=function(){var%20state=this.readyState;state%26%26%22loaded%22!==state%26%26%22complete%22!==state||loadBookmarklet(jQuery.noConflict())}}document.getElementsByTagName(%22head%22)[0].appendChild(s)}(window.jQuery);']
  ];

  data.forEach(function (datum) {
    test.equal(bookmarkleter(datum[0], options), datum[1]);
  });

  test.done();

};
