const bookmarkleter = require( '../bookmarkleter' );

exports.transpile = test => {
  const data = [
    [
      'const getMessage = () => "Hello World";',
      'javascript:%22use%20strict%22;const%20getMessage=()=%3E%22Hello%20World%22;'
    ],
    [
      `// this is a comment
      const getMessage = () => "Hello World";`,
      'javascript:%22use%20strict%22;const%20getMessage=()=%3E%22Hello%20World%22;'
    ],
    [
      `/**
        * this is another comment
        */
      const getMessage = () => "Hello World";`,
      'javascript:%22use%20strict%22;const%20getMessage=()=%3E%22Hello%20World%22;'
    ],
    [
      `const foo = 'bar' // this is an inline comment with no semicolon
       const foo2 = 'bar2' // this is a trailing comment
      `,
      'javascript:%22use%20strict%22;const%20foo=%22bar%22,foo2=%22bar2%22;',
    ],
  ];

  // transpile: true
  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input, { transpile: true } ), output ) );

  // transpile: false (default)
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input, { transpile: false } ), output ) );
  data.forEach( ( [ input, output ] ) => test.notEqual( bookmarkleter( input ), output ) );

  test.done();
};
