module EMOLA {
  export class Atom {
    /* lang */ 
    static FN = 'fn';
    static IF = 'if';
    static DEF = 'def';
    static DEFN = 'defn';
    static DO = 'do';
    static SEND = 'send';
    static VAR = 'var';
    static LET = 'let';
    static QUOTE = 'quote';
    static EVAL = 'eval';
    
    /* type */
    static TRUE = 'true';
    static FALSE = 'false';
    static STR = 'str';
    static NUMBER = 'number';
    
    /* math */
    static PLUS = '+';
    static MINUS = '-';
    static DIV = '/';
    static MUL = '*';
    static EQUAL = '=';
    static GREATER = '>';
    static LESS = '<';
    static GREATEREQUAL = '>=';
    static LESSEQUAL = '<=';
    
    /* visual */
    static DRAW = 'draw';
    static POINT = 'point';
    static COLOR = 'color';
    static CIRCLE = 'circle';
    static CLEAR = 'clear';

    type: string;
    value: any;
    constructor (type, value) {
      this.type = type;
      this.value = value;
    }
    isAtom(atom: any): boolean {
        return atom instanceof Atom;
    }

    getAtoms():string[] {
      return [
        Atom.FN,
        Atom.IF,
        Atom.DEF,
        Atom.DEFN,
        Atom.DO,
        Atom.SEND,
        Atom.LET,
        Atom.QUOTE,
        Atom.EVAL,
    
        Atom.PLUS,
        Atom.MINUS,
        Atom.DIV,
        Atom.MUL,
        Atom.EQUAL,
        Atom.GREATER,
        Atom.LESS,
        Atom.GREATEREQUAL,
        Atom.LESSEQUAL,
    
        Atom.DRAW,
        Atom.POINT,
        Atom.COLOR,
        Atom.CIRCLE,
        Atom.CLEAR
      ]
    }

    isAtomToken(token: string): boolean {
      return this.getAtoms().indexOf(token) >= 0;
    }

    equalToType(type: string):boolean {
      return this.type === type;
    }

    eval(env: any): any {
      switch (this.type) {
        case Atom.TRUE:
          return true;
        case Atom.FALSE:
          return false;
        case Atom.STR:
          return this.value;
        case Atom.NUMBER:
          return Number(this.value);
        case Atom.VAR:
          if (env.find(this.value)) {
            var foundValue = env.find(this.value).get(this.value);
            if (foundValue.eval) {
              return foundValue.eval(env);
            } else {
              return foundValue;
            }
          } else {
            throw 'target key of environment is not found.';
          }
        default:
          console.log(this.type);
      }
    }
  }
}
