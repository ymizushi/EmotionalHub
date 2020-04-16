///<reference path="syntax_list.ts"/>

module emola {
  export class TreeSerializer {
    static serialize(graphExpList: GraphExpList) {
      var output =  '(';
      var expList = graphExpList.expList;
      for(var i in expList) {
        if (!(expList[i] instanceof Atom)) {
          output +=  TreeSerializer.serialize(expList[i]);
          continue;
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
