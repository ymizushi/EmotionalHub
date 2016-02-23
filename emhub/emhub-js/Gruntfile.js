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

    tsc: {
      base: {
        files: [
          {
            dest: '../resources/public/js/build/emola.js',
            src: ['assets/typescript/emola/**/*.ts'],
            ext: ".js",
            options: {
              expand : "true",
              module: 'amd', //or commonjs
              target: 'es5', //or es3
              sourceMap: true,
              declaration: true
            }
          }
        ]
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
  grunt.loadNpmTasks('grunt-tsc');
  // デフォルトタスクの設定
  grunt.registerTask('ts', ['tsc']);
  grunt.registerTask('ts-test', ['tsc','jasmine']);
  grunt.registerTask('default', ['ts', 'uglify']);
};
