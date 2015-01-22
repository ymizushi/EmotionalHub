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

  export class CircleList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      var pointList: PointList = this.list[1];
      var radius: Evalable = this.list[2];
      var colorList: ColorList = this.list[3];
      return new Circle(pointList.evalSyntax(env), radius.evalSyntax(env), colorList.evalSyntax(env))
    }
  }

  export class DefList extends ExpList implements Evalable {
    evalSyntax(env) {
      this.assert();
      var keyName = this.list[1].value;
      var value = this.list[2].evalSyntax(env);
      env.update(keyName, value);
      return null
    }

    assert() {
      if (this.list.length !== 3) {
        throw new InvalidArgumentError("Argument length are invalid.");
      }
      if (this.list[1].type !== AtomType.VAR) {
        throw new InvalidTypeError("Invalid atom type.")
      }
    }
  }

  export class DefnList extends ExpList implements Evalable {
    evalSyntax(env) {
      this.assert();
      var symbol = this.list[1];
      var args = this.list[2].expList;
      var expList = this.list[3];
      env.update(symbol.value, new Fn(args, expList, new Env(env)));
      return null
    }

    assert() {
      if (this.list.length !== 4) {
        throw new InvalidArgumentError("Argument length are invalid.")
      }
    }
  }
  export class DivList extends ExpList implements Evalable {
    evalSyntax(env) {
      var sum = 1;
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
  export class DoList extends ExpList implements Evalable {
    evalSyntax(env) {
      var expList = this.list.slice(1);
      var result = expList.map(function (elem) { return elem.evalSyntax(env);});
      return result[result.length-1]; // 配列の最後の要素を取り出す
    }
  }

  export class DrawList extends ExpList  implements Evalable {
    evalSyntax(env) {
      var figure = this.list[1].evalSyntax(env);
      Global.drawingManager.add(figure);
      return figure;
    }
  }

  export class EqualList extends ExpList implements Evalable {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) === this.list[2].evalSyntax(env);
    }
  }

  export class EvalList extends ExpList implements Evalable {
    evalSyntax(env) {
      if (this.list[1].type === AtomType.VAR) {
        var value = this.list[1].value;
        var quote = env.findEnv(value).get(value);
        return quote.exec()
      }
      return this.list[1].exec(env)
    }
  }

  export class FnList extends ExpList implements Evalable {
    evalSyntax(env) {
      var args = this.list[1].expList; // directで見てる
      var expList = this.list[2];
      return new Fn(args, expList, env);
    }
  }

  export class GreaterList extends ExpList implements Evalable {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) > this.list[2].evalSyntax(env);
    }
  }

  export class IfList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
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
        throw new InvalidArgumentError("Argment length are too many.");
      }
    }
  }
  export class LessList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      return this.list[1].evalSyntax(env) < this.list[2].evalSyntax(env);
    }
  }

  export class LessEqualList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      return this.list[1].evalSyntax(env) <= this.list[2].evalSyntax(env);
    }
  }
  export class LetList extends ExpList implements Evalable {
    // (let (x 1) (+ x 1 1))
    evalSyntax(env: Env) {
      var lets = this.list[1].expList;
      var expList = this.list[2];
      var newEnv = new Env(env);
      for (var i=0;i<lets.length;i=i+2) {
        newEnv.update(lets[i].value, lets[i+1].evalSyntax(newEnv));
      }
      return expList.evalSyntax(newEnv);
    }
  }
  export class MinusList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
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

  export class MulList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      var sum = 1;
      for (var i=1; i<this.list.length; i++) {
        sum *= this.list[i].evalSyntax(env);
      }
      return sum;
    }
  }

  export class NestList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      var func = this.list[0].evalSyntax(env);
      var args = this.list[0].slice(1);
      return func.exec(args, env);
    }
  }

  export class PlusList extends ExpList implements Evalable{
    evalSyntax(env) {
      var sum = 0;
      for (var i=1; i<this.list.length;i++) {
        sum += this.list[i].evalSyntax(env);
      }
      return sum;
    }
  }

  export class ColorList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      this.assert();
      return new Color(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env), this.list[3].evalSyntax(env))
    }

    assert() {
      if (this.list[1] === undefined || this.list[2] === undefined || this.list[3] === undefined || this.list.length > 4) {
        throw new InvalidArgumentError('color arguments are illegal.')
      }
    }
  }

  export class ClearList extends ExpList implements Evalable {
    evalSyntax(_: Env) {
      Global.graphicContext.clear();
      Global.drawingManager.clear();
    }
  }

  export class PointList extends ExpList implements Evalable {
    evalSyntax(env) {
      this.assert();
      return new Point(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env));
    }

    assert() {
      if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
        throw new InvalidArgumentError('point arguments are illegal.');
      }
    }
  }
  export class QuoteList extends ExpList implements Evalable {
    env: Env;

    exec () {
      this.assert();
      var list = this.list[1];
      if (list.draw) {
        Global.drawingManager.add(list);
      }
      return list.evalSyntax(this.env)

    }
    evalSyntax(env) {
      this.env = env;
      return this
    }

    assert() {
      if (this.list[0].type !== AtomType.QUOTE) {
        throw new Error("InvalidAtomTypeTypeException");
      }
    }
  }

  export class SendList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      var object = this.list[1].evalSyntax(env);
      var methodName = this.list[2].value;
      var args = this.list.slice(3).map(function (x) { return x.evalSyntax(env);});
      object[methodName].apply(object, args);
      return object;
    }
  }

  export class VarList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      var func:any;
      if (this.list[0] instanceof VarList) {
        func = this.list[0].evalSyntax(env);
      } else {
        func = env.findEnv(this.list[0].value).get(this.list[0].value);
      }
      var realArgsList = this.list.slice(1);

      for (var i=0;i<realArgsList.length;i++) {
        func.env.dict[func.args[i].value] = realArgsList[i].evalSyntax(env); //valueをdirectに指定しているけど良くない
      }
      return func.evalSyntax(env);
    }
  }

  export class GraphExpListContext {
    static NODE_RADIUS = 20;
    static LEAF_RADIUS = 15;

    radius: number;
    theta: number;
    nodeColor: Color;
    leafColor: Color;
    listColor: Color;
    parent: GraphExpList;
    point: Point;
    list: any;

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

    rotate(theta) {
      this.theta += theta ;
      for (var i=0;i<this.list.length;i++) {
        if (this.list[i] instanceof GraphExpList) {
          this.list[i].rotate(theta);
        }
      }
    }

    draw(context) {
      var nodeCircle = new Circle(this.point , GraphExpList.NODE_RADIUS, this.nodeColor);

      for (var i=0;i<this.list.length;i++) {
        this.theta += 2 * Math.PI/this.list.length;
        var point = new Point(this.point.x + this.radius*Math.cos(this.theta), this.point.y +  this.radius*Math.sin(this.theta));
        if (this.list[i] instanceof GraphExpList) {
          point = new Point(this.point.x + this.radius*3*Math.cos(this.theta), this.point.y +  this.radius*3*Math.sin(this.theta));
          this.list[i].point = point;
          this.list[i].draw(context);
        } else {
          var circle = new Circle(point, GraphExpList.LEAF_RADIUS, this.leafColor);
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
      return !!(this.point.x - GraphExpList.NODE_RADIUS <= point.x && point.x <= this.point.x + GraphExpList.NODE_RADIUS &&
      this.point.y - GraphExpList.NODE_RADIUS <= point.y && point.y <= this.point.y + GraphExpList.NODE_RADIUS);

    }

    getListObject(point) {
      if (this.isMet(point)) {
        return this;
      }
      this.list.forEach(function (element) {
        var leafListObject = element;
        if (leafListObject instanceof GraphExpList && leafListObject.getListObject(point)) {
          return leafListObject;
        }
      });
      return null;
    }
  }

  export class GraphExpList {
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

    constructor(expList:ExpList, parent:GraphExpList=null) {
      this.expList = expList;
    
      // グラフィック要素
      this.radius = 50;
      this.theta = 0;
      this.nodeColor = new Color(255, 255, 51);
      this.leafColor = new Color(102, 102, 102);
      this.listColor = new Color(50, 50, 50,0.2);
    
      this.parent = parent;

      if (parent) {
        this.point = null;
      } else {
        var x = Math.random() * 200;
        var y = Math.random() * 200;
        this.point = new Point(Math.floor(x), Math.floor(y));
      }
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
          var circle = new Circle(point, GraphExpList.LEAF_RADIUS, this.leafColor);
          circle.draw(context);
    
          this.drawText(this.expList[i], context, point, new Color(200,200,200))
        }
    
      }
      (new Circle(this.point , this.radius, this.listColor)).draw(context);
      var nodeCircle = new Circle(this.point , GraphExpList.NODE_RADIUS, this.nodeColor);
      nodeCircle.draw(context);
      this.drawText(this.expList[0], context, this.point, new Color(100,100,100))
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
      this.expList.forEach(function (element) {
        var leafListObject = element;
        if (leafListObject instanceof GraphExpList && leafListObject.getListObject(point)) {
          return leafListObject;
        }
      });
      return null;
    }
    
    add(listObject) {
      this.expList.push(listObject);
    }
    evalSyntax(env: Env) {

    }
  }

  export class GraphCircleList extends GraphExpList implements Evalable {
    evalSyntax(env: Env) {
      var pointList: GraphPointList = this.expList[1];
      var radius: Evalable = this.expList[2];
      var colorList: GraphColorList = this.expList[3];
      return new Circle(pointList.evalSyntax(env), radius.evalSyntax(env), colorList.evalSyntax(env))
    }
  }

  export class GraphClearList extends GraphExpList implements Evalable {
    evalSyntax(_: Env) {
      Global.graphicContext.clear();
      Global.drawingManager.clear();
    }
  }

  export class GraphColorList extends GraphExpList implements Evalable {
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

  export class GraphDefList extends GraphExpList implements Evalable {
    constructor(list, parent) {
      super(list, parent);
      this.listColor = new Color(0, 255, 0, 0.2)
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
  

  export class GraphDivList extends GraphExpList implements Evalable {
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
  export class GraphDoList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      var expList = this.expList.slice(1);
      var result = expList.map(function (elem) { return elem.evalSyntax(env);});
      return result[result.length-1]; // 配列の最後の要素を取り出す
    }
  }
  

  export class GraphDrawList extends GraphExpList  implements Evalable {
    evalSyntax(env) {
      var figure = this.expList[1].evalSyntax(env);
      Global.drawingManager.add(figure);
      return figure;
    }
  }

  export class GraphEqualList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) === this.expList[2].evalSyntax(env);
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

  export class GraphFnList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      var args = this.expList[1].expList; // directで見てる
      var expList = this.expList[2];
      return new Fn(args, expList, env);
    }
  }

  export class GraphGreaterList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) > this.expList[2].evalSyntax(env);
    }
  }

  export class GraphGreaterEqualList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) >= this.expList[2].evalSyntax(env);
    }
  }

  export class GraphIfList extends GraphExpList implements Evalable {
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
  
  export class GraphLessList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) < this.expList[2].evalSyntax(env);
    }
  }
  
  export class GraphLessEqualList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      return this.expList[1].evalSyntax(env) <= this.expList[2].evalSyntax(env);
    }
  }
  

  export class GraphLetList extends GraphExpList implements Evalable {
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

  export class GraphMinusList extends GraphExpList implements Evalable {
    constructor(list, parent, point) {
      super(list, parent);
      this.listColor = new Color(50, 0, 0, 0.2);
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
      this.listColor = new Color(0, 200, 50, 0.2);
    }
  
    evalSyntax(env) {
      var sum = 1;
      for (var i=1; i<this.expList.length; i++) {
        sum *= this.expList[i].evalSyntax(env);
      }
      return sum;
    }
  }

  export class GraphNestList extends GraphExpList implements Evalable {
    evalSyntax(env) {
      var func = this.expList[0].evalSyntax(env);
      var args = this.expList[0].slice(1);
      return func.exec(args, env);
    }
  }
  
  export class GraphPlusList extends GraphExpList {
    constructor(list, parent, point) {
      super(list, parent);
      this.listColor = new Color(255, 0, 0, 0.2);
    }
  
    evalSyntax(env) {
      var sum = 0;
      for (var i=1; i<this.expList.length;i++) {
        sum += this.expList[i].evalSyntax(env);
      }
      return sum;
    }
  }
  
  export class GraphPointList extends GraphExpList implements Evalable {
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

  export class GraphQuoteList extends GraphExpList implements Evalable {
    env: Env;

    constructor(list, parent, point) {
      super(list, parent);
      this.listColor = new Color(0, 100, 0, 0.2);
    }

    exec () {
      this.assert();
      var list = this.expList[1];
      if (list.draw) {
        Global.drawingManager.add(list);
      }
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
    evalSyntax(env: Env) {
      this.assert();
      var object = this.expList[1].evalSyntax(env);
      var methodName = this.expList[2].value;
      var args = this.expList.slice(3).map(function (x) { return x.evalSyntax(env);});
      object[methodName].apply(object, args);
      return object;
    }
    
    assert() {
    }
  }

  export class GraphVarList extends GraphExpList implements Evalable {
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
}
