module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'assets/js/Emohub.js',
          'assets/js/main.js',
        ],
        dest: 'build/js/emohub.js'
      }
    },
 
    // ファイル圧縮の設定
    uglify: {
      options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/emohub.js',
        dest: 'build/js/emohub.min.js'
      }
    }
  });
 
  // プラグインのロード
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
  // デフォルトタスクの設定
  grunt.registerTask('build', [ 'concat', 'uglify' ]);
};
