EMOLA.List.Def = function () {
  EMOLA.List.apply(this, arguments);
  this.listColor = new EMOLA.Color(0, 255, 0, 0.2);
};

EMOLA.List.Def.prototype = new EMOLA.List();

EMOLA.List.Def.prototype.evalSyntax = function (env) {
  this.assert();
  var keyName = this.list[1].value;
  var value = this.list[2].evalSyntax(env);
  env.update(keyName, value);
  return null;
};

EMOLA.List.Def.prototype.assert = function () {
  if (this.list.length !== 3) {
    throw new Error("InvalidArgumentException");
  }
  if (this.list[1].type !== EMOLA.Atom.VAR) {
    throw new Error("InvalidAtomTypeException");
  }
};

