// TODO: 空白の含む文字列、括弧の含まれる文字列にも対応出来るようにしておく
EMOLA.tokenize = function (inputStr) {
  return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
    function (str) { return str ? true : false;
  }).map(
    function (ele) {
      var parsedFloat = parseFloat(ele);
      return isNaN(parsedFloat) ? ele : parsedFloat;
    }
  );
};

EMOLA.atomize = function (token) {
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

EMOLA.parse = function (tokenReader, parentList) {
  var syntaxList = [];
  while(true) {
    var token = tokenReader.next();
    var point;
    if (!parentList) {
      var x = Math.random()*200;
      var y = Math.random()*200;
      point = new EMOLA.Point(parseInt(x), parseInt(y));
    } else {
      point = null;
    }
    if (token === '(') {
      syntaxList.push(EMOLA.parse(tokenReader, parentList));
    } else if (token === ')') {
      return EMOLA.createList(syntaxList, parentList, point);
    } else if (token === null) {
      break;
    } else {
      syntaxList.push(EMOLA.atomize(token));
    }
  }
  return syntaxList[0];
};

EMOLA.createList = function (syntaxList, parentList, point) {
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

  var targetFunction = syntaxMap[firstList.type];
  if (!targetFunction) {
    targetFunction = EMOLA.List.Var;
  }
  return new targetFunction(syntaxList, parentList, point);
};

EMOLA.parseAndEval = function (tokenReader, env) {
  if (!env) env = new EMOLA.DictEnv(null);
  var parsedList = EMOLA.parse(tokenReader);
  return parsedList.evalSyntax(env);
};

EMOLA.readAndEval = function (line, env) {
  EMOLA.Global.tokenReader.add(line);
  return EMOLA.parseAndEval(EMOLA.Global.tokenReader, env);
};
