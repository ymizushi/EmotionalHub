EMOLA.List.Equal = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Equal.prototype = new EMOLA.List();

EMOLA.List.Equal.prototype.eval = function (env) {
  this.assert();
  return this.list[1].eval(env) === this.list[2].eval(env);
}

EMOLA.List.Equal.prototype.assert = function () {
}


