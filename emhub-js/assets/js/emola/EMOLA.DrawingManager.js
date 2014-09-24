EMOLA.DrawingManager = function (socket) {
  this.list = [];
  this.socket = socket;
};

EMOLA.DrawingManager.prototype.add = function (drawing) {
  this.list.push(drawing);
  this.socket.send("hoge");
};

EMOLA.DrawingManager.prototype.remove = function (drawing) {
  for (var i in this.list) {
    if (this.list[i] == drawing) {
      this.list.splice(i,1);
    }
  }
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

EMOLA.DrawingManager.prototype.getDrawing = function (point, drawing) {
  for (var index in this.list) {
    var element = this.list[index];
    if (element.isMet(point) && element !== drawing ) {
      return element;
    }
  }
};

EMOLA.DrawingManager.prototype.getDrawingList = function () {
  metDrawingList = [];
  for (var index in this.list) {
    var element = this.list[index];
    if (element.isMet(point)) {
      metDrawingList.push(element);
    }
  }
  return metDrawingList;
};
