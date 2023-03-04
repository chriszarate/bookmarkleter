const bookmarkleter = require( '../bookmarkleter' );

exports.returnNull = test => {
  const data = [
    '',
    ';',
    ';;',
    '[]',
    '{}',
    '({})',
    'true',
    '12345',
  ];

  data.forEach( input => test.equal( bookmarkleter( input, { mangleVars: true } ), null ) );

  test.done();
};
