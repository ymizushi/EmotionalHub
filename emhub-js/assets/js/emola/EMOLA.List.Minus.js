EMOLA.List.Minus = function () {
  EMOLA.List.apply(this, arguments);
  this.listColor = new EMOLA.Color(50, 0, 0, 0.2);
};

EMOLA.List.Minus.prototype = new EMOLA.List();

EMOLA.List.Minus.prototype.evalSyntax = function (env) {
  this.assert();
  var sum = 0;
  for (var i=1;i < this.list.length;i++) {
    if (i === 1) {
      sum = this.list[i].evalSyntax(env);
    } else {
      sum -= this.list[i].evalSyntax(env);
    }
  }
  return sum;
};

EMOLA.List.Minus.prototype.assert = function () {
};
