EMOLA.List.Circle = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Circle.prototype = new EMOLA.List();

EMOLA.List.Circle.prototype.evalSyntax = function (env) {
  this.assert();
  var point = this.list[1];
  var radius = this.list[2];
  var color = this.list[3];
  return new EMOLA.Circle(point.evalSyntax(env), radius.evalSyntax(env), color.evalSyntax(env));
}

EMOLA.List.Circle.prototype.assert = function () {
}



