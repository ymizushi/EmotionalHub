EMOLA.Fn = function (args, expList, env) {
  this.args = args;
  this.expList = expList;
  this.env = env;
};

EMOLA.Fn.prototype.eval = function (env) {
  this.assert();
  return this.expList.eval(this.env);
}

EMOLA.Fn.prototype.assert = function () {
}
