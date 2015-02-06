/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="manager.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>
/// <reference path="error.ts"/>
/// <reference path="serializer.ts"/>

module emola {
  export class Console {
    commandContainer: any
    callbackList: any;

    constructor(htmlString: string, func) {
      this.commandContainer = $(htmlString)
      this.callbackList = func;
    }

    init() {
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
    static drawLoop (drawingManager: DrawingDirector) {
      setTimeout(Main.drawLoop, 15, drawingManager);
      drawingManager.clearCanvasContext();
      drawingManager.draw()
    }

    static getPosition(e:any):Point {
      var pageX = e.pageX;
      var pageY = e.pageY;
      var rect = e.target.getBoundingClientRect();

      var x = pageX - rect.left;
      var y = pageY - rect.top;
      return new Point(x, y)
    }

    static getDrawingObject(drawing:any , e:any, drawingManager:DrawingDirector):any {
      var point: Point = Main.getPosition(e)
      var palette: Palette = drawingManager.getPalette();
      var widgetComponent:WidgetComponent = palette.click(point);
      if (widgetComponent) {
        var parsedObject = Main.createParsedObject(widgetComponent.toString());
        parsedObject.point = Point.copy(point);
        if (parsedObject.draw) {
          drawingManager.add(parsedObject)
        }
      }

      return drawingManager.getListObject(point, drawing)
    }

    static createParsedObject(line: string): GraphExpList {
      var tokenReader: TokenReader = new TokenReader();
      tokenReader.add(line)

      return Parser.parse(tokenReader);
    }

    static read(line: string, env: Env, drawingManager: DrawingDirector) {
      var parsedList;
      var result = ''
      try {
        var tokenReader: TokenReader = new TokenReader();
        tokenReader.add(line)
        parsedList = Parser.parse(tokenReader);
        if (parsedList.draw) {
          drawingManager.add(parsedList)
        }
        result = parsedList.evalSyntax(env, drawingManager)
      } catch (e) {
        result = e.name + ": " + '"' + e.message + '"';
      }
      return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
    }

    static start() {
      var druggingObject = null;
      var drugging = false;
      var socket: Socket = new Socket();
      var env: Env = new Env(null);
      var canvasContext: CanvasContext;
      var drawingManager: DrawingDirector;

      $(document).ready(() => {
        var canvas = document.getElementById('canvas');
        canvasContext = CanvasContext.create(canvas);
        if (canvasContext !== null) {
          drawingManager = new DrawingDirector(canvasContext);
          Main.drawLoop(drawingManager);
        }
        var console: Console = new Console('<div class="console">', (line: string) => {
            var parsedList;
            var result = ''
            try {
              var tokenReader: TokenReader = new TokenReader();
              tokenReader.add(line);
              parsedList = Parser.parse(tokenReader);
              if (parsedList.draw) {
                drawingManager.add(parsedList)
              }
              result = parsedList.evalSyntax(env, drawingManager)
            } catch (e) {
              result = e.name + ": " + '"' + e.message + '"';
              throw e;
            }
            return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
          }
        );
        console.init();
        socket.onMessage((event) => { Main.read(event.data, env, drawingManager)});
      });

      $(window).mousedown((e) => {
        drugging = true

        var drawing = Main.getDrawingObject(null, e, drawingManager);
        if (drawing) {
          druggingObject = drawing
        }
      })

      $(window).mouseup((e) => {
          drugging = false
          if (druggingObject) {
            var drawing = Main.getDrawingObject(druggingObject, e, drawingManager);
            if (drawing && druggingObject != drawing) {
              drawing.add(druggingObject)
            }
            druggingObject = null
          }
        }
      );

      $(window).mousemove((e) => {
          if (drugging && druggingObject) {
            druggingObject.point = Main.getPosition(e)
          }
        }
      );

      $(window).dblclick((e) => {
          var drawing = Main.getDrawingObject(druggingObject, e, drawingManager);
          if (drawing) {
            //drawing.anim();
            var point =Point.copy(drawing.point);
            point.y += 20
            drawingManager.addDisplayElement(new Text(TreeSerializer.serialize(drawing), point, new Color()));
            socket.send(TreeSerializer.serialize(drawing));
            var result = drawing.evalSyntax(env);
            var text: Text = new Text(result, drawing.point, new Color());
            drawingManager.addDisplayElement(text);
          }
        }
      );
    }
  }
  Main.start();
}
