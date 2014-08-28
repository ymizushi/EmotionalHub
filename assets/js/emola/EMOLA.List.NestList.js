EMOLA.List.NestList = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.NestList.prototype = new EMOLA.List();

EMOLA.List.NestList.prototype.eval = function (env) {
  this.assert();
  var func = this.list[0].eval(env);
  var args = this.list[0].slice(1);
  return func.exec(args, env);
}

EMOLA.List.NestList.prototype.assert = function () {
}

