/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>
/// <reference path="manager.ts"/>
/// <reference path="error.ts"/>

module emola {
  export class Global {
    static graphicContext: CanvasContext = null
    static drawingManager: DrawingManager = new DrawingManager(new Socket())
  }

  export class ConsoleManager {
    callbackList: any
    commandContainer: any

    constructor(htmlString: string, func) {
      this.commandContainer = $(htmlString)
      this.callbackList = func;

      $('#emola-console').append(this.commandContainer);
      this.commandContainer.console({
        promptLabel: 'Emola> ',
        commandValidate: function(line) {
          return line !== "";
        },
        commandHandle:this.callbackList,
        autofocus: true,
        animateScroll: true,
        promptHistory: true,
        charInsertTrigger: function(keycode,line) {
          return true;
        }
      })
    }
  }

  class Main {
    static drawLoop () {
      setTimeout(Main.drawLoop, 15)
      Global.graphicContext.clear()
      CanvasWindow.createCanvasWindow(Global.graphicContext);
      Global.drawingManager.draw(Global.graphicContext)
    }

    static initGraphicContext () {
      if (Global.graphicContext === null) {
        var canvas = document.getElementById('canvas');
        Global.graphicContext = CanvasContext.create(canvas);
        if(Global.graphicContext !== null) {
          Main.drawLoop();
        }
      }
    }

    static getPosition(e:any):Point {
      var pageX = e.pageX;
      var pageY = e.pageY;
      var rect = e.target.getBoundingClientRect();

      var x = pageX - rect.left;
      var y = pageY - rect.top;
      return new Point(x, y)
    }

    static getDrawingObject(drawing:any , e:any):any {
      var point = Main.getPosition(e)
      return Global.drawingManager.getListObject(point, drawing)
    }

    static start() {
      var druggingObject = null
      var drugging = false
      var env: Env = new Env(null)

      $(document).ready(() => {
        Main.initGraphicContext();

        new ConsoleManager('<div class="console">', (line) => {
          var parsedList;
          var result = ''
          try {
            var tokenReader: TokenReader = new TokenReader();
            tokenReader.add(line)
            parsedList = Parser.parse(tokenReader);
            if (parsedList.draw) {
              Global.drawingManager.add(parsedList)
            }
            result = parsedList.evalSyntax(env)
          } catch (e) {
            result = e.name + ": " + '"' + e.message + '"';
          }
          return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
        });
      });

      $(window).mousedown((e) => {
        drugging = true
        var drawing = Main.getDrawingObject(null, e)
        if (drawing) {
          druggingObject = drawing
        }
      })

      $(window).mouseup((e) => {
          drugging = false
          if (druggingObject) {
            var drawing = Main.getDrawingObject(druggingObject, e)
            if (drawing && druggingObject != drawing) {
              drawing.add(druggingObject)
              // Global.drawingManager.remove(druggingObject);
            }
            druggingObject = null
          }
        }
      );

      $(window).mousemove((e) => {
          if (druggingObject) {
            druggingObject.point = Main.getPosition(e)
          }
        }
      );

      $(window).dblclick((e) => {
          console.log("double clicked");
          var drawing = Main.getDrawingObject(druggingObject, e)
          if (drawing) {
            var result = drawing.evalSyntax(env);
            console.log(result);
            var text: Text = new Text(result, drawing.point, new Color());
            Global.drawingManager.add(text);
          }
        }
      );
    }
  }
  Main.start();
}
