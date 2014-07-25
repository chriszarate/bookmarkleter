'use strict';

var bookmarkleter = require('../bookmarkleter');

exports.testInjectJQuery = function (test) {

  var options = {
    jQuery: true
  };

  var data = [
    ['var test;', 'javascript:var%20__hasjq=function(){};window.jQuery%26%26__hasjq();var%20s=document.createElement(%22script%22);s.src=%22//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js%22,s.onload=__hasjq,document.body.appendChild(s);'],
    ['console.log("test");', 'javascript:var%20__hasjq=function(){console.log(%22test%22)};window.jQuery%26%26__hasjq();var%20s=document.createElement(%22script%22);s.src=%22//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js%22,s.onload=__hasjq,document.body.appendChild(s);']
  ];

  data.forEach(function (datum) {
    test.equal(bookmarkleter(datum[0], options), datum[1]);
  });

  test.done();

};
