EMOLA.List.Defn = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Defn.prototype = new EMOLA.List();

EMOLA.List.Defn.prototype.eval = function (env) {
  this.assert();
  var symbol = this.list[1];
  var args = this.list[2];
  var exp = this.list[3];
  env.update(symbol.value, new EMOLA.Fn(args, exp, new EMOLA.DictEnv(env)));
  return null;
}

EMOLA.List.Defn.prototype.assert = function () {
  if (this.list.length !== 4) {
    throw new Error("InvalidArgumentException");
  }
}


