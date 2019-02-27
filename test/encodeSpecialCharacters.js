const bookmarkleter = require( '../bookmarkleter' );

exports.encodeSpecialCharacters = test => {
  const data = [
    [
      'var test = \'%"<>#@&?\';',
      'javascript:var%20test%20=%20\'%25%22%3C%3E%23%40%26%3F\';',
    ],
    [
      'var test = \'Iñtërnâtiônàlizætiøn\';',
      'javascript:var%20test%20=%20\'Iñtërnâtiônàlizætiøn\';',
    ],
  ];

  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input ), output ) );

  test.done();
};
