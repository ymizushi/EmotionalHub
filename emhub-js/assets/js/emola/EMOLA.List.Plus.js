EMOLA.List.Plus = function () {
  EMOLA.List.apply(this, arguments);
  this.listColor = new EMOLA.Color(255, 0, 0, 0.2);
};

EMOLA.List.Plus.prototype = new EMOLA.List();

EMOLA.List.Plus.prototype.evalSyntax = function (env) {
  this.assert();
  var sum = 0;
  for (var i=1; i<this.list.length;i++) {
    sum += this.list[i].evalSyntax(env);
  }
  return sum;
};

EMOLA.List.Plus.prototype.assert = function () {
};
