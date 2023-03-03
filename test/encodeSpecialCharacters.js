const bookmarkleter = require( '../bookmarkleter' );

exports.encodeSpecialCharacters = test => {
  const data = [
    [
      'var test = \'%"<>#@&?\';',
      'javascript:var%20test=%22%25\\%22%3C%3E%23%40%26%3F%22;',
    ],
    [
      'var test = \'Iñtërnâtiônàlizætiøn\';',
      'javascript:var%20test=%22I\\xF1t\\xEBrn\\xE2ti\\xF4n\\xE0liz\\xE6ti\\xF8n%22;',
    ],
  ];

  data.forEach( ( [ input, output ] ) => test.equal( bookmarkleter( input ), output ) );

  test.done();
};
