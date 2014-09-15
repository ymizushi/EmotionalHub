EMOLA.List.Plus = function () {
  EMOLA.List.apply(this, arguments);
  this.listColor = new EMOLA.Color(255, 0, 0, 0.2);
};

EMOLA.List.Plus.prototype = new EMOLA.List();

EMOLA.List.Plus.prototype.eval = function (env) {
  this.assert();
  var sum = 0;
  for (var i=1; i<this.list.length;i++) {
    sum += this.list[i].eval(env);
  }
  return sum;
};

EMOLA.List.Plus.prototype.assert = function () {
};
