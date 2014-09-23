EMOLA.List.Send = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Send.prototype = new EMOLA.List();

EMOLA.List.Send.prototype.eval = function (env) {
  this.assert();
  var object = this.list[1].eval(env);
  var methodName = this.list[2].value;
  var args = this.list.slice(3).map(function (x) { return x.eval(env) });
  object[methodName].apply(object, args)
  return object;
}

EMOLA.List.Send.prototype.assert = function () {
}
