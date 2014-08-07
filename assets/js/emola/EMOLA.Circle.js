EMOLA.Circle = function (point, radius, color) {
  this.constructor(point);
  this.radius = radius;
  this.color = color;
};
EMOLA.Circle.prototype = new EMOLA.Figure();
