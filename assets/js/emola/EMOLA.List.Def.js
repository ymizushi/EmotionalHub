EMOLA.List.Def = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Def.prototype = new EMOLA.List();

EMOLA.List.Def.prototype.eval = function (env) {
  this.assert();
  var keyName = this.list[1].value;
  var value = this.list[2].eval(env);
  env.update(keyName, value);
  return null;
}

EMOLA.List.Def.prototype.assert = function () {
  if (this.list.length !== 3) {
    throw new Error("InvalidArgumentException");
  }
  if (this.list[1].type !== EMOLA.Atom.VAR) {
    throw new Error("InvalidAtomTypeException");
  }
}

