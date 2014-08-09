EMOLA.Atom = function (type, value) {
  this.type = type;
  this.value = value;
}

/* lang */ 
EMOLA.Atom.FN = 'fn';
EMOLA.Atom.IF = 'if';
EMOLA.Atom.DEF = 'def';
EMOLA.Atom.DO = 'do';
EMOLA.Atom.SEND = 'send';
EMOLA.Atom.VAR = 'var';

/* type */
EMOLA.Atom.TRUE = 'true';
EMOLA.Atom.FALSE = 'false';
EMOLA.Atom.STR = 'str';
EMOLA.Atom.INT = 'int';

/* math */
EMOLA.Atom.PLUS = '+';
EMOLA.Atom.MINUS = '-';
EMOLA.Atom.DIV = '/';
EMOLA.Atom.MUL = '*';
EMOLA.Atom.EQUAL = '=';
EMOLA.Atom.GREATER = '>';
EMOLA.Atom.LESS = '<';
EMOLA.Atom.GREATEREQUAL = '>=';
EMOLA.Atom.LESSEQUAL = '<=';

/* visual */
EMOLA.Atom.DRAW = 'draw';
EMOLA.Atom.POINT = 'point';
EMOLA.Atom.COLOR = 'color';
EMOLA.Atom.CIRCLE = 'circle';

EMOLA.Atom.isAtom = function (atom) {
  return atom instanceof EMOLA.Atom;
}

EMOLA.Atom.getAtoms = function () {
  return [
    EMOLA.Atom.FN,
    EMOLA.Atom.IF,
    EMOLA.Atom.DEF,
    EMOLA.Atom.DO,
    EMOLA.Atom.SEND,
    EMOLA.Atom.PLUS,
    EMOLA.Atom.MINUS,
    EMOLA.Atom.DIV,
    EMOLA.Atom.MUL,
    EMOLA.Atom.EQUAL,
    EMOLA.Atom.GREATER,
    EMOLA.Atom.LESS,
    EMOLA.Atom.GREATEREQUAL,
    EMOLA.Atom.LESSEQUAL,
    EMOLA.Atom.DRAW,
    EMOLA.Atom.POINT,
    EMOLA.Atom.COLOR,
    EMOLA.Atom.CIRCLE
  ]
}

EMOLA.Atom.isAtomToken = function (token) {
  return EMOLA.Atom.getAtoms().indexOf(token) >= 0;
}

EMOLA.Atom.prototype.equalToType = function (type) {
  return this.type === type;
}
