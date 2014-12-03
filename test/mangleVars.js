'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.mangleVars = function (test) {

  var options = {
    mangleVars: true
  };

  var data = [
    ['var test;', 'javascript:var%20test;'],
    ['var test = function(foo){foo++};', 'javascript:var%20test=function(t){t++};'],
    ['(function(jQuery){console.log(jQuery.fn.version);})($)', 'javascript:(function(n){console.log(n.fn.version)})($);']
  ];

  data.forEach(function (datum) {
    test.equal(bookmarkleter(datum[0], options), datum[1]);
  });

  test.done();

};
