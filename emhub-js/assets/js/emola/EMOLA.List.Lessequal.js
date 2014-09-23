EMOLA.List.Lessequal = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Lessequal.prototype = new EMOLA.List();

EMOLA.List.Lessequal.prototype.eval = function (env) {
  this.assert();
  return this.list[1].eval(env) <= this.list[2].eval(env);
}

EMOLA.List.Lessequal.prototype.assert = function () {
}
