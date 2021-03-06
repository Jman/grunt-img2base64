/*
 * grunt-img2base64
 * https://github.com/jman/grunt-img2base64
 *
 * Copyright (c) 2015 Eugene Tereschenko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    img2base64: {
      main: {
        options: {
          prefix: '.icon-',
          postfix: ' span'
        },
        files: {
          'tmp/main.css': ['test/fixtures/*']
        }
      },
      empty: {
        files: {
          'tmp/empty.css': ['test/fixtures/*']
        }
      },
      prefix: {
        options: {
          prefix: '.icon-'
        },
        files: {
          'tmp/prefix.css': ['test/fixtures/*']
        }
      },
      postfix: {
        options: {
          postfix: ' span'
        },
        files: {
          'tmp/postfix.css': ['test/fixtures/*']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'img2base64', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
