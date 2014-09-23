EMOLA.Rect = function (point, size, color) {
  this.point = point;
  this.size = size;
  this.color = color;
};

EMOLA.Rect.prototype.move = function (point, size, color) {
  this.point.x = point.x;
  this.point.y = point.y;
  this.size.width = size.width;
  this.size.height = size.height;
  this.color.r = color.r;
  this.color.g = color.g;
  this.color.b = color.b;
}

EMOLA.Rect.prototype.draw = function (context) {
  context.drawRect(this);
}
