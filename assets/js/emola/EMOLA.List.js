
EMOLA.List = function (list, point, parent) {
  this.list = list;
  this.childrenAspectRatio = 0.5;
  this.radius = 150;

  this.point = point||null;
  this.nodeColor = new EMOLA.Color(255, 255, 51);
  this.leafColor = new EMOLA.Color(102, 102, 102);
  this.parent = parent||null;
  this.deltaTheta = 0;
};

EMOLA.List.NODE_RADIUS = 20;
EMOLA.List.LEAF_RADIUS = 15;

EMOLA.List.prototype.push = function (element) {
  return this.list.push(element);
}

EMOLA.List.prototype.rotate = function (theta) {
  this.deltaTheta += theta ;
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
  nodeCircle.draw(context);

  var theta = this.deltaTheta;
  for (var i=0;i<this.list.length;i++) {
    theta += 2 * Math.PI/this.list.length;
    var point = new EMOLA.Point(this.point.x + this.childrenAspectRatio * this.radius*Math.cos(theta), this.point.y + this.childrenAspectRatio * this.radius*Math.sin(theta));
    if (this.list[i] instanceof EMOLA.List) {
      this.list[i].point = point;
      this.list[i].draw(context);
    } else {
      var circle = new EMOLA.Circle(point, EMOLA.List.LEAF_RADIUS, this.leafColor);
      circle.draw(context);
    }
  }
}
