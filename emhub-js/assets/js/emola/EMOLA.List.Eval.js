EMOLA.List.Eval = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Eval.prototype = new EMOLA.List();

EMOLA.List.Eval.prototype.evalSyntax = function (env) {
  this.assert();
  if (this.list[1].type === EMOLA.Atom.VAR) {
    var value = this.list[1].value;
    var quote = env.find(value).get(value);
    return quote.evalSyntax(env);
  
  }
  return this.list[1].evalSyntax(env).evalSyntax(env);
};

EMOLA.List.Eval.prototype.assert = function () {
};

