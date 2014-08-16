EMOLA.Rect = function (point, width, height, color) {
  this.point = point;
  this.width = width;
  this.height = height;
  this.color = color;
};

EMOLA.Rect.prototype.move = function (point, width, height, color) {
  this.point.x = point.x;
  this.point.y = point.y;
  this.width = width;
  this.height = height;
  this.color.r = color.r;
  this.color.g = color.g;
  this.color.b = color.b;
}

EMOLA.Rect.prototype.draw = function (context) {
  context.drawRect(this);
}

