EMOLA.Symbol = function (type, value) {
  this.type = type;
  this.value = value;
}

EMOLA.Symbol.IF = 'if';
EMOLA.Symbol.DO = 'do';
EMOLA.Symbol.DEF = 'def';
EMOLA.Symbol.FN = 'fn';

EMOLA.Symbol.PLUS = '+';
EMOLA.Symbol.MINUS = '-';
EMOLA.Symbol.DIV = '/';
EMOLA.Symbol.MUL = '*';
EMOLA.Symbol.EQUAL = '=';
EMOLA.Symbol.GREATER = '>';
EMOLA.Symbol.LESS = '<';

EMOLA.Symbol.VAR = 'var';
EMOLA.Symbol.STR = 'str';
EMOLA.Symbol.INT = 'int';

EMOLA.Symbol.isSymbol = function (symbol) {
  if (symbol instanceof EMOLA.Symbol) {
    return true;
  } else {
    return false;
  }
};

EMOLA.Symbol.prototype.equalToType = function (type) {
  if (this.type === type) {
    return true;
  } else {
    return false;
  }
};
