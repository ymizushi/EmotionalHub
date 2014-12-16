/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="shape.ts" />
/// <reference path="lang.ts" />

module emola {
  var emola:any
  emola = {}

  export class TokenReader {
    tokenizedList: any[]

    constructor(line: string = "") {
      this.tokenizedList = []
      if (line != "") {
        this.add(line)
      }
    }
    
    add(line: string) {
      this.tokenizedList = this.tokenizedList.concat(Core.tokenize(line))
    }
    
    next(): any {
      if (this.tokenizedList.length === 0) {
        return null
      }
      return this.tokenizedList.shift()
    }
  }

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
      for (var i in this.list) {
        if (this.list[i] == drawing) {
          this.list.splice(i,1)
        }
        if (this.list[i] instanceof List) {
          this.list[i].remove(drawing)
        }
      }
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
    
    getDrawing(point, drawing) {
      for (var index in this.list) {
        var emlistObject = this.list[index]
        if (emlistObject.isMet(point) && emlistObject !== drawing ) {
          return emlistObject
        }
      }
    }
    
    getListObject(point, drawing) {
      for (var index in this.list) {
        var listObject = this.list[index]
        var targetListObject = listObject.getListObject(point)
        if (targetListObject && targetListObject !== drawing ) {
          return targetListObject
        }
      }
    }
  }
  

  class Socket {
    socket: any

    constructor() {
      // var socket = new WebSocket("ws://localhost:5000")
      // socket.onopen = function (event) {
      //   console.log("web socket connection is established.")
      // }
      // socket.onmessage = function (event) {
      //   console.log(event.data)
      // }
      // this.socket = socket
    }
    
    send(message) {
      // this.socket.send(message)
    }
  }

  export class Global {
    static env = new DictEnv(null)
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
    static tokenize(inputStr) {
      return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
        function (str) { return str ? true : false
      }).map(
        function (ele) {
          var parsedFloat = parseFloat(ele)
          return isNaN(parsedFloat) ? ele : parsedFloat
        }
      )
    }

    static atomize(token) {
      if (token === Atom.TRUE) {
        return new Atom(Atom.TRUE);
      } else if (token === Atom.FALSE) {
        return new Atom(Atom.FALSE);
      } else if (typeof token === 'string') {
        if (token[0] === '"' || token[0] === "'") {
          return  new Atom(Atom.STR, token.slice(1,-1));
        } else if (Atom.isAtomToken(token)) {
          return  new Atom(token, null);
        }  else {
          return new Atom(Atom.VAR, token);
        }
      } else if (typeof token === 'number') {
          return new Atom(Atom.NUMBER, token);
      } else {
        throw 'Unknown token';
      }
    }

    static parse(tokenReader, parentList=null) {
      var syntaxList = [];
      while(true) {
        var token = tokenReader.next();
        var point;
        if (!parentList) {
          var x = Math.random()*200;
          var y = Math.random()*200;
          point = new Point(Math.floor(x), Math.floor(y));
        } else {
          point = null;
        }
        if (token === '(') {
          syntaxList.push(Core.parse(tokenReader, parentList));
        } else if (token === ')') {
          return Core.createList(syntaxList, parentList, point);
        } else if (token === null) {
          break;
        } else {
          syntaxList.push(Core.atomize(token));
        }
      }
      return syntaxList[0];
    } 

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
      if (!env) env = new DictEnv(null);
      var parsedList = Core.parse(tokenReader);
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
      return new ContextWrapper(canvas.getContext('2d'))
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
          var parsedList = Core.parse(Global.tokenReader)
          if (parsedList.draw) {
            var palette = new Palette()
            var paletteWidget = new PaletteWidget(SyntaxNode.Plus)
            // palette.add(paletteWidget)
            Global.drawingManager.add(palette)

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

  export class MouseInput {
    constructor() {
    }
  }

  export class KeyboardInput {
    constructor() {
    }
  }


  export interface Druggable {
  }

  export class InputManager {
    clicked(): Point {
      return new Point(1 ,2)
    }
  
  }

}
