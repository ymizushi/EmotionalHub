///<reference path="emola.ts"/>
///<reference path="lang.ts"/>
///<reference path="shape.ts"/>

module emola {
  export class ExpList {
    parent: ExpList;
    list: any;

    static create(syntaxList, parentList) {
      var firstList = syntaxList[0];
      var syntaxMap = {};
      /* lang */
      syntaxMap[AtomType.FN] = GraphFnList;
      syntaxMap[AtomType.IF] = GraphIfList;
      syntaxMap[AtomType.DEF] = GraphDefList;
      syntaxMap[AtomType.DEFN] = GraphDefnList;
      syntaxMap[AtomType.DO] = GraphDoList;
      syntaxMap[AtomType.SEND] = GraphSendList;
      syntaxMap[AtomType.LET] = GraphLetList;
      syntaxMap[AtomType.QUOTE] = GraphQuoteList;
      syntaxMap[AtomType.EVAL] = GraphEvalList;

      /* math */
      syntaxMap[AtomType.PLUS] = GraphPlusList;
      syntaxMap[AtomType.MINUS] = GraphMinusList;
      syntaxMap[AtomType.DIV] = GraphDivList;
      syntaxMap[AtomType.MUL] = GraphMulList;
      syntaxMap[AtomType.EQUAL] = GraphEqualList;
      syntaxMap[AtomType.GREATER] = GraphGreaterList;
      syntaxMap[AtomType.LESS] = GraphLessList;
      syntaxMap[AtomType.GREATEREQUAL] = GraphGreaterEqualList;
      syntaxMap[AtomType.LESSEQUAL] = GraphLessEqualList;

      /* graphic */
      syntaxMap[AtomType.DRAW] = GraphDrawList;
      syntaxMap[AtomType.POINT] = GraphPointList;
      syntaxMap[AtomType.COLOR] = GraphColorList;
      syntaxMap[AtomType.CIRCLE] = GraphCircleList;
      syntaxMap[AtomType.CLEAR] = GraphClearList;
      syntaxMap[AtomType.LINE] = GraphLineList;
      syntaxMap[AtomType.RECT] = GraphRectList;
      syntaxMap[AtomType.SIZE] = GraphSizeList;
      syntaxMap[AtomType.TEXT] = GraphTextList;
      syntaxMap[AtomType.WINDOW] = GraphWindowList;

      var TargetFunction = syntaxMap[firstList.type];
      if (!TargetFunction) {
        TargetFunction = GraphVarList;
      }
      return new TargetFunction(syntaxList, parentList);
    }

    constructor(list: ExpList, parent: ExpList=null) {
      this.list = list;
      this.parent = parent;
    }

    push(element) {
      return this.list.push(element);
    }

    remove(listObject) {
      for (var index in this.list) {
        if (this.list[index] == listObject) {
          this.list.splice(index,1);
        }
        if (this.list[index] instanceof ExpList) {
          this.list[index].remove(listObject);
        }
      }
    }

    pop() {
      return this.list.pop();
    }

    add(listObject) {
      this.list.push(listObject);
    }
  }

  export class GraphExpList implements Drawable {
    static NODE_RADIUS = 20;
    static LEAF_RADIUS = 15;

    radius: number;
    theta: number;
    nodeColor: Color;
    leafColor: Color;
    listColor: Color;
    parent: GraphExpList;
    point: Point;

    expList: any;
    id: string;

    constructor(expList:ExpList, parent:GraphExpList=null) {
      this.expList = expList;
    
      // グラフィック要素
      this.radius = 50;
      this.theta = 0;
      this.nodeColor = Color.BaseYellow;
      this.leafColor = new Color(102, 102, 102);
      this.listColor = new Color(50, 50, 50,0.2);
    
      this.parent = parent;

      if (parent) {
        this.point = null;
      } else {
        var x = Math.random() * 600;
        var y = Math.random() * 300;
        this.point = new Point(Math.floor(100+x), Math.floor(100+y));
      }

      this.id = new Date().toDateString() + '_' + Math.random();
    }

    hasId(id: string) {
      for (var i in this.expList) {
        if (this.expList[i] instanceof GraphExpList && this.expList[i].hasId(id)) {
          return true;
        }
      }
      if (this.id === id) {
        return true;
      }
      return false;
    }
    
    push(element) {
      return this.expList.push(element);
    }
    
    remove(listObject) {
      for (var index in this.expList) {
        if (this.expList[index] == listObject) {
          this.expList.splice(index,1);
        }
        if (this.expList[index] instanceof GraphExpList) {
          this.expList[index].remove(listObject);
        }
      }
    }
    
    rotate(theta) {
      this.theta += theta ;
      for (var i=0;i<this.expList.length;i++) {
        if (this.expList[i] instanceof GraphExpList) {
          this.expList[i].rotate(theta);
        } 
      }
    }
    
    pop() {
      return this.expList.pop();
    }
    
    draw(context: CanvasContext) {
      for (var i=1;i<this.expList.length;i++) {
        this.theta += 2 * Math.PI/(this.expList.length-1);
        var point = new Point(this.point.x + this.radius*Math.cos(this.theta), this.point.y +  this.radius*Math.sin(this.theta));
        if (this.expList[i] instanceof GraphExpList) {
          point = new Point(this.point.x + this.radius*3*Math.cos(this.theta), this.point.y +  this.radius*3*Math.sin(this.theta));
          this.expList[i].point = point;
          this.expList[i].draw(context);
        } else {
          var circle: Circle = new Circle(point, GraphExpList.LEAF_RADIUS, this.leafColor);
          circle.draw(context);
    
          this.drawText(this.expList[i], context, point, new Color(200,200,200))
        }
    
      }
      (new Circle(this.point , this.radius, this.listColor)).draw(context);
      var nodeCircle = new Circle(this.point , GraphExpList.NODE_RADIUS, this.nodeColor);
      nodeCircle.draw(context);
      this.drawText(this.expList[0], context, this.point, new Color(100,100,100))
    }

    anim() {
      var registeredNodeColor: Color = Color.copy(this.nodeColor);

      for (var i=0;i<this.expList.length;i++) {
        if (this.expList[i] instanceof GraphExpList) {
          this.expList[i].anim();
        }
        var firstTimerId = window.setInterval(() => {
          this.nodeColor = Color.Red;
          clearInterval(firstTimerId)
        }, 500);

        var secondTimerId = window.setInterval(() => {
          this.nodeColor = registeredNodeColor;
          clearInterval(secondTimerId)
        }, 1000);
        ;
      }

    }

    drawText(atom: Atom, context: CanvasContext, point: Point, color: Color) {
      var textString: string;
      if (atom.value) {
        textString = atom.value;
      } else {
        textString = atom.type;
      }
      var text: Text = new Text(textString, point, color);
      text.draw(context);
    }


    isMet(point) {
      return !!(this.point.x - GraphExpList.NODE_RADIUS <= point.x && point.x <= this.point.x + GraphExpList.NODE_RADIUS &&
      this.point.y - GraphExpList.NODE_RADIUS <= point.y && point.y <= this.point.y + GraphExpList.NODE_RADIUS);

    }
    
    getListObject(point) {
      if (this.isMet(point)) {
        return this;
      }
      for (var i in this.expList) {
        var leafListObject = this.expList[i];
        if (leafListObject instanceof GraphExpList && leafListObject.getListObject(point)) {
          return leafListObject;
        }
      }
      return null;
    }
    
    add(listObject) {
      this.expList.push(listObject);
    }
  }

  // lang
  export class GraphDefList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 153, 68, 0.3);
    }

    evalSyntax(env) {
      this.assert();
      var keyName = this.expList[1].value;
      var value = this.expList[2].evalSyntax(env);
      env.update(keyName, value);
      return null
    }
    
    assert() {
      if (this.expList.length !== 3) {
        throw new Error("InvalidArgumentException")
      }
      if (this.expList[1].type !== AtomType.VAR) {
        throw new Error("InvalidAtomTypeTypeException")
      }
    }
  }

  export class GraphDefnList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 158, 150, 0.3);
    }
    // (defn hoge (x y) (+ x y))
    evalSyntax(env) {
      this.assert();
      var symbol = this.expList[1];
      var args = this.expList[2].expList;
      var expList = this.expList[3];
      env.update(symbol.value, new Fn(args, expList, new Env(env)));
      return null
    }
    
    assert() {
      if (this.expList.length !== 4) {
        throw new Error("InvalidArgumentException")
      }
    }
  }

  export class GraphLetList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 134, 209, 0.3);
    }

    // (let (x 1) (+ x 1 1))
    evalSyntax(env) {
      var lets = this.expList[1].expList;
      var expList = this.expList[2];
      var newEnv = new Env(env);
      for (var i=0;i<lets.length;i=i+2) {
        newEnv.update(lets[i].value, lets[i+1].evalSyntax(newEnv));
      }
      return expList.evalSyntax(newEnv);
    }
  }

  export class GraphIfList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(146, 7, 131, 0.3);
    }

    evalSyntax(env) {
      this.assert();
      var testExp = this.expList[1];
      var thenExp = this.expList[2];
      var elseExp = this.expList[3];
      if (testExp.evalSyntax(env)) {
        return thenExp.evalSyntax(env);
      } else {
        return elseExp.evalSyntax(env);
      }
    }

    assert() {
      if (this.expList.length !== 4) {
        throw new Error("InvalidArgumentException");
      }
    }
  }

  export class GraphDoList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(228, 0, 127, 0.3);
    }

    evalSyntax(env) {
      var expList = this.expList.slice(1);
      var result = expList.map(function (elem) { return elem.evalSyntax(env);});
      return result[result.length-1]; // 配列の最後の要素を取り出す
    }
  }

  export class GraphFnList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      var args = this.expList[1].expList; // directで見てる
      var expList = this.expList[2];
      return new Fn(args, expList, env);
    }
  }


  export class GraphNestList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      var func = this.expList[0].evalSyntax(env);
      var args = this.expList[0].slice(1);
      return func.exec(args, env);
    }
  }

  export class GraphVarList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(229, 0, 106, 0.3);
    }

    evalSyntax(env: Env) {
      this.assert();
      var func;
      // 一番目の引数が((piyo 1 2) 2)みたいな形式の時
      if (this.expList[0] instanceof GraphVarList) {
        func = this.expList[0].evalSyntax(env);
      } else {
        func = env.findEnv(this.expList[0].value).get(this.expList[0].value);
      }
      var realArgsList = this.expList.slice(1);

      if (func.args.length !== realArgsList.length) {
        throw new InvalidArgumentError("Wrong args count");

      }
      for (var i=0;i<realArgsList.length;i++) {
        func.env.dict[func.args[i].value] = realArgsList[i].evalSyntax(env); //valueをdirectに指定しているけど良くない
      }
      return func.evalSyntax(env);
    }

    assert() {
    }
  }

  export class GraphQuoteList extends GraphExpList implements Evalable {
    env: Env;

    constructor(list, parent, point) {
      super(list, parent);
      this.listColor = new Color(0, 100, 0, 0.2);
    }

    exec () {
      this.assert();
      var list = this.expList[1];
      return list.evalSyntax(this.env)

    }
    evalSyntax(env) {
      this.env = env;
      return this
    }

    assert() {
      if (this.expList[0].type !== AtomType.QUOTE) {
        throw new Error("InvalidAtomTypeTypeException");
      }
    }
  }

  export class GraphSendList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(230, 0, 51, 0.3);
    }

    evalSyntax(env: Env) {
      this.assert();
      var object = this.expList[1].evalSyntax(env);
      var methodName = this.expList[2].value;
      var args = this.expList.slice(3).map(function (x) { return x.evalSyntax(env);});
      return object[methodName].apply(object, args);
    }

    assert() {
    }
  }

  export class GraphEvalList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      if (this.expList[1].type === AtomType.VAR) {
        var value = this.expList[1].value;
        var quote = env.findEnv(value).get(value);
        return quote.exec()
      }
      return this.expList[1].exec(env)
    }
  }

  export class GraphWindowList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 160, 233, 0.3);
    }

    evalSyntax(env: Env) {
      return window;
    }
  }

  // arithmetic
  export class GraphPlusList extends GraphExpList {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(230, 0, 18, 0.3);
    }

    evalSyntax(env) {
      var sum = 0;
      for (var i=1; i<this.expList.length;i++) {
        sum += this.expList[i].evalSyntax(env);
      }
      return sum;
    }
  }

  export class GraphMinusList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 160, 233, 0.3);
    }

    evalSyntax(env) {
      var sum = 0;
      for (var i=1;i < this.expList.length;i++) {
        if (i === 1) {
          sum = this.expList[i].evalSyntax(env);
        } else {
          sum -= this.expList[i].evalSyntax(env);
        }
      }
      return sum;
    }
  }

  export class GraphMulList extends GraphExpList implements Evalable {
    constructor(list, parent, point) {
      super(list, parent);
      this.listColor = new Color(143, 195, 31, 0.3);
    }

    evalSyntax(env) {
      var sum = 1;
      for (var i=1; i<this.expList.length; i++) {
        sum *= this.expList[i].evalSyntax(env);
      }
      return sum;
    }
  }

  export class GraphDivList extends GraphExpList implements Evalable {
    constructor(list, parent, point) {
      super(list, parent);
      this.listColor = new Color(96, 25, 134, 0.3);
    }

    evalSyntax(env) {
      var sum = 1;
      for (var i=1;i < this.expList.length;i++) {
        if (i === 1) {
          sum = this.expList[i].evalSyntax(env)
        } else {
          sum /= this.expList[i].evalSyntax(env)
        }
      }
      return sum
    }
  }

  // elational operator
  export class GraphEqualList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = Color.BaseGlay;
    }

    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) === this.expList[2].evalSyntax(env);
    }
  }

  export class GraphGreaterList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 104, 183, 0.3);
    }

    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) > this.expList[2].evalSyntax(env);
    }
  }

  export class GraphGreaterEqualList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(29, 32, 136, 0.3);
    }

    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) >= this.expList[2].evalSyntax(env);
    }
  }

  export class GraphLessList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(243, 152, 0, 0.3);
    }

    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) < this.expList[2].evalSyntax(env);
    }
  }
  
  export class GraphLessEqualList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(255, 251, 0, 0.3);
    }

    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) <= this.expList[2].evalSyntax(env);
    }
  }

  // graph
  export class GraphDrawList extends GraphExpList  implements VisualEvalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(235, 97, 0, 0.3);
    }

    evalSyntax(env: Env, drawingManager: DrawingDirector) {
      var figure = this.expList[1].evalSyntax(env);
      drawingManager.addDisplayElement(figure);
      return null;
    }
  }

  export class GraphPointList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(146, 7, 131, 0.3);
    }

    evalSyntax(env) {
      this.assert();
      return new Point(this.expList[1].evalSyntax(env), this.expList[2].evalSyntax(env));
    }
    assert() {
      if (this.expList[1] === undefined || this.expList[2] === undefined || this.expList.length > 3) {
        throw 'point arguments are illegal.';
      }
    }
  }

  export class GraphCircleList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(229, 0, 127, 0.3);
    }

    evalSyntax(env: Env) {
      var pointList: GraphPointList = this.expList[1];
      var radius: Evalable = this.expList[2];
      var colorList: GraphColorList = this.expList[3];
      return new Circle(pointList.evalSyntax(env), radius.evalSyntax(env), colorList.evalSyntax(env))
    }
  }

  export class GraphLineList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(143, 195, 31, 0.3);
    }

    evalSyntax(env: Env) {
      var startPointList: GraphPointList = this.expList[1];
      var endPointList: GraphPointList = this.expList[2];
      return new Line(startPointList.evalSyntax(env), endPointList.evalSyntax(env))
    }
  }

  export class GraphSizeList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(255, 251, 0, 0.3);
    }

    evalSyntax(env: Env) {
      var width:Evalable = this.expList[1];
      var height:Evalable = this.expList[2];
      return new Size(width.evalSyntax(env), height.evalSyntax(env))
    }
  }

  export class GraphRectList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 160, 233, 0.3);
    }

    evalSyntax(env: Env) {
      var pointList: GraphPointList = this.expList[1];
      var sizeList: GraphSizeList = this.expList[2];
      if (this.expList.length >= 3) {
        var colorList: GraphColorList = this.expList[3];
        return new Rect(pointList.evalSyntax(env), sizeList.evalSyntax(env), colorList.evalSyntax(env))
      }
      return new Rect(pointList.evalSyntax(env), sizeList.evalSyntax(env))
    }
  }

  export class GraphClearList extends GraphExpList implements VisualEvalable {
    evalSyntax(_: Env, drawingManager: DrawingDirector) {
      drawingManager.clear();
      return null;
    }
  }

  export class GraphColorList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(235, 97, 0, 0.3);
    }

    evalSyntax(env: Env) {
      this.assert();
      return new Color(this.expList[1].evalSyntax(env), this.expList[2].evalSyntax(env), this.expList[3].evalSyntax(env))
    }

    assert() {
      if (this.expList[1] === undefined || this.expList[2] === undefined || this.expList[3] === undefined || this.expList.length > 4) {
        throw new InvalidArgumentError('color arguments are illegal.')
      }
    }
  }

  export class GraphTextList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(229, 0, 106, 0.3);
    }

    evalSyntax(env: Env) {
      var str:string = this.expList[1].evalSyntax(env);
      var point:Point = this.expList[2].evalSyntax(env);
      var color:Color = this.expList[3].evalSyntax(env);
      return new Text(str, point, color);
    }
  }

}
