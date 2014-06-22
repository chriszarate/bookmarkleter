'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.testSimple = function(test) {

  var data = [
    ['test', undefined],
    ['var test', 'javascript:var%20test;']
  ];

  data.forEach(function(c){
    test.equal(bookmarkleter(c[0]), c[1]);
  });

  test.done();

};
