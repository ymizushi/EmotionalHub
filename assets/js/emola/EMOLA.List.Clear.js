EMOLA.List.Clear = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Clear.prototype = new EMOLA.List();

EMOLA.List.Clear.prototype.eval = function (env) {
  this.assert();
  EMOLA.Global.graphicContext.clear();
  return EMOLA.Global.graphicContext;
}

EMOLA.List.Clear.prototype.assert = function () {
}
