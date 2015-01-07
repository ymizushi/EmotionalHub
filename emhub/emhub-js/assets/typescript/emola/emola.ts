/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>

module emola {
  var emola:any
  emola = {}

  class DrawingManager {
    private graphList: GraphExpList[]
    private socket: Socket

    constructor(socket: Socket) {
      this.graphList = []
      this.socket = socket
    }
    
    add(drawing: any) {
      this.graphList.push(drawing)
      // this.socket.send("hoge")
    }
    
    remove(drawing) {
      this.graphList.forEach(function(element) {
        element.remove(drawing);
      })
    }

    clear() {
      this.graphList = []
    }
    
    draw(context) {
      for (var i=0;i<this.graphList.length;i++) {
        if (this.graphList[i].rotate) {
          this.graphList[i].rotate(0.01)
        }
        this.graphList[i].draw(context)
      }
    }

    getListObject(point: Point, drawing:Drawable) {
      for (var i in this.graphList) {
        var targetListObject = this.graphList[i].getListObject(point)
        if (targetListObject && targetListObject !== drawing) {
          return targetListObject
        }
      }
    }
  }
  
  export class Global {
    static env = new Env(null)
    static tokenReader = new TokenReader()
    static graphicContext = null
    static socket = new Socket()
    static drawingManager = new DrawingManager(Global.socket)
    static drugging = false
  }

  class ConsoleManager {
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
    addCallback(callback) {
      this.callbackList = callback
    }
  }
  
  emola.Front = {};
  emola.Front.drawLoop = function () {
    setTimeout(emola.Front.drawLoop, 15)
    Global.graphicContext.clear()
    Global.drawingManager.draw(Global.graphicContext)
  }

  $(document).ready(function() {
    if (Global.graphicContext === null) {
      var canvas = document.getElementById('canvas');
      Global.graphicContext = CanvasContext.create(canvas);
      if(Global.graphicContext !== null) {
        emola.Front.drawLoop();
      }
    }
  
    var consoleManager = new ConsoleManager('<div class="console">', function (line) {
        var parsedList;
      var result = ''
        try {
          Global.tokenReader.add(line)
          parsedList = Parser.parse(Global.tokenReader);
          if (parsedList.draw) {
            // var palette = new Palette()
            // var paletteWidget = new PaletteWidget(SyntaxNode.Plus)
            // palette.add(paletteWidget)
            // Global.drawingManager.add(palette)

            Global.drawingManager.add(parsedList)

          }
          result = parsedList.evalSyntax(Global.env)
        } catch (e) {
          result = "Parse error"
          console.log(e)
        } 
        return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
      })
  });

  class EventManager {
    constructor() {

      function getPosition(e:any):Point {
        var pageX = e.pageX;
        var pageY = e.pageY;
        var rect = e.target.getBoundingClientRect();

        var x = pageX - rect.left;
        var y = pageY - rect.top;
        return new Point(x, y)
      }

      function getDrawingObject(drawing:any , e:any):any {
        var point = getPosition(e)
        return Global.drawingManager.getListObject(point, drawing)
      }

      (function () {
        var druggingObject = null
        var drawing = null

        $(window).mousedown(function (e) {
          Global.drugging = true
          var drawing = getDrawingObject(null, e)
          if (drawing) {
            druggingObject = drawing
          }
        })

        $(window).mouseup(
          function (e) {
            Global.drugging = false
            if (druggingObject) {
              var drawing = getDrawingObject(druggingObject, e)
              if (drawing && druggingObject != drawing) {
                drawing.add(druggingObject)
                // Global.drawingManager.remove(druggingObject);
              }
              druggingObject = null
            }
          }
        )
        
        $(window).mousemove(
          function (e) {
            if (druggingObject) {
              druggingObject.point = getPosition(e)
            }
          }
        )
      })()
    }

  }

  new EventManager()
}
