EMOLA.List.Draw = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Draw.prototype = new EMOLA.List();

EMOLA.List.Draw.prototype.evalSyntax = function (env) {
  this.assert();
  var figure = this.list[1].evalSyntax(env);
  EMOLA.Global.drawingManager.add(figure);
  return figure;
}

EMOLA.List.Draw.prototype.assert = function () {
}

