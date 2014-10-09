// TODO: 空白の含む文字列、括弧の含まれる文字列にも対応出来るようにしておく
module EMOLA {
  export var tokenize = function (inputStr) {
    return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
      function (str) { return str ? true : false;
    }).map(
      function (ele) {
        var parsedFloat = parseFloat(ele);
        return isNaN(parsedFloat) ? ele : parsedFloat;
      }
    );
  };
  
  export var atomize = function (token) {
    if (token === EMOLA.Atom.TRUE) {
      return new EMOLA.Atom(EMOLA.Atom.TRUE);
    } else if (token === EMOLA.Atom.FALSE) {
      return new EMOLA.Atom(EMOLA.Atom.FALSE);
    } else if (typeof token === 'string') {
      if (token[0] === '"' || token[0] === "'") {
        return  new EMOLA.Atom(EMOLA.Atom.STR, token.slice(1,-1));
      } else if (EMOLA.Atom.isAtomToken(token)) {
        return  new EMOLA.Atom(token, null);
      }  else {
        return new EMOLA.Atom(EMOLA.Atom.VAR, token);
      }
    } else if (typeof token === 'number') {
        return new EMOLA.Atom(EMOLA.Atom.NUMBER, token);
    } else {
      throw 'Unknown token';
    }
  };
  
  export var parse = function (tokenReader, parentList=null) {
    var syntaxList = [];
    while(true) {
      var token = tokenReader.next();
      var point;
      if (!parentList) {
        var x = Math.random()*200;
        var y = Math.random()*200;
        point = new EMOLA.Point(Math.floor(x), Math.floor(y));
      } else {
        point = null;
      }
      if (token === '(') {
        syntaxList.push(parse(tokenReader, parentList));
      } else if (token === ')') {
        return createList(syntaxList, parentList, point);
      } else if (token === null) {
        break;
      } else {
        syntaxList.push(atomize(token));
      }
    }
    return syntaxList[0];
  };
  
  export var createList = function (syntaxList, parentList, point) {
    var firstList = syntaxList[0];
    var syntaxMap = {};
    /* lang */
    syntaxMap[EMOLA.Atom.FN] = EMOLA.List.Fn;
    syntaxMap[EMOLA.Atom.IF] = EMOLA.List.If;
    syntaxMap[EMOLA.Atom.DEF] = EMOLA.List.Def;
    syntaxMap[EMOLA.Atom.DEFN] = EMOLA.List.Defn;
    syntaxMap[EMOLA.Atom.DO] = EMOLA.List.Do;
    syntaxMap[EMOLA.Atom.SEND] = EMOLA.List.Send;
    syntaxMap[EMOLA.Atom.LET] = EMOLA.List.Let;
    syntaxMap[EMOLA.Atom.QUOTE] = EMOLA.List.Quote;
    syntaxMap[EMOLA.Atom.EVAL] = EMOLA.List.Eval;
  
    /* math */
    syntaxMap[EMOLA.Atom.PLUS] = EMOLA.List.Plus;
    syntaxMap[EMOLA.Atom.MINUS] = EMOLA.List.Minus;
    syntaxMap[EMOLA.Atom.DIV] = EMOLA.List.Div;
    syntaxMap[EMOLA.Atom.MUL] = EMOLA.List.Mul;
    syntaxMap[EMOLA.Atom.EQUAL] = EMOLA.List.Equal;
    syntaxMap[EMOLA.Atom.GREATER] = EMOLA.List.Greater;
    syntaxMap[EMOLA.Atom.LESS] = EMOLA.List.Less;
    syntaxMap[EMOLA.Atom.GREATEREQUAL] = EMOLA.List.Greaterequal;
    syntaxMap[EMOLA.Atom.LESSEQUAL] = EMOLA.List.Lessequal;
  
    /* graphic */
    syntaxMap[EMOLA.Atom.DRAW] = EMOLA.List.Draw;
    syntaxMap[EMOLA.Atom.POINT] = EMOLA.List.Point;
    syntaxMap[EMOLA.Atom.COLOR] = EMOLA.List.Color;
    syntaxMap[EMOLA.Atom.CIRCLE] = EMOLA.List.Circle;
    syntaxMap[EMOLA.Atom.CLEAR] = EMOLA.List.Clear;
  
    var TargetFunction = syntaxMap[firstList.type];
    if (!TargetFunction) {
      TargetFunction = EMOLA.List.Var;
    }
    return new TargetFunction(syntaxList, parentList, point);
  };
  
  export var parseAndEval = function (tokenReader, env) {
    if (!env) env = new EMOLA.DictEnv(null);
    var parsedList = parse(tokenReader);
    return parsedList.evalSyntax(env);
  };
  
  export var readAndEval = function (line, env) {
    EMOLA.Global.tokenReader.add(line);
    return parseAndEval(EMOLA.Global.tokenReader, env);
  };
  
  export var createContextWrapper = function (canvasId) {
    var canvas = <HTMLCanvasElement>document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) {
      return null;
    }
    return new EMOLA.ContextWrapper(canvas.getContext('2d'));
  }
}
