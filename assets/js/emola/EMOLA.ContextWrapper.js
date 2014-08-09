EMOLA.ContextWrapper = function (context) {
  this.context = context;
};

EMOLA.ContextWrapper.prototype.drawCircle = function (circle) {
  this.context.beginPath();
  this.context.fillStyle = 'rgb(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ')';
  this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI*2, false);
  this.context.fill();
}
