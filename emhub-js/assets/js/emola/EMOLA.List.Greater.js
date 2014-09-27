EMOLA.List.Greater = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Greater.prototype = new EMOLA.List();

EMOLA.List.Greater.prototype.evalSyntax = function (env) {
  this.assert();
  return this.list[1].evalSyntax(env) > this.list[2].evalSyntax(env);
};

EMOLA.List.Greater.prototype.assert = function () {
};
