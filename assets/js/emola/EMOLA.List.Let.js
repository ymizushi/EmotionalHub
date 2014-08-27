EMOLA.List.Let = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Let.prototype = new EMOLA.List();

EMOLA.List.Let.prototype.eval = function (env) {
  this.assert();
  var letList = this.list[1];
  var exp = this.list[2];
  var newEnv = new EMOLA.DictEnv(env);
  for (var i=0;i<letList.length;i=i+2) {
    newEnv.update(letList[i].value, letList[i+1].eval(env));
  }
  return exp.eval(env);
}

EMOLA.List.Let.prototype.assert = function () {
}

