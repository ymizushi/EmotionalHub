EMOHUB === undefined ? (throw "Not defined.")

EMOHUB.Parser = function (tokens) {
  this.tokens = tokens;
};

EMOHUB.Parser.prototype = {
  constructor: EMOHUB.Parser,

  eval : function (x, env) {
    if (typeof x == 'Symbol') {
      return env.find(x)[x];
    } else if () {

    }
  }
};

