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
  
      ngHtml2JsPreprocessor: {
        stripPrefix: 'src/'
      },
  
      // web server port
      port: 8089,
      // level of logging
      //  possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
      logLevel: config.LOG_INFO,
  
      reporters: ['progress', 'coverage'],
  
      preprocessors: preprocessors,
       //add the coverage plugin
       //add coverage to reporters
      reporters: ['dots', 'coverage','progress'],
      // tell karma how you want the coverage results
      
       // Output coverage file
      coverageReporter: {
        type : 'lcov',
        subdir: lcof_subdir,
        // output path
        dir : 'test/coverage/'
      },
  
      //coverageReporter: {
      //  type : 'html',
      //  dir : 'coverage/'
      //}, 
  
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
      browsers: ['PhantomJS'],
      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false
    });
  };
  
  
  