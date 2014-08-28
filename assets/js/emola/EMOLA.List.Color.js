EMOLA.List.Color = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Color.prototype = new EMOLA.List();

EMOLA.List.Color.prototype.eval = function (env) {
  this.assert();
  return new EMOLA.Color(this.list[1].eval(env), this.list[2].eval(env), this.list[3].eval(env));
}

EMOLA.List.Color.prototype.assert = function () {
  if (x[1] === undefined || x[2] === undefined || x[3] === undefined || x.length > 4) {
    throw 'color arguments are illegal.';
  }
}


