module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['assets/js/*.js'],
      tasks: ['concat', 'jasmine']
    },

    jasmine: {
      emohub: {
        src: 'assets/js/Emohub.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/js/Emohub.js', 'assets/js/main.js'],
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

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // デフォルトタスクの設定
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('dev', ['concat', 'jasmine']);
};
