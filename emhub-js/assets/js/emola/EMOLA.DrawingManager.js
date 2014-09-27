EMOLA.DrawingManager = function (socket) {
  this._list = [];
  this._socket = socket;
};

EMOLA.DrawingManager.prototype.add = function (drawing) {
  this._list.push(drawing);
  this._socket.send("hoge");
};

EMOLA.DrawingManager.prototype.remove = function (drawing) {
  for (var i in this._list) {
    if (this._list[i] == drawing) {
      this._list.splice(i,1);
    }
    if (this._list[i] instanceof EMOLA.List) {
      this._list[i].remove(drawing);
    }
  }
};

EMOLA.DrawingManager.prototype.clear = function () {
  this._list = [];
};

EMOLA.DrawingManager.prototype.draw = function (context) {
  for (var i=0;i<this._list.length;i++) {
    if (this._list[i].rotate) {
      this._list[i].rotate(0.01);
    }
    this._list[i].draw(context);
  }
};

/**
 * @param {EMOLA.Point} point - .
 * @param {EMOLA.List} drawing - .
 */
EMOLA.DrawingManager.prototype.getDrawing = function (point, drawing) {
  for (var index in this._list) {
    var emlistObject = this._list[index];
    if (emlistObject.isMet(point) && emlistObject !== drawing ) {
      return emlistObject;
    }
  }
};

EMOLA.DrawingManager.prototype.getListObject = function (point, drawing) {
  for (var index in this._list) {
    var listObject = this._list[index];
    var targetListObject = listObject.getListObject(point);
    if (targetListObject && targetListObject !== drawing ) {
      return targetListObject;
    }
  }
};

