///<reference path="syntax_list.ts"/>

module emola {
  export class TreeSerializer {
    graphExpList: GraphExpList
    constructor(graphExpList: GraphExpList) {
      this.graphExpList = graphExpList;
    }

    serialize() {
      var output =  '(';
      var expList = this.graphExpList.expList;
      for(var i in expList) {
        if (expList[i] instanceof GraphExpList) {
          output += this.serialize();
        }
        if (Atom.isAtomToken(expList[i].type)) {
          output += expList[i].type;
        } else {
          output += expList[i].value;
        }
        output += ' ';
      }
      output += ')';
      return output;
    }
  }
}
