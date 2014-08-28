EMOLA.List.Mul = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Mul.prototype = new EMOLA.List();

EMOLA.List.Mul.prototype.eval = function (env) {
  this.assert();
  var sum = 1;
  for (var i=1; i<this.list.length; i++) {
    sum *= this.list[i].eval(env);
  }
  return sum;
}

EMOLA.List.Mul.prototype.assert = function () {
}
