EMOLA.List.Minus = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Minus.prototype = new EMOLA.List();

EMOLA.List.Minus.prototype.eval = function (env) {
  this.assert();
  var sum = 0;
  for (var i=1;i < this.list.length;i++) {
    if (i === 1) {
      sum = this.list[i].eval(env);
    } else {
      sum -= this.list[i].eval(env);
    }
  }
  return sum;
}

EMOLA.List.Minus.prototype.assert = function () {
}
