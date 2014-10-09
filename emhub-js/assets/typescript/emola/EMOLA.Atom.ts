module EMOLA {
/* type */
    export class Atom {
        type:any
        value:any

        static FN = 'fn';
        static IF = 'if';
        static DEF = 'def';
        static DEFN = 'defn';
        static DO = 'do';
        static SEND = 'send';
        static VAR = 'var';
        static LET = 'let';
        static QUOTE = 'quote';
        static EVAL = 'evalSyntax';
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
        static type:any;
        static value:any;

        constructor(type=null, value=null) {
          this.type = type;
          this.value = value||null;
        }

        isAtom(atom:any) {
          return atom instanceof EMOLA.Atom;
        }

        static getAtoms() {
          return [
            this.FN,
            this.IF,
            this.DEF,
            this.DEFN,
            this.DO,
            this.SEND,
            this.LET,
            this.QUOTE,
            this.EVAL,
        
            this.PLUS,
            this.MINUS,
            this.DIV,
            this.MUL,
            this.EQUAL,
            this.GREATER,
            this.LESS,
            this.GREATEREQUAL,
            this.LESSEQUAL,
        
            this.DRAW,
            this.POINT,
            this.COLOR,
            this.CIRCLE,
            this.CLEAR
          ];
        }
        
        static isAtomToken(token) {
          return EMOLA.Atom.getAtoms().indexOf(token) >= 0;
        }
        
        equalToType (type) {
          return this.type === type;
        }
        
        evalSyntax(env) {
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
                var foundValue = env.find(this.value).get(this.value);
                if (foundValue.evalSyntax) {
                  return foundValue.evalSyntax(env);
                } else {
                  return foundValue;
                }
              } else {
                throw 'target key of environment is not found.';
              }
              break;
            default:
              console.log(this.type);
              // throw new EMOLA.Exception.InvalidTypeException();
          }
        }
    }
};
