'use strict';

module.exports = (grunt) => {

  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.initConfig({
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          scriptPath: require.resolve('./node_modules/.bin/istanbul'),
          mask: '*.test.js',
          quiet: true,
          recursive: true,
          require: ['test/common']
        }
      },
      test: {
        src: 'test',
        options: {
          recursive: true,
          reporter: 'spec',
          require: ['test/common']
        }
      }
    }
  });


  grunt.registerTask('test', ['mocha_istanbul:test']);
  grunt.registerTask('default', 'check');
};