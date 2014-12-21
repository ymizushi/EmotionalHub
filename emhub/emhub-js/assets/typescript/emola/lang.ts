///<reference path="error.ts"/>
///<reference path="syntax_list.ts"/>
module emola {

  export interface Evalable {
    evalSyntax(env: Env);
  }

  export class Atom implements Evalable {
    type: string;
    value: string;

    // TODO: あとでenumでリファクタリング
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

    static isAtom(atom: Atom) {
      return atom instanceof Atom
    }

    static getAtoms():string[] {
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
      ];
    }

    static isAtomToken(token: string):boolean {
      return Atom.getAtoms().indexOf(token) >= 0
    }

    constructor(type: string, value: string=null) {
      this.type = type;
      this.value = value
    }

    equalToType(type: string) {
      return this.type === type
    }

    evalSyntax(env: Env) {
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
          var foundEnv:Env = env.findEnv(this.value);
          if (foundEnv) {
            var foundValue = foundEnv.get(this.value);
            if (foundValue.evalSyntax) {
              return foundValue.evalSyntax(env);
            } else {
              return foundValue;
            }
          } else {
            throw new InvalidTypeError('Target key of environment is not found.');
          }
          break;
        default:
          throw new InvalidTypeError('Unknown reserved word.');
      }
    }
  }

  export class Env {
    outer: Env;
    dict: {};

    constructor(outer: Env) {
      this.outer = outer;
      this.dict = {}
    }

    update(key: string, value: Evalable) {
      this.dict[key] = value
    }

    get(key: string): Evalable {
      return this.dict[key]
    }

    findEnv(key: string):Env {
      if (this.outer === null && !this.dict[key]) {
        throw new NotFoundError('symbol:' + key +  ' is not found in env.')
      }
      if (this.dict[key]) {
        return this;
      }
      return this.outer.findEnv(key)
    }
  }
  export class Fn implements Evalable {
    args: string[];
    expList: ExpList;
    env: Env;

    constructor(args: string[], expList:ExpList, env:Env) {
      this.args = args;
      this.expList = expList;
      this.env = env
    }
    
    evalSyntax(env: Env) {
      return this.expList.evalSyntax(this.env)
    }
  }

  export class Quote implements Evalable {
    list: any;
    env: Env;

    constructor(list) {
      this.list = list
    }
    
    evalSyntax(env) {
      this.env = env;
      return this
    }
    exec() {
      return this.list.evalSyntax(this.env)
    }
  }

  export class Node {
    parent: Node;
    children: any;
    token: any;

    constructor(parent) {
      this.parent = parent;
      this.children = [];
      this.token = null
    }
  }
}
