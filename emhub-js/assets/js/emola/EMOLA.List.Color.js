EMOLA.List.Color = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Color.prototype = new EMOLA.List();

EMOLA.List.Color.prototype.evalSyntax = function (env) {
  this.assert();
  return new EMOLA.Color(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env), this.list[3].evalSyntax(env));
};

EMOLA.List.Color.prototype.assert = function () {
  if (this.list[1] === undefined || this.list[2] === undefined || this.list[3] === undefined || this.list.length > 4) {
    throw 'color arguments are illegal.';
  }
};

