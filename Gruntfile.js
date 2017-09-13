var LIVERELOAD_PORT = 35729;

var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
  
    // configurable paths
    var yeomanConfig = {
      app: 'src',
      dist: 'dist'
    };
  
    grunt.initConfig({
      yeoman: yeomanConfig,
      watch: {
        coffee: { 
          files: ['<%= yeoman.app %>/scripts/{,*/}{,*/}{,*/}*.coffee'],
          tasks: ['coffee:dist']
        },
        coffeeTest: {
          files: ['test/spec/**/*.coffee'],
          tasks: ['coffee:test']
        },
        coffeeTestProtractor: {
          files: ['test/e2e/**/*.coffee'],
          tasks: ['coffee:testE2E', 'protractor']
        },
        compass: {
          files: ['<%= yeoman.app %>/app/styles/{,*/}*.{scss,sass}'],
          tasks: ['compass:server', 'autoprefixer']
        },
        styles: {
          files: ['<%= yeoman.app %>/app/styles/{,*/}*.css'],
          tasks: ['copy:styles', 'autoprefixer']
        },
        livereload: {
          options: {
            livereload: LIVERELOAD_PORT
          },
          files: [
            '<%= yeoman.app %>/{,*/}{,*/}{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
            '<%= yeoman.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },
      autoprefixer: {
        options: ['last 1 version'],
        dist: {
          files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '**/*.css',
            dest: '.tmp/styles/'
          }]
        }
      },
      connect: {
        options: {
          port: 9003,
          hostname: 'localhost'
        },
        proxies: [
          {
              host: 'localhost',
              port: 80,
              https: false,
              rewriteCookiePath: '/',
              contextMatcher: function(url) {

                var parts = url.split('?')[0].split('/');
                return (parts[1] === 'api' && parts.length > 2 && true );

              }
          },
          {
              context: '/api',
              host: 'localhost',
              port: 80,
              https: false,
              changeOrigin: true
          }
        ],
        livereload: {
          options: {
            middleware: function (connect) {
              return [
                proxySnippet,
                lrSnippet,
                mountFolder(connect, '.tmp'),
                mountFolder(connect, yeomanConfig.app)
              ];
            }
          }
        },
        test: {
          options: {
            middleware: function (connect) {
              return [
                mountFolder(connect, '.tmp'),
                mountFolder(connect, 'test')
              ];
            }
          }
        },
        dist: {
          options: {
            middleware: function (connect) {
              return [
                proxySnippet,
                mountFolder(connect, yeomanConfig.dist)
              ];
            }
          }
        }
      },
      open: {
        server: {
          url: 'http://localhost:<%= connect.options.port %>'
        }
      },
      clean: {
        dist: {
          files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }]
        },
        server: '.tmp'
      },
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      coffee: {
        options: {
          sourceMap: false,
          sourceRoot: ''
        },
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/scripts',
            src: '**/*.coffee',
            dest: '.tmp/scripts',
            ext: '.js'
          }]
        },
        test: {
          files: [{
            expand: true,
            cwd: 'test',
            src: 'spec/**/*.coffee',
            dest: '.tmp',
            ext: '.js'
          }]
        },
        testE2E: {
          files: [{
            expand: true,
            cwd: 'test',
            src: 'e2e/**/*.coffee',
            dest: '.tmp',
            ext: '.js'
          }]
        },
        mocks: {
          files: [{
            expand: true,
            cwd: 'test',
            src: 'mocks/**/*.coffee',
            dest: '.tmp',
            ext: '.js'
          }]
        }
      },
      compass: {
        options: {
          sassDir: '<%= yeoman.app %>/app/styles',
          cssDir: '.tmp/styles',
          generatedImagesDir: '.tmp/images/generated',
          imagesDir: '<%= yeoman.app %>/assets/img',
          javascriptsDir: '<%= yeoman.app %>/scripts',
          fontsDir: '<%= yeoman.app %>/assets/font',
          importPath: 'bower_components',
          httpImagesPath: '<%= yeoman.app %>/assets/img',
          httpGeneratedImagesPath: '<%= yeoman.app %>/assets/img/generated',
          httpFontsPath: '<%= yeoman.app %>/app/styles/fonts',
          relativeAssets: false
        },
        dist: {},
        server: {
          options: {
            debugInfo: true
          }
        }
      },
      rev: {
        dist: {
          files: {
            src: [
              '<%= yeoman.dist %>/scripts/{,*/}*.js',
              '<%= yeoman.dist %>/styles/{,*/}*.css',
              '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
              '<%= yeoman.dist %>/styles/fonts/*'
            ]
          }
        }
      },
      useminPrepare: {
        html: ['<%= yeoman.app %>/index.html'],
        options: {
          dest: '<%= yeoman.dist %>'
        }
      },
      usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        options: {
          dirs: ['<%= yeoman.dist %>']
        }
      },
       imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/assets/img',
            src: '**/*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/assets/img'
          }]
        }
      },
      svgmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/assets/img',
            src: '**/*.svg',
            dest: '<%= yeoman.dist %>/assets/img'
          }]
        }
      },
      htmlmin: {
        dist: {
          options: {
            removeCommentsFromCDATA: false,
            collapseWhitespace: false,
            collapseBooleanAttributes: false,
            removeAttributeQuotes: false,
            removeRedundantAttributes: false,
            useShortDoctype: false,
            removeEmptyAttributes: false,
            removeOptionalTags: false
          },
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: ['*.html', 'views/**/*.html'],
            //src: ['*.html'],
            dest: '<%= yeoman.dist %>'
          }]
        }
      },
      // Put files not handled in other tasks here
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt,json}',
              'bower_components/{,*/}*',
              'assets/img/{,*/}*.{gif,webp}',
              'assets/font/*',
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: [
              'generated/*'
            ]
          }]
        },
        styles: {
          expand: true,
          cwd: '<%= yeoman.app %>/app/styles',
          dest: '.tmp/styles/',
          src: '**/*.css'
        }
      },
      concurrent: {
        server: [
          'coffee:dist',
          'compass:server',
          'copy:styles'
        ],
        test: [
          'coffee',
          'compass',
          'copy:styles'
        ],
        dist: [
          'coffee',
          'compass:dist',
          'copy:styles',
          'imagemin',
          'svgmin',
          'htmlmin'
        ]
      },
      karma: {
        dist: {
          configFile: 'karma.conf.js',
          singleRun: false
        },
        coverage: {
          configFile: 'karma.coverage.conf.js',
          singleRun: true
        }
      },
      cdnify: {
        dist: {
          html: ['<%= yeoman.dist %>/*.html']
        }
      },
      ngmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.dist %>/scripts',
            src: '*.js',
            dest: '<%= yeoman.dist %>/scripts'
          }]
        }
      },
      uglify: {
        dist: {
          files: {
            '<%= yeoman.dist %>/scripts/scripts.js': [
              '<%= yeoman.dist %>/scripts/scripts.js'
            ]
          }
        }
      },
  
      protractor: {
        options: {
              chromeOnly: false,
              configFile:  'protractor.conf.js',
              keepAlive: true, // If false, the grunt process stops when the test fails.
              noColor: false, // If true, protractor will not use colors in its output.
              args: {
                  
              }
          },
          chrome: {
              options: {
                    args: {
                        browser: 'chrome'
                    }
                }
          },
      }
  
    });
  
    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies', 'open', 'connect:dist:keepalive']);
        }

        if (target === 'protractor'){
            return grunt.task.run([
                'clean:server',
                'concurrent:server',
                'autoprefixer',
                'configureProxies',
                'connect:livereload',
                'open',
                'watch',
            ]);
        }
    
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'configureProxies',
            'connect:livereload',
            'coffee:testE2E',
            'open',
            'watch'
        ]);
    });
  

    grunt.registerTask('test', [
        'connect:test',
        'karma:dist'
    ]);
  
    grunt.registerTask('coverage', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma:coverage'
    ]);
  
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:dist',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'

    ]);

    grunt.registerTask('default', [
      'jshint',
      'test',
      'build'
    ]);
    
  };
  