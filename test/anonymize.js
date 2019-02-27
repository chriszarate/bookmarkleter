'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.anonymize = function (test) {

  var options = {
    anonymize: true
  };

  var data = [
    ['var test;', undefined],
    ['console.log("test");', 'javascript:%22use%20strict%22;!function(){console.log(%22test%22)}();'],
    ['(function(){console.log("test");})()', 'javascript:%22use%20strict%22;!function(){(function(){console.log(%22test%22)})()}();']
  ];

  data.forEach(function (datum) {
    test.equal(bookmarkleter(datum[0], options), datum[1]);
  });

  test.done();

};
