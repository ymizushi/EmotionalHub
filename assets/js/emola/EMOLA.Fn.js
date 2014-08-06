EMOLA.Fn = function (args, exp, outer) {
  this.args = args;
  this.exp = exp;
  this.outer = outer;
};

EMOLA.Fn.prototype.exec = function (valueArgs) {
  var dictEnv = new EMOLA.DictEnv(this.outer);
  for (var i=0;i<this.args.length;i++) {
    dictEnv.dict[this.args[i].value] = valueArgs[i];
  }
  return EMOLA.eval(this.exp, dictEnv);
};
