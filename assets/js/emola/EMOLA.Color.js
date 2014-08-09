EMOLA.Color = function (r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
};

EMOLA.Color.prototype.move = function (color) {
  this.r = color.r;
  this.g = color.g;
  this.b = color.b;
}
