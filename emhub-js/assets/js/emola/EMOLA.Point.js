EMOLA.Point = function (x, y) {
  this.x = x;
  this.y = y;
};

EMOLA.Point.prototype.move = function (point) {
  this.x = point.x;
  this.y = point.y;
};

EMOLA.Point.prototype.add = function (point) {
  this.x += point.x;
  this.y += point.y;
};

