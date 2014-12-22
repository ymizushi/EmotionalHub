///<reference path="emola.ts"/>

module emola {
  export class TokenReader {
    tokenizedList: any[]

    constructor(line: string = "") {
      this.tokenizedList = []
      if (line != "") {
        this.add(line)
      }
    }

    add(line: string) {
      this.tokenizedList = this.tokenizedList.concat(Tokenizer.tokenize(line))
    }

    next(): any {
      if (this.tokenizedList.length === 0) {
        return null
      }
      return this.tokenizedList.shift()
    }
  }

  export class Tokenizer {
    static tokenize(inputStr: string) {
      return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ')
        .filter(str => str ? true : false )
        .map(ele => {
          var parsedFloat = parseFloat(ele)
          return isNaN(parsedFloat) ? ele : parsedFloat
        }
      )
    }
  }

  export class Atomizer {
    static atomize(token) {
      if (token === Atom.TRUE) {
        return new Atom(Atom.TRUE);
      } else if (token === Atom.FALSE) {
        return new Atom(Atom.FALSE);
      } else if (typeof token === 'string') {
        if (token[0] === '"' || token[0] === "'") {
          return new Atom(Atom.STR, token.slice(1, -1));
        } else if (Atom.isAtomToken(token)) {
          return new Atom(token, null);
        } else {
          return new Atom(Atom.VAR, token);
        }
      } else if (typeof token === 'number') {
        return new Atom(Atom.NUMBER, token);
      } else {
        throw 'Unknown token';
      }
    }
  }

}