var falafel = require('falafel');
var body = require('fn-body');
var params = require('fn-params');

module.exports = function (fn) {
  var src = body(fn);
  var fnParams = params(fn);
  var newSrc = falafel(src, function (node) {
    if (node.type.indexOf('Expression') > -1) {
      var nodeSrc = node.source();
      if (!nodeSrc.match(/^____\(.+\);?$/)) {
        node.update('____(' + nodeSrc + ')');
      }
    }
  });
  newSrc += '; function ____ (val) { if (val instanceof Element) { throw new Error("DOM modification"); } return val; };';
  return Function.apply(null, fnParams.concat(newSrc));
}
