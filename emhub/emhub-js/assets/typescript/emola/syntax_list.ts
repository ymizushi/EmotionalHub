///<reference path="emola.ts"/>
///<reference path="lang.ts"/>
///<reference path="shape.ts"/>

module emola {
  export class ExpList {
    static NODE_RADIUS = 20;
    static LEAF_RADIUS = 15;

    radius: number;
    theta: number;
    nodeColor: Color;
    leafColor: Color;
    listColor: Color;
    parent: ExpList;
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
    
    rotate(theta) {
      this.theta += theta ;
      for (var i=0;i<this.list.length;i++) {
        if (this.list[i] instanceof ExpList) {
          this.list[i].rotate(theta);
        } 
      }
    }
    
    pop() {
      return this.list.pop();
    }
    
    draw(context) {
      var nodeCircle = new Circle(this.point , ExpList.NODE_RADIUS, this.nodeColor);
    
      for (var i=0;i<this.list.length;i++) {
        this.theta += 2 * Math.PI/this.list.length;
        var point = new Point(this.point.x + this.radius*Math.cos(this.theta), this.point.y +  this.radius*Math.sin(this.theta));
        if (this.list[i] instanceof ExpList) {
          point = new Point(this.point.x + this.radius*3*Math.cos(this.theta), this.point.y +  this.radius*3*Math.sin(this.theta));
          this.list[i].point = point;
          this.list[i].draw(context);
        } else {
          var circle = new Circle(point, ExpList.LEAF_RADIUS, this.leafColor);
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
      return !!(this.point.x - ExpList.NODE_RADIUS <= point.x && point.x <= this.point.x + ExpList.NODE_RADIUS &&
      this.point.y - ExpList.NODE_RADIUS <= point.y && point.y <= this.point.y + ExpList.NODE_RADIUS);

    }
    
    getListObject(point) {
      if (this.isMet(point)) {
        return this;
      }
      this.list.forEach(function (element) {
        var leafListObject = element;
        if (leafListObject instanceof ExpList && leafListObject.getListObject(point)) {
          return leafListObject;
        }
      });
      return null;
    }
    
    add(listObject) {
      this.list.push(listObject);
    }

    evalSyntax(env: Env) {
    }
  }

  export class CircleList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      var pointList: PointList = this.list[1];
      var radius: Atom = this.list[2];
      var colorList: ColorList = this.list[3];
      return new Circle(pointList.evalSyntax(env), radius.evalSyntax(env), colorList.evalSyntax(env))
    }
  }

  export class ClearList extends ExpList implements Evalable {
    evalSyntax(_: Env) {
      Global.graphicContext.clear();
      Global.drawingManager.clear();
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

  export class DefList extends ExpList implements Evalable {
    constructor(list, parent, point) {
      super(list, parent, point);
      this.listColor = new Color(0, 255, 0, 0.2)
    }
    
    evalSyntax(env) {
      this.assert();
      var keyName = this.list[1].value;
      var value = this.list[2].evalSyntax(env);
      env.update(keyName, value);
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

  export class DefnList extends ExpList implements Evalable {
    // (defn hoge (x y) (+ x y))
    evalSyntax(env) {
      this.assert();
      var symbol = this.list[1];
      var args = this.list[2].list;
      var expList = this.list[3];
      env.update(symbol.value, new Fn(args, expList, new Env(env)));
      return null
    }
    
    assert() {
      if (this.list.length !== 4) {
        throw new Error("InvalidArgumentException")
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
      if (this.list[1].type === Atom.VAR) {
        var value = this.list[1].value;
        var quote = env.findEnv(value).get(value);
        return quote.exec()
      }
      return this.list[1].exec(env)
    }
  }

  export class FnList extends ExpList implements Evalable {
    evalSyntax(env) {
      var args = this.list[1].list; // directで見てる
      var expList = this.list[2];
      return new Fn(args, expList, env);
    }
  }

  export class GreaterList extends ExpList implements Evalable {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) > this.list[2].evalSyntax(env);
    }
  }

  export class GreaterEqualList extends ExpList implements Evalable {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) >= this.list[2].evalSyntax(env);
    }
  }

  export class IfList extends ExpList implements Evalable {
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
  
  export class LessList extends ExpList implements Evalable {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) < this.list[2].evalSyntax(env);
    }
  }
  
  export class LessEqualList extends ExpList implements Evalable {
    evalSyntax(env) {
      return this.list[1].evalSyntax(env) <= this.list[2].evalSyntax(env);
    }
  }
  
  export class LetList extends ExpList implements Evalable {
    // (let (x 1) (+ x 1 1))
    evalSyntax(env) {
      var lets = this.list[1].list;
      var expList = this.list[2];
      var newEnv = new Env(env);
      for (var i=0;i<lets.length;i=i+2) {
        newEnv.update(lets[i].value, lets[i+1].evalSyntax(newEnv));
      }
      return expList.evalSyntax(newEnv);
    }
  }

  export class MinusList extends ExpList implements Evalable {
    constructor(list, parent, point) {
      super(list, parent, point);
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

  export class MulList extends ExpList implements Evalable {
    constructor(list, parent, point) {
      super(list, parent, point);
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

  export class NestList extends ExpList implements Evalable {
    evalSyntax(env) {
      var func = this.list[0].evalSyntax(env);
      var args = this.list[0].slice(1);
      return func.exec(args, env);
    }
  }
  
  export class PlusList extends ExpList {
    constructor(list, parent, point) {
      super(list, parent, point);
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
  
  export class PointList extends ExpList implements Evalable {
    evalSyntax(env) {
      this.assert();
      return new Point(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env));
    }
    assert() {
      if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
        throw 'point arguments are illegal.';
      }
    }
  }

  export class QuoteList extends ExpList implements Evalable {
    env: Env;

    constructor(list, parent, point) {
      super(list, parent, point);
      this.listColor = new Color(0, 100, 0, 0.2);
    }

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
      if (this.list[0].type !== Atom.QUOTE) {
        throw new Error("InvalidAtomTypeException");
      }
    }
  }
  
  export class SendList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
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

  export class VarList extends ExpList implements Evalable {
    evalSyntax(env: Env) {
      this.assert();
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
    
    assert() {
    }
  }
}
