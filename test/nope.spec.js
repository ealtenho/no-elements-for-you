var nope = require('../nope');

global.Element = function Element () {};

describe('nope', function () {

  it('should work', function () {
    var niceTry = nope.disallowedContext(function () {
      new Element();
    });
    expect(niceTry).toThrow();
  });

  it('should work', function () {
    var niceTry = nope.disallowedContext(function () {
      Element
    });
    expect(niceTry).not.toThrow();
  });

  it('should use an onMessage function to allow customization', function() {
    spyOn(console, 'log');
    nope.onMessage = 'console.log("Error");';
    var niceTry = nope.disallowedContext(function () {
       new Element();
    });
    niceTry();
    expect(console.log).toHaveBeenCalledWith('Error');
  });
});
