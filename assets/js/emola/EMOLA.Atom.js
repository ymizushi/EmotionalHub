EMOLA.Atom = function (type, value) {
  this.type = type;
  this.value = value||null;
}

/* lang */ 
EMOLA.Atom.FN = 'fn';
EMOLA.Atom.IF = 'if';
EMOLA.Atom.DEF = 'def';
EMOLA.Atom.DEFN = 'defn';
EMOLA.Atom.DO = 'do';
EMOLA.Atom.SEND = 'send';
EMOLA.Atom.VAR = 'var';
EMOLA.Atom.LET = 'let';

/* type */
EMOLA.Atom.TRUE = 'true';
EMOLA.Atom.FALSE = 'false';
EMOLA.Atom.STR = 'str';
EMOLA.Atom.NUMBER = 'number';

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
EMOLA.Atom.CLEAR = 'clear';

EMOLA.Atom.isAtom = function (atom) {
  return atom instanceof EMOLA.Atom;
}

EMOLA.Atom.getAtoms = function () {
  return [
    EMOLA.Atom.FN,
    EMOLA.Atom.IF,
    EMOLA.Atom.DEF,
    EMOLA.Atom.DEFN,
    EMOLA.Atom.DO,
    EMOLA.Atom.SEND,
    EMOLA.Atom.LET,

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
    EMOLA.Atom.CIRCLE,
    EMOLA.Atom.CLEAR
  ]
}

EMOLA.Atom.isAtomToken = function (token) {
  return EMOLA.Atom.getAtoms().indexOf(token) >= 0;
}

EMOLA.Atom.prototype.equalToType = function (type) {
  return this.type === type;
}

EMOLA.Atom.prototype.eval = function (env) {
  switch (this.type) {
    case EMOLA.Atom.TRUE:
      return true;
    case EMOLA.Atom.FALSE:
      return false;
    case EMOLA.Atom.STR:
      return this.value;
    case EMOLA.Atom.NUMBER:
      return Number(this.value);
    case EMOLA.Atom.VAR:
      if (env.find(this.value)) {
        foundEnv = env.find(this.value);
        return foundEnv.get(this.value).eval(env);
      } else {
        throw 'target key of environment is not found.';
      }
    default:
      console.log(this.type);
      throw new EMOLA.Exception.InvalidTypeException();
  }
}
