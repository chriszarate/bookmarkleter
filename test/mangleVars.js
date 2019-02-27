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

  // minify: true
  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input, { minify: true } ), output ) );

  // minify: false (default)
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input, { minify: false } ), output ) );
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input ), output ) );

  // mangleVars: true (legacy option)
  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input, { mangleVars: true } ), output ) );

  // mangleVars: false (legacy option)
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input, { mangleVars: false } ), output ) );

  test.done();
};
