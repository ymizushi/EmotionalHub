EMOHUB === undefined ? (throw "Not defined.")

EMOHUB.Symbol = function (str) {
  this.str = str;
};

EMOHUB.Symbol.prototype = {
  constructor: EMOHUB.Symbol
};

