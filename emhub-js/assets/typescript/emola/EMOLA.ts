/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="shape.ts" />
/// <reference path="lang.ts" />

module emola {
  var emola:any
  emola = {}

  class List {
    static NODE_RADIUS = 20
    static LEAF_RADIUS = 15

    radius: number
    theta: number
    nodeColor: Color
    leafColor: Color
    listColor: Color
    parent: List
    point: Point
    list: any

    constructor(list, parent=null, point=null) {
      this.list = list;
    
      // グラフィック要素
      this.radius = 50;
      this.theta = 0;
      this.nodeColor = new Color(255, 255, 51);
      this.leafColor = new Color(102, 102, 102);
      this.listColor = new Color(50, 50, 50,0.2);
    
      this.parent = parent;
      this.point = point;
    }
    
    push(element) {
      return this.list.push(element);
    }
    
    remove(listObject) {
      for (var index in this.list) {
        if (this.list[index] == listObject) {
          this.list.splice(index,1);
        }
        if (this.list[index] instanceof List) {
          this.list[index].remove(listObject);
        }
      }
    }
    
    rotate(theta) {
      this.theta += theta ;
      for (var i=0;i<this.list.length;i++) {
        if (this.list[i] instanceof List) {
          this.list[i].rotate(theta);
        } 
      }
    }
    
    pop() {
      return this.list.pop();
    }
    
    draw(context) {
      var nodeCircle = new Circle(this.point , List.NODE_RADIUS, this.nodeColor);
    
      for (var i=0;i<this.list.length;i++) {
        this.theta += 2 * Math.PI/this.list.length;
        var point = new Point(this.point.x + this.radius*Math.cos(this.theta), this.point.y +  this.radius*Math.sin(this.theta));
        if (this.list[i] instanceof List) {
          point = new Point(this.point.x + this.radius*3*Math.cos(this.theta), this.point.y +  this.radius*3*Math.sin(this.theta));
          this.list[i].point = point;
          this.list[i].draw(context);
        } else {
          var circle = new Circle(point, List.LEAF_RADIUS, this.leafColor);
          circle.draw(context);
    
          var text;
          if (this.list[i].value) {
            text = this.list[i].value;
          } else {
            text = this.list[i].type;
          }
          text = new Text(text, point, new Color(200,200,200));
          text.draw(context);
        }
    
      }
      (new Circle(this.point , this.radius, this.listColor)).draw(context);
      nodeCircle.draw(context);
    }
    
    isMet(point) {
      if (
        this.point.x - List.NODE_RADIUS <=  point.x && point.x <=this.point.x + List.NODE_RADIUS && 
        this.point.y - List.NODE_RADIUS <=  point.y && point.y <=this.point.y + List.NODE_RADIUS
      ) {
        return true;
      }
      return false;
    }
    
    getListObject(point) {
      if (this.isMet(point)) {
        return this;
      }
      for (var index in this.list) {
        var leafListObject = this.list[index];
        if (leafListObject instanceof List && leafListObject.getListObject(point)) {
          return leafListObject;
        }
      }
      return null;
    }
    
    add(listObject) {
      this.list.push(listObject);
    }
  }

  class CircleList extends List {
    evalSyntax(env) {
      var point = this.list[1]
      var radius = this.list[2]
      var color = this.list[3]
      return new Circle(point.evalSyntax(env), radius.evalSyntax(env), color.evalSyntax(env))
    }
  }

  class ClearList extends List {
    evalSyntax(env) {
      Global.graphicContext.clear()
      Global.drawingManager.clear()
      return null
    }
  }

  class ColorList extends List {
    evalSyntax(env) {
      this.assert()
      return new Color(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env), this.list[3].evalSyntax(env))
    }
    
    assert() {
      if (this.list[1] === undefined || this.list[2] === undefined || this.list[3] === undefined || this.list.length > 4) {
        throw 'color arguments are illegal.'
      }
    }
  }

  class DefList extends List {
    constructor(list, parent, point) {
      super(list, parent, point)
      this.listColor = new Color(0, 255, 0, 0.2)
    }
    
    evalSyntax(env) {
      this.assert()
      var keyName = this.list[1].value
      var value = this.list[2].evalSyntax(env)
      env.update(keyName, value)
      return null
    }
    
    assert() {
      if (this.list.length !== 3) {
        throw new Error("InvalidArgumentException")
      }
      if (this.list[1].type !== Atom.VAR) {
        throw new Error("InvalidAtomTypeException")
      }
    }
  }

  class DefnList extends List {
    // (defn hoge (x y) (+ x y))
    evalSyntax(env) {
      this.assert()
      var symbol = this.list[1]
      var args = this.list[2].list
      var expList = this.list[3]
      env.update(symbol.value, new Fn(args, expList, new DictEnv(env)))
      return null
    }
    
    assert() {
      if (this.list.length !== 4) {
        throw new Error("InvalidArgumentException")
      }
    }
  }
  
  class DivList extends List {
    evalSyntax(env) {
      var sum = 1
      for (var i=1;i < this.list.length;i++) {
        if (i === 1) {
          sum = this.list[i].evalSyntax(env)
        } else {
          sum /= this.list[i].evalSyntax(env)
        }
      }
      return sum
    }
  }

  class DoList extends List {
    evalSyntax(env) {
      var expList = this.list.slice(1);
      var result = expList.map(function (elem) { return elem.evalSyntax(env);});
      return result[result.length-1]; // 配列の最後の要素を取り出す
    }
  }
  
  class DrawList extends List {
    evalSyntax(env) {
      var figure = this.list[1].evalSyntax(env);
      Global.drawingManager.add(figure);
      return figure;
    }
  }

  class EqualList extends List {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) === this.list[2].evalSyntax(env);
    }
  }

  class EvalList extends List {
    evalSyntax(env) {
      if (this.list[1].type === Atom.VAR) {
        var value = this.list[1].value;
        var quote = env.find(value).get(value);
        return quote.evalSyntax(env);
      }
      return this.list[1].evalSyntax(env).evalSyntax(env);
    }
  }

  class FnList extends List {
    evalSyntax(env) {
      var args = this.list[1].list; // directで見てる
      var expList = this.list[2];
      return new Fn(args, expList, env);
    }
  }

  class GreaterList extends List {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) > this.list[2].evalSyntax(env);
    }
  }

  class GreaterEqualList extends List {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) >= this.list[2].evalSyntax(env);
    }
  }

  class IfList extends List {
    evalSyntax(env) {
      this.assert();
      var testExp = this.list[1];
      var thenExp = this.list[2];
      var elseExp = this.list[3];
      if (testExp.evalSyntax(env)) {
        return thenExp.evalSyntax(env);
      } else {
        return elseExp.evalSyntax(env);
      }
    }

    assert() {
      if (this.list.length !== 4) {
        throw new Error("InvalidArgumentException");
      }
    }
  }
  
  class LessList extends List {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) < this.list[2].evalSyntax(env);
    }
  }
  
  class LessEqualList extends List {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) <= this.list[2].evalSyntax(env);
    }
  }
  
  class LetList extends List {
    // (let (x 1) (+ x 1 1))
    evalSyntax(env) {
      var lets = this.list[1].list;
      var expList = this.list[2];
      var newEnv = new DictEnv(env);
      for (var i=0;i<lets.length;i=i+2) {
        newEnv.update(lets[i].value, lets[i+1].evalSyntax(newEnv));
      }
      return expList.evalSyntax(newEnv);
    }
  }

  class MinusList extends List {
    constructor(list, parent, point) {
      super(list, parent, point)
      this.listColor = new Color(50, 0, 0, 0.2);
    }

    evalSyntax(env) {
      var sum = 0;
      for (var i=1;i < this.list.length;i++) {
        if (i === 1) {
          sum = this.list[i].evalSyntax(env);
        } else {
          sum -= this.list[i].evalSyntax(env);
        }
      }
      return sum;
    }
  }

  class MulList extends List {
    constructor(list, parent, point) {
      super(list, parent, point)
      this.listColor = new Color(0, 200, 50, 0.2);
    }
  
    evalSyntax(env) {
      var sum = 1;
      for (var i=1; i<this.list.length; i++) {
        sum *= this.list[i].evalSyntax(env);
      }
      return sum;
    }
  }

  class NestList extends List {
    evalSyntax(env) {
      var func = this.list[0].evalSyntax(env);
      var args = this.list[0].slice(1);
      return func.exec(args, env);
    }
  }
  
  class PlusList extends List {
    constructor(list, parent, point) {
      super(list, parent, point)
      this.listColor = new Color(255, 0, 0, 0.2);
    }
  
    evalSyntax(env) {
      var sum = 0;
      for (var i=1; i<this.list.length;i++) {
        sum += this.list[i].evalSyntax(env);
      }
      return sum;
    }
  }
  
  class PointList extends List {
    evalSyntax(env) {
      this.assert()
      return new Point(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env));
    }
    assert() {
      if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
        throw 'point arguments are illegal.';
      }
    }
  }

  class QuoteList extends List {
    constructor(list, parent, point) {
      super(list, parent, point)
      this.listColor = new Color(0, 100, 0, 0.2);
    }
    evalSyntax(env) {
      this.assert();
      var list = this.list[1];
      return new Quote(list);
    }
    
    assert() {
      if (this.list[0].type !== Atom.QUOTE) {
        throw new Error("InvalidAtomTypeException");
      }
    }
  }
  
  class SendList extends List {
    evalSyntax(env) {
      this.assert();
      var object = this.list[1].evalSyntax(env);
      var methodName = this.list[2].value;
      var args = this.list.slice(3).map(function (x) { return x.evalSyntax(env);});
      object[methodName].apply(object, args);
      return object;
    }
    
    assert() {
    }
  }


  class VarList extends List {
    evalSyntax(env) {
      this.assert();
      var func;
      if (this.list[0] instanceof VarList) {
        func = this.list[0].evalSyntax(env);
      } else {
        func = env.find(this.list[0].value).get(this.list[0].value);
      }
      var realArgsList = this.list.slice(1);
    
      for (var i=0;i<realArgsList.length;i++) {
        func.env.dict[func.args[i].value] = realArgsList[i].evalSyntax(env); //valueをdirectに指定しているけど良くない
      }
      return func.evalSyntax(env);
    }
    
    assert() {
    }
  }

  class TokenReader {
    tokenizedList: any

    constructor(line=null) {
      this.tokenizedList = [];
      if (line) this.add(line);
    }
    
    add(line) {
      this.tokenizedList = this.tokenizedList.concat(Core.tokenize(line))
    }
    
    next() {
      if (this.tokenizedList.length === 0) {
        return null
      }
      return this.tokenizedList.shift()
    }
  }

  class DrawingManager {
    _list: any
    _socket: any

    constructor(socket) {
      this._list = []
      this._socket = socket
    }
    
    add = function (drawing) {
      this._list.push(drawing)
      this._socket.send("hoge")
    };
    
    remove(drawing) {
      for (var i in this._list) {
        if (this._list[i] == drawing) {
          this._list.splice(i,1)
        }
        if (this._list[i] instanceof List) {
          this._list[i].remove(drawing)
        }
      }
    }
    
    clear() {
      this._list = []
    }
    
    draw(context) {
      for (var i=0;i<this._list.length;i++) {
        if (this._list[i].rotate) {
          this._list[i].rotate(0.01)
        }
        this._list[i].draw(context)
      }
    }
    
    getDrawing(point, drawing) {
      for (var index in this._list) {
        var emlistObject = this._list[index]
        if (emlistObject.isMet(point) && emlistObject !== drawing ) {
          return emlistObject
        }
      }
    }
    
    getListObject(point, drawing) {
      for (var index in this._list) {
        var listObject = this._list[index]
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
      var socket = new WebSocket("ws://localhost:5000")
      socket.onopen = function (event) {
        console.log("web socket connection is established.")
      }
      socket.onmessage = function (event) {
        console.log(event.data)
      }
      this.socket = socket
    }
    
    send(message) {
      this.socket.send(message)
    }
  }

  class Global {
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

  class Core {
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

      $('body').append(this.commandContainer);
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
        var result = '';
        try {
          Global.tokenReader.add(line);
          var parsedList = Core.parse(Global.tokenReader);
          if (parsedList.draw) {
            Global.drawingManager.add(parsedList);
          }
          result = parsedList.evalSyntax(Global.env);
        } catch (e) {
          result = "Parse error";
          console.log(e);
        } 
        return [{ msg:"=> " + result, className:"jquery-console-message-value"} ];
      })
  });

  class EventManager {
    constructor() {
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

  var eventManager = new EventManager()
  
  emola.Front.drawLoop = function () {
    setTimeout(emola.Front.drawLoop, 15)
    Global.graphicContext.clear()
    Global.drawingManager.draw(Global.graphicContext)
  };
  
  function getDrawingObject(drawing, e) {
    var point = getPosition(e)
    return Global.drawingManager.getListObject(point, drawing)
  }
  
  function getPosition(e) {
    var pageX = e.pageX;
    var pageY = e.pageY;
    var rect = e.target.getBoundingClientRect();

    var x = pageX - rect.left;
    var y = pageY - rect.top;
    return new Point(x, y)
  }
  
  
}
