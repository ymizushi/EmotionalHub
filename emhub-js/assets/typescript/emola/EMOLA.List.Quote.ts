EMOLA.List.Quote = function () {
  EMOLA.List.apply(this, arguments);
  this.listColor = new EMOLA.Color(0, 100, 0, 0.2);
}

EMOLA.List.Quote.prototype = new EMOLA.List();

EMOLA.List.Quote.prototype.eval = function (env) {
  this.assert();
  var list = this.list[1];
  return new EMOLA.Quote(list);
}

EMOLA.List.Quote.prototype.assert = function () {
  if (this.list[0].type !== EMOLA.Atom.QUOTE) {
    throw new Error("InvalidAtomTypeException");
  }
}


