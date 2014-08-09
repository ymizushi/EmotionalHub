EMOLA.Circle = function (point, radius, color) {
  this.constructor(point, 2*radius, 2*radius);
  this.radius = radius;
  this.color = color;
};
EMOLA.Circle.prototype = new EMOLA.Figure();
EMOLA.Circle.prototype.move = function (point, radius, color) {
  this.point.x = point.x;
  this.point.y = point.y;
  this.radius = radius;
  this.color.r = color.r;
  this.color.g = color.g;
  this.color.b = color.b;
}

EMOLA.Circle.prototype.draw = function (context) {
  context.drawCircle(this);
}
