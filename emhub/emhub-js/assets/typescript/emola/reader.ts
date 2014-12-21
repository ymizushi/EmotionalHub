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
}