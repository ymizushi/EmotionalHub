EMOLA.List.Eval = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Eval.prototype = new EMOLA.List();

EMOLA.List.Eval.prototype.eval = function (env) {
  this.assert();
  if (this.list[1].type === EMOLA.Atom.VAR) {
    var value = this.list[1].value;
    var quote = env.find(value).get(value);
    return quote.eval(env);
  
  }
  return this.list[1].eval(env).eval(env);
}

EMOLA.List.Eval.prototype.assert = function () {
}

