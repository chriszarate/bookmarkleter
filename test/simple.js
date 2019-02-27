const bookmarkleter = require( '../bookmarkleter' );

exports.simple = test => {
  const data = [
    [
      'test',
      'javascript:test',
    ],
    [
      'var test',
      'javascript:var%20test',
    ],
    [
      'var test = function(){var foo};',
      'javascript:var%20test%20=%20function(){var%20foo};',
    ],
    [
      'var test = function(foo){foo++};',
      'javascript:var%20test%20=%20function(foo){foo++};',
    ],
    [
      'document.write("bookmarklet");',
      'javascript:document.write(%22bookmarklet%22);',
    ],
    [
      'window.open("http://www.google.com");',
      'javascript:window.open(%22http://www.google.com%22);',
    ],
    [
      'const getMessage = () => "Hello World";',
      'javascript:const%20getMessage%20=%20()%20=%3E%20%22Hello%20World%22;',
    ],
  ];

  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input ), output ) );

  test.done();
};
