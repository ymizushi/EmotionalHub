EMOLA.List.Circle = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Circle.prototype = new EMOLA.List();

EMOLA.List.Circle.prototype.eval = function (env) {
  this.assert();
  var point = this.list[1];
  var radius = this.list[2];
  var color = this.list[3];
  return new EMOLA.Circle(point.eval(env), radius.eval(env), color.eval(env));
}

EMOLA.List.Circle.prototype.assert = function () {
}



