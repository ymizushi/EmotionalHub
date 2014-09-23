EMOLA.Line = function (from, to) {
  this.from = from;
  this.to = to;
};

EMOLA.Line.prototype.draw = function (context) {
  context.drawLine(this);
}

