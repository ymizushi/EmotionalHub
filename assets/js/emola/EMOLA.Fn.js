EMOLA.Fn = function (args, exp, env) {
  this.args = args;
  this.exp = exp;
  this.env = env;
};

EMOLA.List.Fn.prototype.eval = function (env) {
  this.assert();
  return this.exp.eval(this.env);
}

EMOLA.List.Fn.prototype.assert = function () {
}
