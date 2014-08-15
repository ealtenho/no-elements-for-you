var falafel = require('falafel');
var body = require('fn-body');
var params = require('fn-params');

module.exports = function (fn, error) {
  var src = body(fn);
  var fnParams = params(fn);
  var newSrc = falafel(src, function (node) {

    function stripUnnecessary(nodePart) {
      var changeSrc = nodePart.source();
      if(changeSrc.indexOf('____(') !== -1) {
        changeSrc = changeSrc.replace('____(', '');
        changeSrc = changeSrc.substring(0, changeSrc.length - 1);
        nodePart.update(changeSrc);
      }
    }

    if (node.type.indexOf('Expression') > -1 ) {
      if(node.type.indexOf('Assignment') > -1) {
        stripUnnecessary(node.left);
      }
      if(node.type.indexOf('Call') > -1) {
        stripUnnecessary(node.callee);
      }
      var nodeSrc = node.source();
      if (!nodeSrc.match(/^____\([\s\S]+\);?$/)) {
        node.update('____(' + nodeSrc + ')');
      }
    }
  });
  error = error || 'throw new Error("DOM modification");';
  newSrc += '; function ____ (val) { if (val instanceof Element) { ' + error + ' } return val; };';
  return Function.apply(null, fnParams.concat(newSrc));
}

