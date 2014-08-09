EMOLA.Circle = function (point, radius, color) {
  this.constructor(point, 2*radius, 2*radius);
  this.radius = radius;
  this.color = color;
};
EMOLA.Circle.prototype = new EMOLA.Figure();
EMOLA.Circle.prototype.move = function (point, radius, color) {
  this.point.move(point);
  this.radius = radius;
  this.color.move(color);
}
