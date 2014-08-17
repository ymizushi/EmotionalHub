EMOLA.Atom.Number = function (value) {
  this.value = value;
}

EMOLA.Atom.Number.prototype.eval = function (type) {
  return this.value;
}
