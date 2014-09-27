EMOLA.List.Greaterequal = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Greaterequal.prototype = new EMOLA.List();

EMOLA.List.Greaterequal.prototype.evalSyntax = function (env) {
  this.assert();
  return this.list[1].evalSyntax(env) >= this.list[2].evalSyntax(env);
};

EMOLA.List.Greaterequal.prototype.assert = function () {
};

