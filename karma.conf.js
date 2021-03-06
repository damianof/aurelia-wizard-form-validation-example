// Karma configuration
// Generated on Fri Dec 05 2014 16:49:29 GMT-0500 (EST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'app',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine-ajax', 'jasmine-jquery', 'jasmine', 'jasmine-matchers', 'sinon', 'source-map-support'],

    jspm: {
      // Edit this to your needs
      loadFiles: [
        'src/**/*.js',
        'test/unit/**/*.spec.js'
      ],
      paths: {
        "*": "*.js"
      }
    },

    // list of files / patterns to load in the browser
    files: [
      '../node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'
      //'test/unit/spec-helper.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/unit/**/*.js': ['babel'],
      'src/**/*.js': ['babel']
    },

    'babelPreprocessor': {
      options: {
        sourceMaps: 'inline',
        optional: [
          "es7.decorators",
          "es7.classProperties"
        ]
      },
      filename: function (file) {
        return file.originalPath;
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    coverageReporter: {
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
        'src/**/*.js': 'isparta'
      },
      dir: '../coverage/',
      reporters: [
        {
          type: 'text-summary',
          subdir: normalizationBrowserName
        },
        {
          type: 'html',
          subdir: normalizationBrowserName
        }
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['story'],
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });

  function normalizationBrowserName(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0];
  }
};
