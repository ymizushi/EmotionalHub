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

    static getDrawingObject(drawing:any , e:any, drawingManager:DrawingDirector, tokenReader: TokenReader):any {
      var point: Point = Main.getPosition(e)
      var palette: Palette = drawingManager.getPalette();
      var widgetComponent:WidgetComponent = palette.click(point);
      if (widgetComponent) {
        var parsedObject = Main.createParsedObject(widgetComponent.toString(), tokenReader);
        parsedObject.point = Point.copy(point);
        if (parsedObject.draw) {
          drawingManager.add(parsedObject)
        }
      }

      return drawingManager.getListObject(point, drawing)
    }

    static createParsedObject(line: string, tokenReader: TokenReader): GraphExpList {
      tokenReader.add(line)

      return Parser.parse(tokenReader);
    }

    static read(inputStr: string, tokenReader: TokenReader, env: Env, drawingDirector: DrawingDirector) {
      var result: string;
      try {
        var parsedList:any = Main.createParsedObject(inputStr, tokenReader);
        if (parsedList.draw) {
          drawingDirector.add(parsedList);
        }
        result = parsedList.evalSyntax(env, drawingDirector)
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
      var drawingDirector: DrawingDirector;
      var tokenReader: TokenReader = new TokenReader();

      $(document).ready(() => {
        var canvas = document.getElementById('canvas');
        var canvasContext: CanvasContext = CanvasContext.create(canvas);
        if (canvasContext !== null) {
          drawingDirector = new DrawingDirector(canvasContext);
          Main.drawLoop(drawingDirector);
        }
        var console: Console = new Console('<div class="console">', (line: string) => {
            return Main.read(line, tokenReader, env, drawingDirector)
          }
        );
        console.init();
        socket.onMessage((event) => {
          return Main.read(event.data, tokenReader, env, drawingDirector)
        });
      });

      $(window).mousedown((e) => {
        drugging = true

        var drawing = Main.getDrawingObject(null, e, drawingDirector, tokenReader);
        if (drawing) {
          druggingObject = drawing
        }
      })

      $(window).mouseup((e) => {
          drugging = false
          if (druggingObject) {
            var drawing = Main.getDrawingObject(druggingObject, e, drawingDirector, tokenReader);
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
          var drawing = Main.getDrawingObject(druggingObject, e, drawingDirector, tokenReader);
          if (drawing) {
            //drawing.anim();
            var point =Point.copy(drawing.point);
            point.y += 20
            drawingDirector.addDisplayElement(new Text(TreeSerializer.serialize(drawing), point, new Color()));
            socket.send(TreeSerializer.serialize(drawing));
            var result = drawing.evalSyntax(env);
            var text: Text = new Text(result, drawing.point, new Color());
            drawingDirector.addDisplayElement(text);
          }
        }
      );
    }
  }
  Main.start();
}
