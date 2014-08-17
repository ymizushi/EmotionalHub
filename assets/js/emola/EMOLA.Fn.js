EMOLA.Fn = function (args, exp, env) {
  this.args = args;
  this.exp = exp;
  this.env = env;
};

EMOLA.Fn.prototype.exec = function (valueArgs, env) {
  for (var i=0;i<this.args.length;i++) {
    if (!this.env.dict[this.args[i].value]) {
      this.env.dict[this.args[i].value] = EMOLA.eval(valueArgs[i].value, this.env);
    } else {
      for (var attrName in this.env.dict) {
        env.dict[attrName] = this.env.dict[attrName];
      }
    }
  }
  return EMOLA.eval(this.exp, this.env);
};
