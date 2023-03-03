const bookmarkleter = require( '../bookmarkleter' );

exports.mangleVars = test => {
  const data = [
    [
      'var test = function(foo){foo++};',
      'javascript:var%20test=function(a){a++};',
    ],
    [
      '(function(jQuery){console.log(jQuery.fn.version);})($)',
      'javascript:(function(a){console.log(a.fn.version)})($);',
    ],
  ];

  // mangleVars: true
  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input, { mangleVars: true } ), output ) );

  // mangleVars: false
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input, { mangleVars: false } ), output ) );

  test.done();
};
