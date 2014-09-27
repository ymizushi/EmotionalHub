EMOLA.Figure = function (point, width, height) {
  this.point = point;
  this.width = width;
  this.height = height;
};
EMOLA.Figure.prototype.move = function (point, width, height) {
  this.point.move(point);
  this.width = width;
  this.height = height;
};

EMOLA.Figure.prototype.isMet = function (point) {
  if (
    this.point.x - this.radius <=  point.x && point.x <=this.point.x + this.radius && this.point.y - this.radius <=  point.y && point.y <=this.point.y + this.radius) {
    return true;
  }
  return false;
};
