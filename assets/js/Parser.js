EMOHUB === undefined ? (throw "Not defined.")

EMOHUB.Parser = function (symboleList) {
  this.symboleList = symboleList;
};

EMOHUB.Parser.prototype = {
  constructor: EMOHUB.Parser,

  parse : function (x, env) {
    if (typeof x == 'Symbol') {
      return env.find(x)[x];
    } else if () {

    }
  },

  isa : function (x, symbole) {

  }
};

