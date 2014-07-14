module.exports = function(grunt) {
  'use strict';

  var buildPackage = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: buildPackage,
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: ['should'],
          ui: 'bdd'
        },
        src: ['test/**/*.js']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', 'Developer Build', ['mochaTest']);

};
