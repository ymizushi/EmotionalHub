EMOLA.Text = function (text, point, color) {
  this.text = text;
  this.point = point;
  this.color = color;
};

EMOLA.Text.prototype.draw = function (context) {
  context.drawText(this);
}

