'use strict';

const coveralls = require('coveralls');

module.exports = (grunt) => {

  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.initConfig({
    mocha_istanbul: {
      coverage: {
        src: ['./test/**/*.test.js'],
        options: {
          scriptPath: require.resolve('./node_modules/.bin/istanbul'),
          mask: '*.test.js',
          quiet: true,
          recursive: true,
          require: ['test/common']
        }
      },
      test: {
        src: ['./test/**/*.test.js'],
        options: {
          recursive: true,
          reporter: 'spec',
          require: ['test/common']
        }
      },
      coveralls: {
        src: ['./test/**/*.test.js'],
        options: {
          coverage: true,
          recursive: true,
          quiet: true,
          require: ['test/common'],
          scriptPath: require.resolve('./node_modules/.bin/istanbul')
        }
      }
    }
  });

  grunt.event.on('coverage', function(lcov, done){
    return coveralls.handleInput(lcov, done);
  });

  grunt.registerTask('test', ['mocha_istanbul:test']);
  grunt.registerTask('check', ['test']);
  grunt.registerTask('coveralls', ['mocha_istanbul: coveralls']);
  grunt.registerTask('default', 'check');
};