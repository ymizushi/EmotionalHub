EMOLA.List.Draw = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Draw.prototype = new EMOLA.List();

EMOLA.List.Draw.prototype.eval = function (env) {
  this.assert();
  var figure = this.list[1].eval(env);
  EMOLA.Global.drawingManager.add(figure);
  return figure;
}

EMOLA.List.Draw.prototype.assert = function () {
}

