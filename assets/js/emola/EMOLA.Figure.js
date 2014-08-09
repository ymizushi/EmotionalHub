EMOLA.Figure = function (point, width, height) {
  this.point = point;
  this.width = width;
  this.height = height;
};
EMOLA.Figure.prototype.move = function (point, width, height) {
  this.point.move(point);
  this.width = width
  this.height = height;
}
