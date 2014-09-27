EMOLA.List.Less = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Less.prototype = new EMOLA.List();

EMOLA.List.Less.prototype.evalSyntax = function (env) {
  this.assert();
  return this.list[1].evalSyntax(env) < this.list[2].evalSyntax(env);
}

EMOLA.List.Less.prototype.assert = function () {
}

