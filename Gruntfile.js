module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['assets/js/emola/*.js'],
      tasks: ['concat', 'jasmine']
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
          'assets/js/emola/EMOLA.Exception.js',
          'assets/js/emola/EMOLA.Fn.js',
          'assets/js/emola/EMOLA.Node.js',
          'assets/js/emola/EMOLA.Atom.js',
          'assets/js/emola/EMOLA.Color.js',
          'assets/js/emola/EMOLA.Point.js',
          'assets/js/emola/EMOLA.Rect.js',
          'assets/js/emola/EMOLA.Size.js',
          'assets/js/emola/EMOLA.Figure.js',
          'assets/js/emola/EMOLA.Circle.js',
          'assets/js/emola/EMOLA.List.js',
          'assets/js/emola/EMOLA.List.If.js',
          'assets/js/emola/EMOLA.List.Do.js',
          'assets/js/emola/EMOLA.List.Let.js',
          'assets/js/emola/EMOLA.List.Def.js',
          'assets/js/emola/EMOLA.List.Defn.js',
          'assets/js/emola/EMOLA.List.Send.js',
          'assets/js/emola/EMOLA.List.Fn.js',
          'assets/js/emola/EMOLA.List.Var.js',
          'assets/js/emola/EMOLA.List.Plus.js',
          'assets/js/emola/EMOLA.List.Minus.js',
          'assets/js/emola/EMOLA.List.Mul.js',
          'assets/js/emola/EMOLA.List.Div.js',
          'assets/js/emola/EMOLA.List.Equal.js',
          'assets/js/emola/EMOLA.List.Greater.js',
          'assets/js/emola/EMOLA.List.Greaterequal.js',
          'assets/js/emola/EMOLA.List.Less.js',
          'assets/js/emola/EMOLA.List.Lessequal.js',
          'assets/js/emola/EMOLA.List.Point.js',
          'assets/js/emola/EMOLA.List.Color.js',
          'assets/js/emola/EMOLA.List.Circle.js',
          'assets/js/emola/EMOLA.List.Draw.js',
          'assets/js/emola/EMOLA.List.Clear.js',
          'assets/js/emola/EMOLA.Line.js',
          'assets/js/emola/EMOLA.TokenReader.js',
          'assets/js/emola/EMOLA.ContextWrapper.js',
          'assets/js/emola/EMOLA.DrawingManager.js',
          'assets/js/emola/EMOLA.Global.js',
          'assets/js/emola/EMOLA.Core.js',
          'assets/js/emola/EMOLA.External.js',
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
