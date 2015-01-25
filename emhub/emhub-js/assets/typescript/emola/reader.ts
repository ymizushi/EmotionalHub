///<reference path="emola.ts"/>

module emola {
  export class TokenReader {
    tokenizedList: string[]

    constructor(line: string = "") {
      this.tokenizedList = [];
      if (line != "") {
        this.add(line)
      }
    }

    add(line: string) {
      this.tokenizedList = this.tokenizedList.concat(Tokenizer.tokenize(line))
    }

    next(): string {
      if (this.tokenizedList.length === 0) {
        return null
      }
      return this.tokenizedList.shift()
    }
  }

  export class Tokenizer {
    static tokenize(inputStr) {
      return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ')
        .filter(str => str ? true : false )
        .map(ele => {
          var parsedFloat = parseFloat(ele);
          return isNaN(parsedFloat) ? ele : parsedFloat
        }
      )
    }

    static tokenize2(inputStr) {
      var re = /^[()]|^[^()]+[^\S]$|"[\S\s]*"/;
    }
  }

  export class Atomizer {
    static atomize(token) {
      if (token === AtomType.TRUE) {
        return new Atom(AtomType.TRUE);
      } else if (token === AtomType.FALSE) {
        return new Atom(AtomType.FALSE);
      } else if (typeof token === 'number') {
        return new Atom(AtomType.NUMBER, token);
      } else if (typeof token === 'string') {
        if (token[0] === '"' || token[0] === "'") {
          return new Atom(AtomType.STR, token.slice(1, -1));
        } else if (Atom.isAtomToken(token)) {
          return new Atom(token, null);
        } else {
          return new Atom(AtomType.VAR, token);
        }
      }

      throw new UnknownTokenError("Couldn't find the token in AtomType.");
    }
  }

  export class Parser {
    static parse(tokenReader: TokenReader, parentList:GraphExpList = null) {
      var syntaxList = [];
      while (true) {
        var token: string = tokenReader.next();
        if (token === '(') {
          syntaxList.push(Parser.parse(tokenReader, parentList));
        } else if (token === ')') {
          return ExpList.create(syntaxList, parentList);
        } else if (token === null) {
          break;
        } else {
          syntaxList.push(Atomizer.atomize(token));
        }
      }
      return syntaxList[0];
    }

    static parseAndEval(tokenReader: TokenReader, env=null) {
      if (!env) env = new emola.Env(null);
      var parsedList = Parser.parse(tokenReader);
      return parsedList.evalSyntax(env);
    }

    static readAndEval(tokenReader: TokenReader, line: string, env: Env) {
      tokenReader.add(line);
      return Parser.parseAndEval(tokenReader, env);
    }
  }
}