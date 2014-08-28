EMOLA.List.Var = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Var.prototype = new EMOLA.List();

EMOLA.List.Var.prototype.eval = function (env) {
  this.assert();
  var func = env.find(this.list[0].value).get(this.list[0].value);
  var realArgsList = this.list.slice(1);

  for (var i=0;i<realArgsList.length;i++) {
    func.env.dict[func.args[i].value] = realArgsList[i].eval(env); //valueをdirectに指定しているけど良くない
  }
  return func.eval(env);
}

EMOLA.List.Var.prototype.assert = function () {
}
