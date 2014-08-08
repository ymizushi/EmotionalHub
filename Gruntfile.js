module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['assets/js/*.js'],
      tasks: ['concat:emola', 'jasmine']
    },

    jasmine: {
      dist: {
        src: [
          'public/js/lib/jquery/dist/jquery.js',
          'public/js/lib/jquery-console/jquery.console.js',
          'public/js/build/emola.js'
        ],
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
        src: [
          'assets/js/emola/EMOLA.js',
          'assets/js/emola/EMOLA.DictEnv.js',
          'assets/js/emola/EMOLA.Fn.js',
          'assets/js/emola/EMOLA.Atom.js',
          'assets/js/emola/EMOLA.Color.js',
          'assets/js/emola/EMOLA.Point.js',
          'assets/js/emola/EMOLA.Figure.js',
          'assets/js/emola/EMOLA.Circle.js',
          'assets/js/emola/EMOLA.Core.js',
          'assets/js/emola/EMOLA.Front.js'
        ],
        dest: 'public/js/build/emola.js'
      }
    },
 
    // ファイル圧縮の設定
    uglify: {
      options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/js/build/emohub.js',
        dest: 'public/js/build/emohub.min.js'
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
