var nope = require('../nope');

global.Element = function Element () {};

describe('nope', function () {
  it('should throw an error when an element is detected by default', function () {
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

  it('should replace the error behavior if a second parameter is passed', function() {
    spyOn(console, 'log');
    var consoleLogError = 'console.log("Error");';
    var niceTry = nope(function () {
      new Element();
    }, consoleLogError);
    niceTry();
    expect(console.log).toHaveBeenCalledWith('Error');
  });

  it('should work with functions with parameters', function() {
    var parameter = [];
    var niceTry = nope(function (parameter) {
    });
    expect(niceTry).not.toThrow();
  });

  it('should work with assignment expressions', function() {
    var niceTry = nope(function ($scope) {
      $scope.someFunction = function() {
        console.log('some function called');
      };
    });
    expect(niceTry.toString().indexOf('____($scope.someFunction = ____(')).not.toEqual(-1);
  });

  it('should work with named functions', function() {
    expect(function() {
      var niceTry = nope(function namedFunction($scope) {
      });
    }).not.toThrow();
  });
});
