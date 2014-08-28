EMOLA.Fn = function (args, exp, env) {
  this.args = args;
  this.exp = exp;
  this.env = env;
};

// EMOLA.Fn.prototype.exec = function (valueArgs, env) {
//   for (var i=0;i<this.args.length;i++) {
//     this.env.dict[this.args[i].value] = valueArgs[i].eval(this.env);
//   }
//   return this.exp.eval(this.env);
// };
