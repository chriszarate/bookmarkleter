const bookmarkleter = require( '../bookmarkleter' );

exports.injectJQuery = test => {
  const hasJQuery = ( input, options = {} ) => bookmarkleter( input, options ).includes( 'loadBookmarklet' );

  var data = [
    'var test;',
    'console.log("test");',
  ];

  // jQuery: true
  data.forEach( input => test.ok( hasJQuery( input, { jQuery: true } ) ) );

  // jQuery: false (default)
  data.forEach( input => test.ok( ! hasJQuery( input, { jQuery: false } ) ) );
  data.forEach( input => test.ok( ! hasJQuery( input ) ) );

  test.done();
};
