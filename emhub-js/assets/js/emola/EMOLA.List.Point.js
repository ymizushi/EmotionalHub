EMOLA.List.Point = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Point.prototype = new EMOLA.List();

EMOLA.List.Point.prototype.evalSyntax = function (env) {
  this.assert();
  return new EMOLA.Point(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env));
}

EMOLA.List.Point.prototype.assert = function () {
  if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
    throw 'point arguments are illegal.';
  }
}

