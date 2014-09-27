EMOLA.List.Var = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Var.prototype = new EMOLA.List();

EMOLA.List.Var.prototype.evalSyntax = function (env) {
  this.assert();
  var func;
  if (this.list[0] instanceof EMOLA.List.Var) {
    func = this.list[0].evalSyntax(env);
  } else {
    func = env.find(this.list[0].value).get(this.list[0].value);
  }
  var realArgsList = this.list.slice(1);

  for (var i=0;i<realArgsList.length;i++) {
    func.env.dict[func.args[i].value] = realArgsList[i].evalSyntax(env); //valueをdirectに指定しているけど良くない
  }
  return func.evalSyntax(env);
};

EMOLA.List.Var.prototype.assert = function () {
};
