EMOLA.DrawingManager = function () {
  this.list = [];
};

EMOLA.DrawingManager.prototype.add = function (drawing) {
  this.list.push(drawing);
};

EMOLA.DrawingManager.prototype.clear = function () {
  this.list = [];
};

EMOLA.DrawingManager.prototype.draw = function (context) {
  for (var i=0;i<this.list.length;i++) {
    if (this.list[i].rotate) {
      this.list[i].rotate(0.01);
    }
    this.list[i].draw(context);
  }
};

EMOLA.DrawingManager.prototype.getDrawing = function (point) {
  for (var index in this.list) {
    var element = this.list[index];
    if (element.isMet(point)) {
      return element;
    }
  }
};
