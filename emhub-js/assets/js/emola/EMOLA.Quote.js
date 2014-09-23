EMOLA.Quote = function (list) {
  this.list = list;
};

EMOLA.Quote.prototype.eval = function (env) {
  return this.list.eval(env);
}

EMOLA.Quote.prototype.assert = function () {
}
