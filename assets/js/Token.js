EMOHUB === undefined ? (throw "Not defined.")

EMOHUB.Token = function (type, input) {
  this.type = type;
  this.input = input;
};

EMOHUB.Token.prototype = {
  constructor: EMOHUB.Token
};
