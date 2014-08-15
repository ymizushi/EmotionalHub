EMOLA.TokenReader = function () {
  this.tokenizedList = [];
}

EMOLA.TokenReader.prototype.add = function (line) {
  this.tokenizedList = this.tokenizedList.concat(EMOLA.tokenize(line));
}

EMOLA.TokenReader.prototype.next = function () {
  if (this.tokenizedList.length === 0) {
    return null;
  }
  return this.tokenizedList.shift();

}
