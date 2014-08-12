var nope = require('../nope');

global.Element = function Element () {};

describe('nope', function () {

  it('should work', function () {
    var niceTry = nope(function () {
      new Element();
    });
    expect(niceTry).toThrow();
  });

  it('should work', function () {
    var niceTry = nope(function () {
      Element
    });

    expect(niceTry).not.toThrow();
  });

});
