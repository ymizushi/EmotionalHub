EMOLA.ContextWrapper = function (context) {
  this.context = context;
};

EMOLA.ContextWrapper.prototype.drawCircle = function (circle) {
  this.context.beginPath();
  this.context.fillStyle = 'rgba(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ' ,' + circle.color.a + ')';
  this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI*2, false);
  this.context.fill();
}

EMOLA.ContextWrapper.prototype.drawRect = function (rect) {
  this.context.fillStyle = 'rgb(' + rect.color.r + ' ,' + rect.color.g + ' ,' + rect.color.b + ')';
  this.context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height);
}

EMOLA.ContextWrapper.prototype.clear = function () {
  var sizeWidth = this.context.canvas.clientWidth;
  var sizeHeight = this.context.canvas.clientHeight;
  this.context.clearRect(0, 0, sizeWidth, sizeHeight);
}

EMOLA.ContextWrapper.prototype.drawLine = function (line) {
  this.context.beginPath();
  this.context.moveTo(line.from.x, line.from.y);
  this.context.lineTo(line.to.x, line.to.y);
  this.context.stroke();
}
