EMOLA.List.Clear = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Clear.prototype = new EMOLA.List();

EMOLA.List.Clear.prototype.eval = function (env) {
  this.assert();
  EMOLA.Global.graphicContext.clear();
  EMOLA.Global.drawingManager.clear();
  return null;
}

EMOLA.List.Clear.prototype.assert = function () {
}
