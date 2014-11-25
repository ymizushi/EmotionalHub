module emola {
  export class DictEnv {
    outer: DictEnv
    dict: {}

    constructor(outer: DictEnv) {
      this.outer = outer
      this.dict = {}
    }

    update(key: string, value: any):void {
      this.dict[key] = value
    }

    get(key: string):any {
      return this.dict[key]
    }

    find(key: string):any {
      if (this.outer === null && !this.dict[key]) {
        throw 'symbol:' + key +  ' is not defined.'
      }
      if (this.dict[key]) {
        return this
      }
      return this.outer.find(key)
    }
  }
  export class Fn {
    args: any
    expList: any
    env: any

    constructor(args, expList, env) {
      this.args = args
      this.expList = expList
      this.env = env
    }
    
    evalSyntax(env) {
      return this.expList.evalSyntax(this.env)
    }
  }

  export class Quote {
    list: any

    constructor(list) {
      this.list = list
    }
    
    evalSyntax(env: DictEnv) {
      return this.list.evalSyntax(env)
    }
  }

  export class Node {
    parent: Node
    children: any
    token: any

    constructor(parent) {
      this.parent = parent
      this.children = []
      this.token = null
    }
    
    addChildren(children) {
      this.children.push(children)
    }
  }

  export class Atom {
    type: string
    value: any

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
    static EVAL = 'evalSyntax';
    
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

    constructor(type: string, value=null) {
      this.type = type
      this.value = value
    }
    
    static isAtom(atom) {
      return atom instanceof Atom
    }
    
    static getAtoms() {
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
    
    static isAtomToken(token) {
      return Atom.getAtoms().indexOf(token) >= 0
    }
    
    equalToType(type) {
      return this.type === type
    }
    
    evalSyntax(env) {
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
          // throw new Exception.InvalidTypeException();
      }
    }
  }
}
