EMOLA.Atom = function (type, value) {
  this.type = type;
  this.value = value;
}

EMOLA.Atom.IF = 'if';
EMOLA.Atom.DO = 'do';
EMOLA.Atom.DEF = 'def';
EMOLA.Atom.FN = 'fn';

EMOLA.Atom.PLUS = '+';
EMOLA.Atom.MINUS = '-';
EMOLA.Atom.DIV = '/';
EMOLA.Atom.MUL = '*';
EMOLA.Atom.EQUAL = '=';
EMOLA.Atom.GREATER = '>';
EMOLA.Atom.LESS = '<';

EMOLA.Atom.VAR = 'var';
EMOLA.Atom.STR = 'str';
EMOLA.Atom.INT = 'int';

EMOLA.Atom.isAtom = function (atom) {
  if (atom instanceof EMOLA.Atom) {
    return true;
  } else {
    return false;
  }
};

EMOLA.Atom.prototype.equalToType = function (type) {
  if (this.type === type) {
    return true;
  } else {
    return false;
  }
};
