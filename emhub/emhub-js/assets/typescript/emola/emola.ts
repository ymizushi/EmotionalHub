/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="shape.ts" />
/// <reference path="lang.ts" />
///<reference path="syntax_list.ts"/>
///<reference path="canvas.ts"/>
///<reference path="reader.ts"/>
///<reference path="socket.ts"/>

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
        if (element == drawing) {
          this.list.splice(element,1)
        }
        if (element instanceof ExpList) {
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
  
  export class Parser {
    static parse(tokenReader, parentList = null) {
      var syntaxList = [];
      while (true) {
        var token = tokenReader.next();
        var point;
        if (!parentList) {
          var x = Math.random() * 200;
          var y = Math.random() * 200;
          point = new Point(Math.floor(x), Math.floor(y));
        } else {
          point = null;
        }
        if (token === '(') {
          syntaxList.push(Parser.parse(tokenReader, parentList));
        } else if (token === ')') {
          return Core.createList(syntaxList, parentList, point);
        } else if (token === null) {
          break;
        } else {
          syntaxList.push(Atomizer.atomize(token));
        }
      }
      return syntaxList[0];
    }
  }

  export class Global {
    static env = new Env(null)
    static tokenReader = new TokenReader()
    static graphicContext = null
    static socket = new Socket()
    static drawingManager = new DrawingManager(Global.socket)
    static lastClickedPoint = null
    static drugging = false
    static clickPoint = new Point(0, 0)
    static event = null
  }

  export class Core {



    static createList(syntaxList, parentList, point) {
      var firstList = syntaxList[0];
      var syntaxMap = {};
      /* lang */
      syntaxMap[Atom.FN] = FnList;
      syntaxMap[Atom.IF] = IfList;
      syntaxMap[Atom.DEF] = DefList;
      syntaxMap[Atom.DEFN] = DefnList;
      syntaxMap[Atom.DO] = DoList;
      syntaxMap[Atom.SEND] = SendList;
      syntaxMap[Atom.LET] = LetList;
      syntaxMap[Atom.QUOTE] = QuoteList;
      syntaxMap[Atom.EVAL] = EvalList;
    
      /* math */
      syntaxMap[Atom.PLUS] = PlusList;
      syntaxMap[Atom.MINUS] = MinusList;
      syntaxMap[Atom.DIV] = DivList;
      syntaxMap[Atom.MUL] = MulList;
      syntaxMap[Atom.EQUAL] = EqualList;
      syntaxMap[Atom.GREATER] = GreaterList;
      syntaxMap[Atom.LESS] = LessList;
      syntaxMap[Atom.GREATEREQUAL] = GreaterEqualList;
      syntaxMap[Atom.LESSEQUAL] = LessEqualList;
    
      /* graphic */
      syntaxMap[Atom.DRAW] = DrawList;
      syntaxMap[Atom.POINT] = PointList;
      syntaxMap[Atom.COLOR] = ColorList;
      syntaxMap[Atom.CIRCLE] = CircleList;
      syntaxMap[Atom.CLEAR] = ClearList;
    
      var TargetFunction = syntaxMap[firstList.type];
      if (!TargetFunction) {
        TargetFunction = VarList;
      }
      return new TargetFunction(syntaxList, parentList, point);
    }
    
    static parseAndEval(tokenReader, env) {
      if (!env) env = new Env(null);
      var parsedList = Parser.parse(tokenReader);
      return parsedList.evalSyntax(env);
    }
    
    static readAndEval(line, env) {
      Global.tokenReader.add(line);
      return Core.parseAndEval(Global.tokenReader, env);
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
  
  $(document).ready(function() {
    if (Global.graphicContext === null) {
      Global.graphicContext = Core.createContextWrapper('canvas');
      if(Global.graphicContext !== null) {
        emola.Front.drawLoop();
      }
    }
  
    var consoleManager = new ConsoleManager('<div class="console">', function (line) {
        var result = ''
        try {
          Global.tokenReader.add(line)
          var parsedList = Parser.parse(Global.tokenReader)
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

      function getPosition(e:any):any {
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
  
  emola.Front.drawLoop = function () {
    setTimeout(emola.Front.drawLoop, 15)
    Global.graphicContext.clear()
    Global.drawingManager.draw(Global.graphicContext)
  }

}
