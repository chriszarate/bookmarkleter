const bookmarkleter = require( '../bookmarkleter' );

exports.transpile = test => {
  const data = [
    [
      'const getMessage = () => "Hello World";',
      'javascript:%22use%20strict%22;const%20getMessage%20=%20()%20=%3E%20%22Hello%20World%22;',
    ],
    [
      `// this is a comment
      const getMessage = () => "Hello World";`,
      'javascript:%22use%20strict%22;const%20getMessage%20=%20()%20=%3E%20%22Hello%20World%22;',
    ],
    [
      `/**
        * this is another comment
        */
      const getMessage = () => "Hello World";`,
      'javascript:%22use%20strict%22;const%20getMessage%20=%20()%20=%3E%20%22Hello%20World%22;',
    ],
    [
      `const foo = 'bar' // this is an inline comment with no semicolon
       const foo2 = 'bar2' // this is a trailing comment
      `,
      "javascript:%22use%20strict%22;const%20foo%20=%20'bar';const%20foo2%20=%20'bar2';"
    ],
  ];

  // transpile: true
  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input, { transpile: true } ), output ) );

  // transpile: false (default)
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input, { transpile: false } ), output ) );
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input ), output ) );

  test.done();
};
