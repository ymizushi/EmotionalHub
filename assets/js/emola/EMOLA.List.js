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

EMOLA.List.prototype.push = function (element) {
  return this.list.push(element);
};

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

      var text;
      if (this.list[i].value) {
        text = this.list[i].value;
      } else {
        text = this.list[i].type;
      }
      var text = new EMOLA.Text(text, point, new EMOLA.Color(200,200,200));
      text.draw(context);
    }

  }
  (new EMOLA.Circle(this.point , this.radius, this.listColor)).draw(context);
  nodeCircle.draw(context);
};

EMOLA.List.prototype.isMet = function (point) {
  if (
    this.point.x - EMOLA.List.NODE_RADIUS <=  point.x && point.x <=this.point.x + EMOLA.List.NODE_RADIUS
    && 
    this.point.y - EMOLA.List.NODE_RADIUS <=  point.y && point.y <=this.point.y + EMOLA.List.NODE_RADIUS
  ) {
    return true;
  }
  return false;
}
