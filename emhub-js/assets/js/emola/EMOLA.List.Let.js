EMOLA.List.Let = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Let.prototype = new EMOLA.List();

// (let (x 1) (+ x 1 1))
EMOLA.List.Let.prototype.eval = function (env) {
  this.assert();
  var lets = this.list[1].list;
  var expList = this.list[2];
  var newEnv = new EMOLA.DictEnv(env);
  for (var i=0;i<lets.length;i=i+2) {
    newEnv.update(lets[i].value, lets[i+1].eval(newEnv));
  }
  return expList.eval(newEnv);
}

EMOLA.List.Let.prototype.assert = function () {
}

