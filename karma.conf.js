module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'jasmine'],
    files: [
      'nope.js',
      'test/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'nope.js': [ 'browserify' ],
      'test/*.spec.js': [ 'browserify']
    },
    browsers: ['Chrome']
  });
};
