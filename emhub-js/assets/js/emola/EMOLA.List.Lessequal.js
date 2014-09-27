EMOLA.List.Lessequal = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Lessequal.prototype = new EMOLA.List();

EMOLA.List.Lessequal.prototype.evalSyntax = function (env) {
  this.assert();
  return this.list[1].evalSyntax(env) <= this.list[2].evalSyntax(env);
};

EMOLA.List.Lessequal.prototype.assert = function () {
};

