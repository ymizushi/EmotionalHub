EMOLA.List.Var = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Var.prototype = new EMOLA.List();

EMOLA.List.Var.prototype.eval = function (env) {
  this.assert();
  var funcList = env.find(this.list[0].value).get(this.list[0].value);
  var func = funcList[0];
  var args = funcList[1];
  var realArgs = this.list.slice(2);

  for (var i=0;i<realArgs.length;i++) {
    func.env.dict[func.args[i].value] = realArgs[i].eval(this.env);
  }
  return func.eval(env);
}

EMOLA.List.Var.prototype.assert = function () {
}

