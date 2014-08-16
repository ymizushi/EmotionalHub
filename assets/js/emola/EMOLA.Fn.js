EMOLA.Fn = function (args, exp, env) {
  this.args = args;
  this.exp = exp;
  this.env = env;
};

EMOLA.Fn.prototype.exec = function (valueArgs) {
  for (var i=0;i<this.args.length;i++) {
    this.env.dict[this.args[i].value] = EMOLA.eval(valueArgs[i].value, this.env);
  }
  return EMOLA.eval(this.exp, this.env);
};
