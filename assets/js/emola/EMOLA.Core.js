// TODO: 空白の含む文字列、括弧の含まれる文字列にも対応出来るようにしておく
EMOLA.tokenize = function (inputStr) {
  return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
    function (str) { return str ? true : false;
  }).map(
    function (ele) { return isNaN(parseInt(ele)) ? ele : parseInt(ele); }
  );
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

EMOLA.parse = function (tokenReader, parentList) {
  var syntaxList = [];
  while(true) {
    token = tokenReader.next();
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
      return EMOLA.List.create(syntaxList, parentList, point);
    } else if (token === null) {
      break;
    } else {
      syntaxList.push(EMOLA.atomize(token));
    }
  }
  return syntaxList[0];
}

EMOLA.parseAndEval = function (tokenReader, env) {
  if (!env) env = new EMOLA.DictEnv(null);
  var parsedList = EMOLA.parse(tokenReader);
  return parsedList.eval(env);
}

EMOLA.readAndEval = function (line, env) {
  EMOLA.Global.tokenReader.add(line);
  return EMOLA.parseAndEval(EMOLA.Global.tokenReader, env);
}
