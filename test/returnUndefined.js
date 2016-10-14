'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.returnUndefined = function (test) {

  var options = {
    urlencode: false
  };

  var data = [
    'void function () { return undefined; }()',
    'void function () { return false; }()',
    'void function () { return true; }()'
  ];

  data.forEach(function (datum) {
    var bookmarkletCode = bookmarkleter(datum, options);
    test.equal(eval(bookmarkletCode), undefined);
  });

  test.done();

};
