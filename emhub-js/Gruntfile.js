module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['assets/js/emola/*.js', 'assets/typescript/**/*.ts'],
      tasks: ['ts']
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
        separator: ''
      },
      dist: {
        src: [
          'assets/js/emola/EMOLA.js',
          'assets/js/emola/EMOLA.DictEnv.js',
          'assets/js/emola/EMOLA.Fn.js',
          'assets/js/emola/EMOLA.Quote.js',
          'assets/js/emola/EMOLA.Node.js',
          'assets/js/emola/EMOLA.Atom.js',
          'assets/js/emola/EMOLA.Color.js',
          'assets/js/emola/EMOLA.Point.js',
          'assets/js/emola/EMOLA.Rect.js',
          'assets/js/emola/EMOLA.Size.js',
          'assets/js/emola/EMOLA.Text.js',
          'assets/js/emola/EMOLA.Figure.js',
          'assets/js/emola/EMOLA.Circle.js',
          'assets/js/emola/EMOLA.List.js',
          'assets/js/emola/EMOLA.List.*.js',
          'assets/js/emola/EMOLA.Line.js',
          'assets/js/emola/EMOLA.TokenReader.js',
          'assets/js/emola/EMOLA.ContextWrapper.js',
          'assets/js/emola/EMOLA.DrawingManager.js',
          'assets/js/emola/EMOLA.Socket.js',
          'assets/js/emola/EMOLA.Global.js',
          'assets/js/emola/EMOLA.Core.js',
          'assets/js/emola/EMOLA.External.js',
          'assets/js/emola/EMOLA.Front.js'
        ],
        dest: 'public/js/build/emola.js'
      }
    },

    typescript: {
      base: {
        src: ['assets/typescript/emola/**/*.ts'],
        dest: 'public/js/build/emola.js',
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
        src: 'public/js/build/emola.js',
        dest: 'public/js/build/emola.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  // デフォルトタスクの設定
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('js', ['concat', 'jasmine']);
  grunt.registerTask('ts', ['typescript']);
  grunt.registerTask('ts-test', ['typescript','jasmine']);
};
