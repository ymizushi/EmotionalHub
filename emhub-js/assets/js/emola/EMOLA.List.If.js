EMOLA.List.If = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.If.prototype = new EMOLA.List();

EMOLA.List.If.prototype.evalSyntax = function (env) {
  this.assert();
  var testExp = this.list[1];
  var thenExp = this.list[2];
  var elseExp = this.list[3];
  if (testExp.evalSyntax(env)) {
    return thenExp.evalSyntax(env);
  } else {
    return elseExp.evalSyntax(env);
  }
}

EMOLA.List.If.prototype.assert = function () {
  if (this.list.length !== 4) {
    throw new Error("InvalidArgumentException");
  }
}
