/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="shape.ts" />
/// <reference path="lang.ts" />
/// <reference path="syntax-list.ts" />

module EMOLA {
  var EMOLA:any
  EMOLA = {}

  EMOLA.List = function (list, parent, point) {
    this.list = list;
  
    // グラフィック要素
    this.radius = 50;
    this.theta = 0;
    this.nodeColor = new Color(255, 255, 51);
    this.leafColor = new Color(102, 102, 102);
    this.listColor = new Color(50, 50, 50,0.2);
  
    this.parent = parent||null;
    this.point = point||null;
  };
  
  EMOLA.List.NODE_RADIUS = 20;
  EMOLA.List.LEAF_RADIUS = 15;
  
  EMOLA.List.prototype.push = function (element) {
    return this.list.push(element);
  };
  
  EMOLA.List.prototype.remove = function (listObject) {
    for (var index in this.list) {
      if (this.list[index] == listObject) {
        this.list.splice(index,1);
      }
      if (this.list[index] instanceof EMOLA.List) {
        this.list[index].remove(listObject);
      }
    }
  };
  
  EMOLA.List.prototype.rotate = function (theta) {
    this.theta += theta ;
    for (var i=0;i<this.list.length;i++) {
      if (this.list[i] instanceof EMOLA.List) {
        this.list[i].rotate(theta);
      } 
    }
  };
  
  EMOLA.List.prototype.pop = function () {
    return this.list.pop();
  };
  
  EMOLA.List.prototype.draw = function (context) {
    var nodeCircle = new Circle(this.point , EMOLA.List.NODE_RADIUS, this.nodeColor);
  
    for (var i=0;i<this.list.length;i++) {
      this.theta += 2 * Math.PI/this.list.length;
      var point = new Point(this.point.x + this.radius*Math.cos(this.theta), this.point.y +  this.radius*Math.sin(this.theta));
      if (this.list[i] instanceof EMOLA.List) {
        point = new Point(this.point.x + this.radius*3*Math.cos(this.theta), this.point.y +  this.radius*3*Math.sin(this.theta));
        this.list[i].point = point;
        this.list[i].draw(context);
      } else {
        var circle = new Circle(point, EMOLA.List.LEAF_RADIUS, this.leafColor);
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
  };
  
  EMOLA.List.prototype.isMet = function (point) {
    if (
      this.point.x - EMOLA.List.NODE_RADIUS <=  point.x && point.x <=this.point.x + EMOLA.List.NODE_RADIUS && 
      this.point.y - EMOLA.List.NODE_RADIUS <=  point.y && point.y <=this.point.y + EMOLA.List.NODE_RADIUS
    ) {
      return true;
    }
    return false;
  };
  
  EMOLA.List.prototype.getListObject = function (point) {
    console.log(this);
    console.log(point);
    if (this.isMet(point)) {
      return this;
    }
    for (var index in this.list) {
      var leafListObject = this.list[index];
      if (leafListObject instanceof EMOLA.List && leafListObject.getListObject(point)) {
        return leafListObject;
      }
    }
    return null;
  };
  
  EMOLA.List.prototype.add = function (listObject) {
    this.list.push(listObject);
  };
  EMOLA.List.Circle = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Circle.prototype = new EMOLA.List();
  
  EMOLA.List.Circle.prototype.evalSyntax = function (env) {
    this.assert();
    var point = this.list[1];
    var radius = this.list[2];
    var color = this.list[3];
    return new Circle(point.evalSyntax(env), radius.evalSyntax(env), color.evalSyntax(env));
  };
  
  EMOLA.List.Circle.prototype.assert = function () {
  };
  
  EMOLA.List.Clear = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Clear.prototype = new EMOLA.List();
  
  EMOLA.List.Clear.prototype.evalSyntax = function (env) {
    this.assert();
    EMOLA.Global.graphicContext.clear();
    EMOLA.Global.drawingManager.clear();
    return null;
  };
  
  EMOLA.List.Clear.prototype.assert = function () {
  };
  
  EMOLA.List.Color = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Color.prototype = new EMOLA.List();
  
  EMOLA.List.Color.prototype.evalSyntax = function (env) {
    this.assert();
    return new Color(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env), this.list[3].evalSyntax(env));
  };
  
  EMOLA.List.Color.prototype.assert = function () {
    if (this.list[1] === undefined || this.list[2] === undefined || this.list[3] === undefined || this.list.length > 4) {
      throw 'color arguments are illegal.';
    }
  };
  
  EMOLA.List.Def = function () {
    EMOLA.List.apply(this, arguments);
    this.listColor = new Color(0, 255, 0, 0.2);
  };
  
  EMOLA.List.Def.prototype = new EMOLA.List();
  
  EMOLA.List.Def.prototype.evalSyntax = function (env) {
    this.assert();
    var keyName = this.list[1].value;
    var value = this.list[2].evalSyntax(env);
    env.update(keyName, value);
    return null;
  };
  
  EMOLA.List.Def.prototype.assert = function () {
    if (this.list.length !== 3) {
      throw new Error("InvalidArgumentException");
    }
    if (this.list[1].type !== Atom.VAR) {
      throw new Error("InvalidAtomTypeException");
    }
  };
  
  EMOLA.List.Defn = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Defn.prototype = new EMOLA.List();
  
  // (defn hoge (x y) (+ x y))
  EMOLA.List.Defn.prototype.evalSyntax = function (env) {
    this.assert();
    var symbol = this.list[1];
    var args = this.list[2].list;
    var expList = this.list[3];
    env.update(symbol.value, new Fn(args, expList, new DictEnv(env)));
    return null;
  };
  
  EMOLA.List.Defn.prototype.assert = function () {
    if (this.list.length !== 4) {
      throw new Error("InvalidArgumentException");
    }
  };
  EMOLA.List.Div = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Div.prototype = new EMOLA.List();
  
  EMOLA.List.Div.prototype.evalSyntax = function (env) {
    this.assert();
    var sum = 1;
    for (var i=1;i < this.list.length;i++) {
      if (i === 1) {
        sum = this.list[i].evalSyntax(env);
      } else {
        sum /= this.list[i].evalSyntax(env);
      }
    }
    return sum;
  };
  
  EMOLA.List.Div.prototype.assert = function () {
  };
  EMOLA.List.Do = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Do.prototype = new EMOLA.List();
  
  EMOLA.List.Do.prototype.evalSyntax = function (env) {
    this.assert();
    var expList = this.list.slice(1);
    var result = expList.map(function (elem) { return elem.evalSyntax(env);});
    return result[result.length-1]; // 配列の最後の要素を取り出す
  };
  
  EMOLA.List.Do.prototype.assert = function () {
  };
  
  EMOLA.List.Draw = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Draw.prototype = new EMOLA.List();
  
  EMOLA.List.Draw.prototype.evalSyntax = function (env) {
    this.assert();
    var figure = this.list[1].evalSyntax(env);
    EMOLA.Global.drawingManager.add(figure);
    return figure;
  };
  
  EMOLA.List.Draw.prototype.assert = function () {
  };
  
  EMOLA.List.Equal = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Equal.prototype = new EMOLA.List();
  
  EMOLA.List.Equal.prototype.evalSyntax = function (env) {
    this.assert();
    return this.list[1].evalSyntax(env) === this.list[2].evalSyntax(env);
  };
  
  EMOLA.List.Equal.prototype.assert = function () {
  };
  
  EMOLA.List.Eval = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Eval.prototype = new EMOLA.List();
  
  EMOLA.List.Eval.prototype.evalSyntax = function (env) {
    this.assert();
    if (this.list[1].type === Atom.VAR) {
      var value = this.list[1].value;
      var quote = env.find(value).get(value);
      return quote.evalSyntax(env);
    
    }
    return this.list[1].evalSyntax(env).evalSyntax(env);
  };
  
  EMOLA.List.Eval.prototype.assert = function () {
  };
  
  EMOLA.List.Fn = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Fn.prototype = new EMOLA.List();
  
  EMOLA.List.Fn.prototype.evalSyntax = function (env) {
    var args = this.list[1].list; // directで見てる
    var expList = this.list[2];
    return new Fn(args, expList, env);
  };
  
  EMOLA.List.Fn.prototype.assert = function () {
  };
  EMOLA.List.Greater = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Greater.prototype = new EMOLA.List();
  
  EMOLA.List.Greater.prototype.evalSyntax = function (env) {
    this.assert();
    return this.list[1].evalSyntax(env) > this.list[2].evalSyntax(env);
  };
  
  EMOLA.List.Greater.prototype.assert = function () {
  };
  EMOLA.List.Greaterequal = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Greaterequal.prototype = new EMOLA.List();
  
  EMOLA.List.Greaterequal.prototype.evalSyntax = function (env) {
    this.assert();
    return this.list[1].evalSyntax(env) >= this.list[2].evalSyntax(env);
  };
  
  EMOLA.List.Greaterequal.prototype.assert = function () {
  };
  
  EMOLA.List.If = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.If.prototype = new EMOLA.List();
  
  EMOLA.List.If.prototype.evalSyntax = function (env) {
    this.assert();
    var testExp = this.list[1];
    var thenExp = this.list[2];
    var elseExp = this.list[3];
    if (testExp.evalSyntax(env)) {
      return thenExp.evalSyntax(env);
    } else {
      return elseExp.evalSyntax(env);
    }
  };
  
  EMOLA.List.If.prototype.assert = function () {
    if (this.list.length !== 4) {
      throw new Error("InvalidArgumentException");
    }
  };
  
  EMOLA.List.Less = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Less.prototype = new EMOLA.List();
  
  EMOLA.List.Less.prototype.evalSyntax = function (env) {
    this.assert();
    return this.list[1].evalSyntax(env) < this.list[2].evalSyntax(env);
  };
  
  EMOLA.List.Less.prototype.assert = function () {
  };
  
  EMOLA.List.Lessequal = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Lessequal.prototype = new EMOLA.List();
  
  EMOLA.List.Lessequal.prototype.evalSyntax = function (env) {
    this.assert();
    return this.list[1].evalSyntax(env) <= this.list[2].evalSyntax(env);
  };
  
  EMOLA.List.Lessequal.prototype.assert = function () {
  };
  
  EMOLA.List.Let = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Let.prototype = new EMOLA.List();
  
  // (let (x 1) (+ x 1 1))
  EMOLA.List.Let.prototype.evalSyntax = function (env) {
    this.assert();
    var lets = this.list[1].list;
    var expList = this.list[2];
    var newEnv = new DictEnv(env);
    for (var i=0;i<lets.length;i=i+2) {
      newEnv.update(lets[i].value, lets[i+1].evalSyntax(newEnv));
    }
    return expList.evalSyntax(newEnv);
  };
  
  EMOLA.List.Let.prototype.assert = function () {
  };
  
  EMOLA.List.Minus = function () {
    EMOLA.List.apply(this, arguments);
    this.listColor = new Color(50, 0, 0, 0.2);
  };
  
  EMOLA.List.Minus.prototype = new EMOLA.List();
  
  EMOLA.List.Minus.prototype.evalSyntax = function (env) {
    this.assert();
    var sum = 0;
    for (var i=1;i < this.list.length;i++) {
      if (i === 1) {
        sum = this.list[i].evalSyntax(env);
      } else {
        sum -= this.list[i].evalSyntax(env);
      }
    }
    return sum;
  };
  
  EMOLA.List.Minus.prototype.assert = function () {
  };
  EMOLA.List.Mul = function () {
    EMOLA.List.apply(this, arguments);
    this.listColor = new Color(0, 200, 50, 0.2);
  };
  
  EMOLA.List.Mul.prototype = new EMOLA.List();
  
  EMOLA.List.Mul.prototype.evalSyntax = function (env) {
    this.assert();
    var sum = 1;
    for (var i=1; i<this.list.length; i++) {
      sum *= this.list[i].evalSyntax(env);
    }
    return sum;
  };
  
  EMOLA.List.Mul.prototype.assert = function () {
  };
  
  EMOLA.List.NestList = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.NestList.prototype = new EMOLA.List();
  
  EMOLA.List.NestList.prototype.evalSyntax = function (env) {
    this.assert();
    var func = this.list[0].evalSyntax(env);
    var args = this.list[0].slice(1);
    return func.exec(args, env);
  };
  
  EMOLA.List.NestList.prototype.assert = function () {
  };
  
  EMOLA.List.Plus = function () {
    EMOLA.List.apply(this, arguments);
    this.listColor = new Color(255, 0, 0, 0.2);
  };
  
  EMOLA.List.Plus.prototype = new EMOLA.List();
  
  EMOLA.List.Plus.prototype.evalSyntax = function (env) {
    this.assert();
    var sum = 0;
    for (var i=1; i<this.list.length;i++) {
      sum += this.list[i].evalSyntax(env);
    }
    return sum;
  };
  
  EMOLA.List.Plus.prototype.assert = function () {
  };
  EMOLA.List.Point = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Point.prototype = new EMOLA.List();
  
  EMOLA.List.Point.prototype.evalSyntax = function (env) {
    this.assert();
    return new Point(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env));
  };
  
  EMOLA.List.Point.prototype.assert = function () {
    if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
      throw 'point arguments are illegal.';
    }
  };
  
  EMOLA.List.Quote = function () {
    EMOLA.List.apply(this, arguments);
    this.listColor = new Color(0, 100, 0, 0.2);
  };
  
  EMOLA.List.Quote.prototype = new EMOLA.List();
  
  EMOLA.List.Quote.prototype.evalSyntax = function (env) {
    this.assert();
    var list = this.list[1];
    return new EMOLA.Quote(list);
  };
  
  EMOLA.List.Quote.prototype.assert = function () {
    if (this.list[0].type !== Atom.QUOTE) {
      throw new Error("InvalidAtomTypeException");
    }
  };
  
  EMOLA.List.Send = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Send.prototype = new EMOLA.List();
  
  EMOLA.List.Send.prototype.evalSyntax = function (env) {
    this.assert();
    var object = this.list[1].evalSyntax(env);
    var methodName = this.list[2].value;
    var args = this.list.slice(3).map(function (x) { return x.evalSyntax(env);});
    object[methodName].apply(object, args);
    return object;
  };
  
  EMOLA.List.Send.prototype.assert = function () {
  };
  
  EMOLA.List.Var = function () {
    EMOLA.List.apply(this, arguments);
  };
  
  EMOLA.List.Var.prototype = new EMOLA.List();
  
  EMOLA.List.Var.prototype.evalSyntax = function (env) {
    this.assert();
    var func;
    if (this.list[0] instanceof EMOLA.List.Var) {
      func = this.list[0].evalSyntax(env);
    } else {
      func = env.find(this.list[0].value).get(this.list[0].value);
    }
    var realArgsList = this.list.slice(1);
  
    for (var i=0;i<realArgsList.length;i++) {
      func.env.dict[func.args[i].value] = realArgsList[i].evalSyntax(env); //valueをdirectに指定しているけど良くない
    }
    return func.evalSyntax(env);
  };
  
  EMOLA.List.Var.prototype.assert = function () {
  };

  class TokenReader {
    tokenizedList: any

    constructor(line=null) {
      this.tokenizedList = [];
      if (line) this.add(line);
    }
    
    add(line) {
      this.tokenizedList = this.tokenizedList.concat(EMOLA.tokenize(line))
    }
    
    next() {
      if (this.tokenizedList.length === 0) {
        return null
      }
      return this.tokenizedList.shift()
    }
  }
  
  EMOLA.DrawingManager = function (socket) {
    this._list = [];
    this._socket = socket;
  };
  
  EMOLA.DrawingManager.prototype.add = function (drawing) {
    this._list.push(drawing);
    this._socket.send("hoge");
  };
  
  EMOLA.DrawingManager.prototype.remove = function (drawing) {
    for (var i in this._list) {
      if (this._list[i] == drawing) {
        this._list.splice(i,1);
      }
      if (this._list[i] instanceof EMOLA.List) {
        this._list[i].remove(drawing);
      }
    }
  };
  
  EMOLA.DrawingManager.prototype.clear = function () {
    this._list = [];
  };
  
  EMOLA.DrawingManager.prototype.draw = function (context) {
    for (var i=0;i<this._list.length;i++) {
      if (this._list[i].rotate) {
        this._list[i].rotate(0.01);
      }
      this._list[i].draw(context);
    }
  };
  
  /**
   * @param {Point} point - .
   * @param {EMOLA.List} drawing - .
   */
  EMOLA.DrawingManager.prototype.getDrawing = function (point, drawing) {
    for (var index in this._list) {
      var emlistObject = this._list[index];
      if (emlistObject.isMet(point) && emlistObject !== drawing ) {
        return emlistObject;
      }
    }
  };
  
  EMOLA.DrawingManager.prototype.getListObject = function (point, drawing) {
    for (var index in this._list) {
      var listObject = this._list[index];
      var targetListObject = listObject.getListObject(point);
      if (targetListObject && targetListObject !== drawing ) {
        return targetListObject;
      }
    }
  };
  
  EMOLA.Socket = function () {
    var socket = new WebSocket("ws://localhost:5000");
    socket.onopen = function (event) {
      console.log("web socket connection is established.");
    };
    socket.onmessage = function (event) {
      console.log(event.data);
    };
    this.socket = socket;
  };
  
  EMOLA.Socket.prototype.send = function (message) {
    this.socket.send(message);
  };
  
  EMOLA.Global = {};
  EMOLA.Global.env = new DictEnv(null);
  EMOLA.Global.tokenReader = new TokenReader();
  EMOLA.Global.graphicContext = null;
  EMOLA.Global.socket = new EMOLA.Socket();
  EMOLA.Global.drawingManager = new EMOLA.DrawingManager(EMOLA.Global.socket);
  EMOLA.Global.lastClickedPoint = null;
  EMOLA.Global.drugging = false;
  // TODO: 空白の含む文字列、括弧の含まれる文字列にも対応出来るようにしておく
  EMOLA.tokenize = function (inputStr) {
    return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
      function (str) { return str ? true : false;
    }).map(
      function (ele) {
        var parsedFloat = parseFloat(ele);
        return isNaN(parsedFloat) ? ele : parsedFloat;
      }
    );
  };
  
  EMOLA.atomize = function (token) {
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
  };
  
  EMOLA.parse = function (tokenReader, parentList) {
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
        syntaxList.push(EMOLA.parse(tokenReader, parentList));
      } else if (token === ')') {
        return EMOLA.createList(syntaxList, parentList, point);
      } else if (token === null) {
        break;
      } else {
        syntaxList.push(EMOLA.atomize(token));
      }
    }
    return syntaxList[0];
  };
  
  EMOLA.createList = function (syntaxList, parentList, point) {
    var firstList = syntaxList[0];
    var syntaxMap = {};
    /* lang */
    syntaxMap[Atom.FN] = EMOLA.List.Fn;
    syntaxMap[Atom.IF] = EMOLA.List.If;
    syntaxMap[Atom.DEF] = EMOLA.List.Def;
    syntaxMap[Atom.DEFN] = EMOLA.List.Defn;
    syntaxMap[Atom.DO] = EMOLA.List.Do;
    syntaxMap[Atom.SEND] = EMOLA.List.Send;
    syntaxMap[Atom.LET] = EMOLA.List.Let;
    syntaxMap[Atom.QUOTE] = EMOLA.List.Quote;
    syntaxMap[Atom.EVAL] = EMOLA.List.Eval;
  
    /* math */
    syntaxMap[Atom.PLUS] = EMOLA.List.Plus;
    syntaxMap[Atom.MINUS] = EMOLA.List.Minus;
    syntaxMap[Atom.DIV] = EMOLA.List.Div;
    syntaxMap[Atom.MUL] = EMOLA.List.Mul;
    syntaxMap[Atom.EQUAL] = EMOLA.List.Equal;
    syntaxMap[Atom.GREATER] = EMOLA.List.Greater;
    syntaxMap[Atom.LESS] = EMOLA.List.Less;
    syntaxMap[Atom.GREATEREQUAL] = EMOLA.List.Greaterequal;
    syntaxMap[Atom.LESSEQUAL] = EMOLA.List.Lessequal;
  
    /* graphic */
    syntaxMap[Atom.DRAW] = EMOLA.List.Draw;
    syntaxMap[Atom.POINT] = EMOLA.List.Point;
    syntaxMap[Atom.COLOR] = EMOLA.List.Color;
    syntaxMap[Atom.CIRCLE] = EMOLA.List.Circle;
    syntaxMap[Atom.CLEAR] = EMOLA.List.Clear;
  
    var TargetFunction = syntaxMap[firstList.type];
    if (!TargetFunction) {
      TargetFunction = EMOLA.List.Var;
    }
    return new TargetFunction(syntaxList, parentList, point);
  };
  
  EMOLA.parseAndEval = function (tokenReader, env) {
    if (!env) env = new DictEnv(null);
    var parsedList = EMOLA.parse(tokenReader);
    return parsedList.evalSyntax(env);
  };
  
  EMOLA.readAndEval = function (line, env) {
    EMOLA.Global.tokenReader.add(line);
    return EMOLA.parseAndEval(EMOLA.Global.tokenReader, env);
  };
  EMOLA.External = {};
  EMOLA.External.createTestList = function () {
    var childList = new EMOLA.List([new Atom(Atom.PLUS, null), new Atom(Atom.NUMBER, 2) ,new Atom(Atom.NUMBER, 3)]);
    var testList = new EMOLA.List(
      [new Atom(Atom.MINUS, null), new Atom(Atom.NUMBER, 2), new Point(400, 200), childList],null,
      new Point(400, 200)
    );
    childList.parent = testList;
    return testList;
  };
  
  EMOLA.Front = {};
  
  $(document).ready(function() {
    if (EMOLA.Global.graphicContext === null) {
      EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
      if(EMOLA.Global.graphicContext !== null) {
        EMOLA.Front.drawLoop();
      }
    }
  
    var commandContainer = $('<div class="console">');
    $('body').append(commandContainer);
    commandContainer.console({
      promptLabel: 'Emola> ',
      commandValidate: function(line) {
        return line !== "";
      },
      commandHandle:function(line) {
        var result = '';
        try {
          EMOLA.Global.tokenReader.add(line);
          var parsedList = EMOLA.parse(EMOLA.Global.tokenReader);
          if (parsedList.draw) {
            EMOLA.Global.drawingManager.add(parsedList);
          }
          result = parsedList.evalSyntax(EMOLA.Global.env);
        } catch (e) {
          result = "Parse error";
          console.log(e);
        } 
        return [{ msg:"=> " + result, className:"jquery-console-message-value"} ];
      },
      autofocus: true,
      animateScroll: true,
      promptHistory: true,
      charInsertTrigger:function(keycode,line) {
        return true;
      }
    });
  });
  
  
  EMOLA.Front.drawLoop = function () {
    setTimeout(EMOLA.Front.drawLoop, 15);
    EMOLA.Global.graphicContext.clear();
    EMOLA.Global.drawingManager.draw(EMOLA.Global.graphicContext);
  };
  
  function getDrawing(drawing=null) {
    var point = getPosition();
    return EMOLA.Global.drawingManager.getListObject(point, drawing);
  }
  
  function getPosition() {
    var clientX = event.clientX;
    var clientY = event.clientY;
    var offsetLeft = EMOLA.Global.graphicContext.offsetLeft;
    var offsetTop = EMOLA.Global.graphicContext.offsetTop;
    return new Point(clientX-offsetLeft, clientY-offsetTop);
  }
  
  (function () {
    var drugging = null;
    var drawing = null;
    window.onmousedown = function (event) {
      EMOLA.Global.drugging = true;
      var drawing = getDrawing();
      if (drawing) {
        drugging = drawing;
      }
    };
    
    window.onmouseup = function (event) {
      EMOLA.Global.drugging = false;
      if (drugging) {
        var drawing = getDrawing(drugging);
        if (drawing && drugging != drawing) {
          drawing.add(drugging);
          // EMOLA.Global.drawingManager.remove(drugging);
        }
        drugging = null;
      }
    };
    
    window.onmousemove = function (event) {
      if (drugging) {
        drugging.point = getPosition();
      }
    };
    window.onkeydown = function (event) {
    };
    
    window.onclick = function (event) {
    };
  })();
  
  EMOLA.createContextWrapper = function (canvasId) {
    var canvas:any = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) {
      return null;
    }
    return new ContextWrapper(canvas.getContext('2d'));
  };
}
