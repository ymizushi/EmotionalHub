EMOLA.List.Fn = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Fn.prototype = new EMOLA.List();

EMOLA.List.Fn.prototype.eval = function (env) {
  var args = this.list[1].list; // directで見てる
  var expList = this.list[2];
  return new EMOLA.Fn(args, expList, env);
}

EMOLA.List.Fn.prototype.assert = function () {
}
