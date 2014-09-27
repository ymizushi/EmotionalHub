EMOLA.Fn = function (args, expList, env) {
  this.args = args;
  this.expList = expList;
  this.env = env;
};

EMOLA.Fn.prototype.evalSyntax = function (env) {
  this.assert();
  return this.expList.evalSyntax(this.env);
}

EMOLA.Fn.prototype.assert = function () {
}
