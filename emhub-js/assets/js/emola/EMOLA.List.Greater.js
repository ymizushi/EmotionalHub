EMOLA.List.Greater = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Greater.prototype = new EMOLA.List();

EMOLA.List.Greater.prototype.eval = function (env) {
  this.assert();
  return this.list[1].eval(env) > this.list[2].eval(env);
}

EMOLA.List.Greater.prototype.assert = function () {
}
