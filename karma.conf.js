// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
      // base path, that will be used to resolve files and exclude
      basePath: '',
  
      // testing framework to use (jasmine/mocha/qunit/...)
      frameworks: ['jasmine'],
  
      exclude: exclude,
      // list of files / patterns to load in the browser
      files: files,
  
      plugins: [
        'karma-chrome-launcher',
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage',
        'karma-coffee-preprocessor',
        'karma-ng-html2js-preprocessor'
      ],
  
      preprocessors: {
        '**/*.coffee': ['coffee'],
        '**/*.html': ['ng-html2js']
      },
  
      ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app/',
        // prepend this to the
        //prependPrefix: 'served/',
  
        // or define a custom transform function
        //cacheIdFromPath: function(filepath) {
        //  return cacheId;
        //},
  
        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('foo')
        //moduleName: 'foo'
      },
 
      port: 8088,

      logLevel: config.LOG_INFO,
  
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: ['Chrome'],
      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false
    });
};
  
  
  