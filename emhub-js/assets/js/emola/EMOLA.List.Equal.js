EMOLA.List.Equal = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Equal.prototype = new EMOLA.List();

EMOLA.List.Equal.prototype.evalSyntax = function (env) {
  this.assert();
  return this.list[1].evalSyntax(env) === this.list[2].evalSyntax(env);
};

EMOLA.List.Equal.prototype.assert = function () {
};

