EMOLA.List = function (list, parent, point) {
  this.list = list;

  // グラフィック要素
  this.radius = 50;
  this.theta = 0;
  this.nodeColor = new EMOLA.Color(255, 255, 51);
  this.leafColor = new EMOLA.Color(102, 102, 102);
  this.listColor = new EMOLA.Color(50, 50, 50,0.2);

  this.parent = parent||null;
  this.point = point||null;
};

EMOLA.List.NODE_RADIUS = 20;
EMOLA.List.LEAF_RADIUS = 15;

EMOLA.List.create = function (syntaxList) {
  var firstList = syntaxList[0];
  var syntaxMap = {};
  syntaxMap[EMOLA.Atom.FN] = EMOLA.List.Fn;
  syntaxMap[EMOLA.Atom.IF] = EMOLA.List.If;
  syntaxMap[EMOLA.Atom.DEF] = EMOLA.List.Def;
  syntaxMap[EMOLA.Atom.DEFN] = EMOLA.List.Defn;
  syntaxMap[EMOLA.Atom.DO] = EMOLA.List.Do;
  syntaxMap[EMOLA.Atom.SEND] = EMOLA.List.Send;
  syntaxMap[EMOLA.Atom.VAR] = EMOLA.List.Var;
  syntaxMap[EMOLA.Atom.LET] = EMOLA.List.Let;

  syntaxMap[EMOLA.Atom.PLUS] = EMOLA.List.Plus;
  syntaxMap[EMOLA.Atom.MINUS] = EMOLA.List.Minus;
  syntaxMap[EMOLA.Atom.DIV] = EMOLA.List.Div;
  syntaxMap[EMOLA.Atom.MUL] = EMOLA.List.Mul;
  syntaxMap[EMOLA.Atom.EQUAL] = EMOLA.List.Equal;
  syntaxMap[EMOLA.Atom.GREATER] = EMOLA.List.Greater;
  syntaxMap[EMOLA.Atom.LESS] = EMOLA.List.Less;
  syntaxMap[EMOLA.Atom.GREATEREQUAL] = EMOLA.List.Greaterequal;
  syntaxMap[EMOLA.Atom.LESSEQUAL] = EMOLA.List.Lessequal;

  syntaxMap[EMOLA.Atom.DRAW] = EMOLA.List.Draw;
  syntaxMap[EMOLA.Atom.POINT] = EMOLA.List.Point;
  syntaxMap[EMOLA.Atom.COLOR] = EMOLA.List.Color;
  syntaxMap[EMOLA.Atom.CIRCLE] = EMOLA.List.Circle;
  syntaxMap[EMOLA.Atom.CLEAR] = EMOLA.List.Clear;

  var targetFunction = syntaxMap[firstList.type];
  return new targetFunction(syntaxList);
}



EMOLA.List.prototype.push = function (element) {
  return this.list.push(element);
}

EMOLA.List.prototype.rotate = function (theta) {
  this.theta += theta ;
  for (var i=0;i<this.list.length;i++) {
    if (this.list[i] instanceof EMOLA.List) {
      this.list[i].rotate(theta);
    } 
  }
}

EMOLA.List.prototype.pop = function () {
  return this.list.pop();
}

EMOLA.List.prototype.draw = function (context) {
  var nodeCircle = new EMOLA.Circle(this.point , EMOLA.List.NODE_RADIUS, this.nodeColor);

  for (var i=0;i<this.list.length;i++) {
    this.theta += 2 * Math.PI/this.list.length;
    var point = new EMOLA.Point(this.point.x + this.radius*Math.cos(this.theta), this.point.y +  this.radius*Math.sin(this.theta));
    if (this.list[i] instanceof EMOLA.List) {
      var point = new EMOLA.Point(this.point.x + this.radius*3*Math.cos(this.theta), this.point.y +  this.radius*3*Math.sin(this.theta));
      this.list[i].point = point;
      this.list[i].draw(context);
    } else {
      var circle = new EMOLA.Circle(point, EMOLA.List.LEAF_RADIUS, this.leafColor);
      circle.draw(context);
    }
  }
  (new EMOLA.Circle(this.point , this.radius, this.listColor)).draw(context);
  nodeCircle.draw(context);
}
