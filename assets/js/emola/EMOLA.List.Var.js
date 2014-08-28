EMOLA.List.Var = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Var.prototype = new EMOLA.List();

EMOLA.List.Var.prototype.eval = function (env) {
  this.assert();
  var func = env.find(this.list[0].value).get(this.list[0].value);
  var args = this.list.slice(1);

  for (var i=0;i<func.args.length;i++) {
    func.env.dict[func.args[i].value] = args[i].eval(this.env);
  }
  return func.exp.eval(func.env);
}

EMOLA.List.Var.prototype.assert = function () {
}

