var falafel = require('falafel');
var body = require('fn-body');
var params = require('fn-params');

module.exports = function (fn, error) {
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
  error = error || 'throw new Error("DOM modification");';
  newSrc += '; function ____ (val) { if (val instanceof Element) { ' + error + ' } return val; };';
  return Function.apply(null, fnParams.concat(newSrc));
}