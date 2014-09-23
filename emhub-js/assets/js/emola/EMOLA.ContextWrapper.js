EMOLA.ContextWrapper = function (context) {
  this.context = context;

  this.width = context.canvas.width;
  this.height = context.canvas.height;
  this.offsetLeft = context.canvas.offsetLeft;
  this.offsetTop = context.canvas.offsetTop;
};

EMOLA.ContextWrapper.prototype.drawCircle = function (circle) {
  this.context.beginPath();
  this.context.fillStyle = 'rgba(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ' ,' + circle.color.a + ')';
  this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI*2, false);
  this.context.fill();
}; 

EMOLA.ContextWrapper.prototype.drawRect = function (rect) {
  this.context.fillStyle = 'rgb(' + rect.color.r + ' ,' + rect.color.g + ' ,' + rect.color.b + ')';
  this.context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height);
};

EMOLA.ContextWrapper.prototype.clear = function () {
  var sizeWidth = this.context.canvas.clientWidth;
  var sizeHeight = this.context.canvas.clientHeight;
  this.context.clearRect(0, 0, sizeWidth, sizeHeight);
};

EMOLA.ContextWrapper.prototype.drawLine = function (line) {
  this.context.beginPath();
  this.context.moveTo(line.from.x, line.from.y);
  this.context.lineTo(line.to.x, line.to.y);
  this.context.stroke();
};

EMOLA.ContextWrapper.prototype.drawText = function (textObject) {
  this.context.fillStyle = 'rgb(' + textObject.color.r + ' ,' + textObject.color.g + ' ,' + textObject.color.b + ')';
  this.context.fillText(textObject.text, textObject.point.x, textObject.point.y);
};
