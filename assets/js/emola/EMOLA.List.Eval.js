EMOLA.List.Eval = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Eval.prototype = new EMOLA.List();

EMOLA.List.Eval.prototype.eval = function (env) {
  this.assert();
  return this.list[1].eval(env).eval(env);
}

EMOLA.List.Eval.prototype.assert = function () {
}

