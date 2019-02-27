const bookmarkleter = require( '../bookmarkleter' );

exports.returnUndefined = test => {
  const evalCode = input => eval( bookmarkleter( input, { urlencode: false } ) );

  const data = [
    'void function () { return undefined; }()',
    'void function () { return false; }()',
    'void function () { return true; }()',
  ];

  data.forEach( input => test.equal( evalCode( input ), undefined ) );

  test.done();
};
