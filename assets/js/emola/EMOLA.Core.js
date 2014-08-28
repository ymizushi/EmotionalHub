// TODO: 空白の含む文字列、括弧の含まれる文字列にも対応出来るようにしておく
EMOLA.tokenize = function (inputStr) {
  return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
    function (str) { return str ? true : false;
  }).map(
    function (ele) { return isNaN(parseInt(ele)) ? ele : parseInt(ele); }
  );
}

EMOLA.parseLegacy = function (tokenReader) {
  var syntaxList = [];
  while(true) {
    token = tokenReader.next();
    if (token === '(') {
      syntaxList.push(EMOLA.parseLegacy(tokenReader));
    } else if (token === ')') {
      return syntaxList;
    } else if (token === null) {
      break;
    } else {
      syntaxList.push(EMOLA.atomize(token));
    }
  }
  return syntaxList[0];
}

EMOLA.parse = function (tokenReader) {
  var syntaxList = [];
  while(true) {
    token = tokenReader.next();
    if (token === '(') {
      syntaxList.push(EMOLA.parse(tokenReader));
    } else if (token === ')') {
      return EMOLA.List.create(syntaxList);
    } else if (token === null) {
      break;
    } else {
      syntaxList.push(EMOLA.atomize(token));
    }
  }
  return syntaxList[0];
}

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
}
EMOLA.convertSyntaxListForDrawing = function (syntaxList, parentList) {
  var point;
  if (!parentList) {
    point = new EMOLA.Point(200, 200);
  } else {
    point = null;
  }
  var children = new EMOLA.List([], parentList, point);
  for (var i=0;i<syntaxList.length;i++) {
    if (syntaxList[i] instanceof Array) {
      var result = EMOLA.convertSyntaxListForDrawing(syntaxList[i], parentList);
      children.push(result);
    } else {
      children.push(syntaxList[i]);
    }
  }
  return children;
}

EMOLA.parseAndEval = function (tokenReader, env) {
  if (!env) env = new EMOLA.DictEnv(null);
  return EMOLA.parse(tokenReader).eval(env);
}

EMOLA.readAndEval = function (line, env) {
  EMOLA.Global.tokenReader.add(line);
  return EMOLA.parseAndEval(EMOLA.Global.tokenReader, env);
}

EMOLA.readAndEvalForDrawing = function (line) {
  env = new EMOLA.DictEnv(null);
  var tokenReader = new EMOLA.TokenReader(line);
  var syntaxList = EMOLA.parseLegacy(tokenReader)
  var drawingList = EMOLA.convertSyntaxListForDrawing(syntaxList, null);
  drawingList.draw(EMOLA.Global.graphicContext);
}
