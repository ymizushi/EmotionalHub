EMOLA.List.Defn = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Defn.prototype = new EMOLA.List();

// (defn hoge (x y) (+ x y))
EMOLA.List.Defn.prototype.eval = function (env) {
  this.assert();
  var symbol = this.list[1];
  var args = this.list[2].list;
  var expList = this.list[3];
  env.update(symbol.value, new EMOLA.Fn(args, expList, new EMOLA.DictEnv(env)));
  return null;
}

EMOLA.List.Defn.prototype.assert = function () {
  if (this.list.length !== 4) {
    throw new Error("InvalidArgumentException");
  }
}
