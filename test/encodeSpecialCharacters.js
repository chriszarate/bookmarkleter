'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.encodeSpecialCharacters = function (test) {

  var data = [
    ['var test = \'%"<>#@&?\';', 'javascript:var%20test=\'%25%22%3C%3E%23%40%26%3F\';'],
    ['var test = \'Iñtërnâtiônàlizætiøn\';', 'javascript:var%20test=%22Iñtërnâtiônàlizætiøn%22;']
  ];

  data.forEach(function (datum) {
    test.equal(bookmarkleter(datum[0]), datum[1]);
  });

  test.done();

};
