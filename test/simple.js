'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.simple = function (test) {

  var data = [
    ['test', 'javascript:%22use%20strict%22;test;'],
    ['var test', 'javascript:%22use%20strict%22;var%20test;'],
    ['var test = function(){var foo};', 'javascript:%22use%20strict%22;var%20test=function(){};'],
    ['var test = function(foo){foo++};', 'javascript:%22use%20strict%22;var%20test=function(foo){foo++};'],
    ['document.write("bookmarklet");', 'javascript:%22use%20strict%22;document.write(%22bookmarklet%22);'],
    ['window.open("http://www.google.com");', 'javascript:%22use%20strict%22;window.open(%22http://www.google.com%22);'],
    ['const getMessage = () => "Hello World";', 'javascript:%22use%20strict%22;var%20getMessage=function(){return%22Hello%20World%22};']
  ];

  data.forEach(function (datum) {
    test.equal(bookmarkleter(datum[0]), datum[1]);
  });

  test.done();

};
