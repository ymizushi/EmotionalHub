EMOLA.List.Less = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Less.prototype = new EMOLA.List();

EMOLA.List.Less.prototype.eval = function (env) {
  this.assert();
  return this.list[1].eval(env) < this.list[2].eval(env);
}

EMOLA.List.Less.prototype.assert = function () {
}

