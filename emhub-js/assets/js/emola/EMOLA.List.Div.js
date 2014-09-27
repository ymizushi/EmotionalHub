EMOLA.List.Div = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Div.prototype = new EMOLA.List();

EMOLA.List.Div.prototype.evalSyntax = function (env) {
  this.assert();
  var sum = 1;
  for (var i=1;i < this.list.length;i++) {
    if (i === 1) {
      sum = this.list[i].evalSyntax(env);
    } else {
      sum /= this.list[i].evalSyntax(env);
    }
  }
  return sum;
}

EMOLA.List.Div.prototype.assert = function () {
}

