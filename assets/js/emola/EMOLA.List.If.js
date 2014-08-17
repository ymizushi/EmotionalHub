EMOLA.List.If = function (list) {
  this.list = list;
};

EMOLA.List.If.prototype = new EMOLA.List();

EMOLA.List.If.prototype.eval = function (env) {
  this.assert();
  var testExp = this.list[1];
  var thenExp = this.list[2];
  var elseExp = this.list[3];
  if (testExp.eval(env)) {
    return thenExp.eval(env);
  } else {
    return elseExp.eval(env);
  }
}

EMOLA.List.If.prototype.assert = function () {
  if (this.list.length != 3) {
    throw "if: invalid argument";
  }
}
