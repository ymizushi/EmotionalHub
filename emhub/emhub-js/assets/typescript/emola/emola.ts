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
    private list: any[]
    private socket: Socket

    constructor(socket: Socket) {
      this.list = []
      this.socket = socket
    }
    
    add(drawing: any) {
      this.list.push(drawing)
      // this.socket.send("hoge")
    }
    
    remove(drawing) {
      this.list.forEach(function(element) {
        if (element instanceof GraphExpList) {
          element.remove(drawing)
        }
      })
    }

    clear() {
      this.list = []
    }
    
    draw(context) {
      for (var i=0;i<this.list.length;i++) {
        if (this.list[i].rotate) {
          this.list[i].rotate(0.01)
        }
        this.list[i].draw(context)
      }
    }

    getListObject(point: Point, drawing) {
      for (var i in this.list) {
        var targetListObject = this.list[i].getListObject(point)
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

  export class Core {
    static createList(syntaxList, parentList) {
      var firstList = syntaxList[0];
      var syntaxMap = {};
      /* lang */
      syntaxMap[Atom.FN] = GraphFnList;
      syntaxMap[Atom.IF] = GraphIfList;
      syntaxMap[Atom.DEF] = GraphDefList;
      syntaxMap[Atom.DEFN] = GraphDefnList;
      syntaxMap[Atom.DO] = GraphDoList;
      syntaxMap[Atom.SEND] = GraphSendList;
      syntaxMap[Atom.LET] = GraphLetList;
      syntaxMap[Atom.QUOTE] = GraphQuoteList;
      syntaxMap[Atom.EVAL] = GraphEvalList;
    
      /* math */
      syntaxMap[Atom.PLUS] = GraphPlusList;
      syntaxMap[Atom.MINUS] = GraphMinusList;
      syntaxMap[Atom.DIV] = GraphDivList;
      syntaxMap[Atom.MUL] = GraphMulList;
      syntaxMap[Atom.EQUAL] = GraphEqualList;
      syntaxMap[Atom.GREATER] = GraphGreaterList;
      syntaxMap[Atom.LESS] = GraphLessList;
      syntaxMap[Atom.GREATEREQUAL] = GraphGreaterEqualList;
      syntaxMap[Atom.LESSEQUAL] = GraphLessEqualList;
    
      /* graphic */
      syntaxMap[Atom.DRAW] = GraphDrawList;
      syntaxMap[Atom.POINT] = GraphPointList;
      syntaxMap[Atom.COLOR] = GraphColorList;
      syntaxMap[Atom.CIRCLE] = GraphCircleList;
      syntaxMap[Atom.CLEAR] = GraphClearList;
    
      var TargetFunction = syntaxMap[firstList.type];
      if (!TargetFunction) {
        TargetFunction = GraphVarList;
      }
      return new TargetFunction(syntaxList, parentList);
    }

    static createContextWrapper = function (canvasId) {
      var canvas:any = document.getElementById(canvasId)
      if (!canvas || !canvas.getContext) {
        return null
      }
      return new CanvasContext(canvas.getContext('2d'))
    }
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
      Global.graphicContext = Core.createContextWrapper('canvas');
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
