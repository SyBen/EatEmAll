module.exports = function (grunt) {
  'use strict';


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      server: {
        options: {
          script: './server.js',
          port: 8080,
        }
      }
    },

    watch: {
      express: {
        files: ['**/*'],
        tasks: ['express:server'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    open: {
      dist: {
        path: 'http://localhost:8080/index.html'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
  });

  //Load plugin(s)
  require('load-grunt-tasks')(grunt);
  
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('run', ['express:server', 'open', 'watch']);

};