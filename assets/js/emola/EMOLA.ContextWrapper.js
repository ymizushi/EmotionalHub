EMOLA.ContextWrapper = function (context) {
  this.context = context;
};

EMOLA.ContextWrapper.prototype.drawCircle = function (circle) {
  this.context.beginPath();
  this.context.fillStyle = 'rgb(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ')';
  this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI*2, false);
  this.context.fill();
}

EMOLA.ContextWrapper.prototype.drawRect = function (rect) {
  this.context.fillStyle = 'rgb(' + rect.color.r + ' ,' + rect.color.g + ' ,' + rect.color.b + ')';
  this.context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height);
}
