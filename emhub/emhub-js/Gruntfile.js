module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['assets/typescript/**/*.ts'],
      tasks: ['ts']
    },

    jasmine: {
      dist: {
        src: [
          '../resources/public/js/lib/jquery/dist/jquery.js',
          '../resources/public/js/lib/jquery-console/jquery.console.js',
          '../resources/public/js/build/emola.js'
        ],
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },

    typescript: {
      base: {
        src: ['assets/typescript/emola/**/*.ts'],
        dest: '../resources/public/js/build/emola.js',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          basePath: 'assets/typescript',
          sourceMap: true,
          declaration: true
        }
      }
    },
 
    // ファイル圧縮の設定
    uglify: {
      options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '../resources/public/js/build/emola.js',
        dest: '../resources/public/js/build/emola.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  // デフォルトタスクの設定
  grunt.registerTask('ts', ['typescript']);
  grunt.registerTask('ts-test', ['typescript','jasmine']);
  grunt.registerTask('default', ['ts', 'uglify']);
};
