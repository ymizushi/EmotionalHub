EMOLA.Quote = function (list) {
  this.list = list;
};

EMOLA.Quote.prototype.evalSyntax = function (env) {
  return this.list.evalSyntax(env);
}

EMOLA.Quote.prototype.assert = function () {
}
