EMOLA.List.Greaterequal = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Greaterequal.prototype = new EMOLA.List();

EMOLA.List.Greaterequal.prototype.eval = function (env) {
  this.assert();
  return this.list[1].eval(env) >= this.list[2].eval(env);
}

EMOLA.List.Greaterequal.prototype.assert = function () {
}

