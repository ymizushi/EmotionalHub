EMOLA.List.Point = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Point.prototype = new EMOLA.List();

EMOLA.List.Point.prototype.eval = function (env) {
  this.assert();
  return new EMOLA.Point(this.list[1].eval(env), this.list[2].eval(env));
}

EMOLA.List.Point.prototype.assert = function () {
  if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
    throw 'point arguments are illegal.';
  }
}

