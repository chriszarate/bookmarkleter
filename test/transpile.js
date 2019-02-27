const bookmarkleter = require( '../bookmarkleter' );

exports.transpile = test => {
  const data = [
    [
      'const getMessage = () => "Hello World";',
      'javascript:%22use%20strict%22;var%20getMessage%20=%20function%20getMessage()%20{%20%20return%20%22Hello%20World%22;};',
    ],
  ];

  // transpile: true
  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input, { transpile: true } ), output ) );

  // transpile: false (default)
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input, { transpile: false } ), output ) );
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input ), output ) );

  test.done();
};
