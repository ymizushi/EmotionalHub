EMOLA.List.Mul = function () {
  EMOLA.List.apply(this, arguments);
  this.listColor = new EMOLA.Color(0, 200, 50, 0.2);
}

EMOLA.List.Mul.prototype = new EMOLA.List();

EMOLA.List.Mul.prototype.evalSyntax = function (env) {
  this.assert();
  var sum = 1;
  for (var i=1; i<this.list.length; i++) {
    sum *= this.list[i].evalSyntax(env);
  }
  return sum;
}

EMOLA.List.Mul.prototype.assert = function () {
}
