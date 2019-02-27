const bookmarkleter = require( '../bookmarkleter' );

exports.anonymize = test => {
  const hasIife = ( input, options = {} ) => bookmarkleter( input, options ).includes( 'void%20function' );

  const data = [
    'var test;',
    'console.log("test");',
    '(function(){console.log("test");})()',
  ];

  // iife: true
  data.forEach( input => test.ok( hasIife( input, { iife: true } ) ) );

  // iife: false (default)
  data.forEach( input => test.ok( ! hasIife( input, { iife: false } ) ) );
  data.forEach( input => test.ok( ! hasIife( input ) ) );

  // anonymize: true (legacy option)
  data.forEach( input => test.ok( hasIife( input, { anonymize: true } ) ) );

  // anonymize: false (legacy option)
  data.forEach( input => test.ok( ! hasIife( input, { anonymize: false } ) ) );

  test.done();
};
