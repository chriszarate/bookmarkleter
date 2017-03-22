'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.returnUndefined = function (test) {

  var options = {
    anonymize: true,
    urlencode: false
  };

  var data = [
    'return undefined;',
    'return false;',
    'return true;'
  ];

  data.forEach(function (datum) {
    var bookmarkletCode = bookmarkleter(datum, options);
    test.equal((typeof bookmarkletCode), 'undefined');
  });

  test.done();

};
