/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="manager.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>
/// <reference path="error.ts"/>

module emola {
  export class Global {
    static graphicContext: CanvasContext = null
    static drawingManager: DrawingManager = new DrawingManager(new Socket())
    static env: Env = new Env(null)
  }

  export class Console {
    callbackList: any
    commandContainer: any

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
    static drawLoop () {
      setTimeout(Main.drawLoop, 15)
      Global.graphicContext.clear()
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
      var point: Point = Main.getPosition(e)
      var palette: Palette = Global.drawingManager.getPalette();
      var widgetComponent:WidgetComponent = palette.click(point);
      if (widgetComponent) {
        var parsedObject = Main.createParsedObject(widgetComponent.toString());
        parsedObject.point = Point.copy(point);
        if (parsedObject.draw) {
          Global.drawingManager.add(parsedObject)
        }
      }

      return Global.drawingManager.getListObject(point, drawing)
    }

    static createParsedObject(line: string): GraphExpList {
      var tokenReader: TokenReader = new TokenReader();
      tokenReader.add(line)

      return Parser.parse(tokenReader);
    }

    static read(line: string) {
      var parsedList;
      var result = ''
      try {
        var tokenReader: TokenReader = new TokenReader();
        tokenReader.add(line)
        parsedList = Parser.parse(tokenReader);
        if (parsedList.draw) {
          Global.drawingManager.add(parsedList)
        }
        result = parsedList.evalSyntax(Global.env)
      } catch (e) {
        result = e.name + ": " + '"' + e.message + '"';
      }
      return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
    }

    static start() {
      var druggingObject = null
      var drugging = false

      $(document).ready(() => {
        Main.initGraphicContext();

        var console: Console = new Console('<div class="console">', Main.read);
        console.init();
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
          var drawing = Main.getDrawingObject(druggingObject, e)
          if (drawing) {
            //drawing.anim();
            var result = drawing.evalSyntax(Global.env);
            var text: Text = new Text(result, drawing.point, new Color());
            Global.drawingManager.addText(text);
          }
        }
      );
    }
  }
  Main.start();
}
