// TODO: evalの実装ひどいのでなんとかしておく
EMOLA.eval = function (x, env) {
  if (x instanceof Array) {
    return EMOLA.evalList(x, env);
  } else {
    /* type */
    if (x === true) {
      return true;
    } else if (x === false) {
      return false;
    } else if (!isNaN(Number(x))) {
      return Number(x); 
    } else if (typeof x === 'string') {
      return x; 
    } else if (x instanceof EMOLA.Atom) {
      if (x.equalToType(EMOLA.Atom.NUMBER)) {
        return Number(x.value);
      } else if (x.equalToType(EMOLA.Atom.VAR)) {
        if (env.find(x.value)) {
          return EMOLA.eval(env.find(x.value).get(x.value), env);
        } else {
          throw 'target key of environment is not found.';
        }
      } else {
        return x.value;
      }
    }
    return x;
  }
}

EMOLA.evalList = function (x, env) {
  if (x[0] instanceof EMOLA.Atom) {
    if (x[0].equalToType(EMOLA.Atom.IF)) {
      var testExp = x[1];
      var thenExp = x[2];
      var elseExp = x[3];
      if (EMOLA.eval(testExp, env)) {
        return EMOLA.eval(thenExp, env);
      } 
      return EMOLA.eval(elseExp, env);
    } else if (x[0].equalToType(EMOLA.Atom.DO)) {
      var expList = x.slice(1);
      var result = expList.map(function (elem) { return EMOLA.eval(elem, env)});
      return result[result.length-1]; // 配列の最後の要素を取り出す
    } else if (x[0].equalToType(EMOLA.Atom.LET)) {
      var letList = x[1];
      var exp = x[2];
      var newEnv = new EMOLA.DictEnv(env);
      for (var i=0;i<letList.length;i=i+2) {
        newEnv.update(letList[i].value, EMOLA.eval(letList[i+1], env));
      }
      return EMOLA.eval(exp, newEnv);
    } else if (x[0].equalToType(EMOLA.Atom.DEF)) {
      var symbol = x[1];
      var value = x[2];
      env.update(symbol.value, EMOLA.eval(value, env));
      return null;
    } else if (x[0].equalToType(EMOLA.Atom.DEFN)) {
      var symbol = x[1];
      var args = x[2];
      var exp = x[3];
      env.update(symbol.value, new EMOLA.Fn(args, exp, new EMOLA.DictEnv(env)));
      return null;
    } else if (x[0].equalToType(EMOLA.Atom.SEND)) {
      var object = EMOLA.eval(x[1], env);
      var methodName = x[2].value;
      var args = x.slice(3).map(function (x) { return EMOLA.eval(x, env)});
      object[methodName].apply(object, args)
      return object;
    } else if (x[0].equalToType(EMOLA.Atom.FN)) {
      var args =  x[1];
      var exp = x[2];
      return new EMOLA.Fn(args, exp, new EMOLA.DictEnv(env));
    } else if (x[0].equalToType(EMOLA.Atom.VAR)) {
      var func = env.find(x[0].value).get(x[0].value);
      var args = x.slice(1);
      return func.exec(args, env);
    /* math */
    } else if (x[0].equalToType(EMOLA.Atom.PLUS)) {
      var sum = x.slice(1).reduce(
        function (previousValue, currentValue, index, array) {
          return EMOLA.eval(previousValue, env) + EMOLA.eval(currentValue, env);
        }
      );
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.MINUS)) {
      var sum = 0;
      for (var i=1;i < x.length;i++) {
        if (i === 1) {
          sum = EMOLA.eval(x[i], env);
        } else {
          sum -= EMOLA.eval(x[i], env);
        }
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.MUL)) {
      var sum = 1;
      for (var i=1;i < x.length;i++) {
        sum *= EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.DIV)) {
      var sum = 1;
      for (var i=1;i < x.length;i++) {
        if (i === 1) {
          sum = EMOLA.eval(x[i], env);
        } else {
          sum /= EMOLA.eval(x[i], env);
        }
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.EQUAL)) {
      return EMOLA.eval(x[1], env) === EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Atom.GREATER)) {
      return EMOLA.eval(x[1], env) > EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Atom.GREATEREQUAL)) {
      return EMOLA.eval(x[1], env) >= EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Atom.LESS)) {
      return EMOLA.eval(x[1], env) < EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Atom.LESSEQUAL)) {
      return EMOLA.eval(x[1], env) <= EMOLA.eval(x[2], env);
    /* point */
    } else if (x[0].equalToType(EMOLA.Atom.POINT)) {
      if (x[1] === undefined || x[2] === undefined || x.length > 3) {
        throw 'point arguments are illegal.';
      }
      return new EMOLA.Point(EMOLA.eval(x[1], env), EMOLA.eval(x[2], env));
    } else if (x[0].equalToType(EMOLA.Atom.COLOR)) {
      if (x[1] === undefined || x[2] === undefined || x[3] === undefined || x.length > 4) {
        throw 'color arguments are illegal.';
      }
      return new EMOLA.Color(EMOLA.eval(x[1], env), EMOLA.eval(x[2], env), EMOLA.eval(x[3], env));
    } else if (x[0].equalToType(EMOLA.Atom.CIRCLE)) {
      var point = x[1];
      var radius = x[2];
      var color = x[3];
      return new EMOLA.Circle(EMOLA.eval(point, env), EMOLA.eval(radius, env), EMOLA.eval(color, env));
    } else if (x[0].equalToType(EMOLA.Atom.DRAW)) {
      var figure = EMOLA.eval(x[1], env);
      figure.draw(EMOLA.Global.graphicContext);
      return figure;
    } else if (x[0].equalToType(EMOLA.Atom.CLEAR)) {
      EMOLA.Global.graphicContext.clear();
      return EMOLA.Global.graphicContext;
    } else {
      throw 'proper operator does not exist.';
    }
  } else if (x[0] instanceof Array){
      var func = EMOLA.eval(x[0], env);
      var args = x[0].slice(1);
      return func.exec(args, env);
  };
}

// TODO: 空白の含む文字列、括弧の含まれる文字列にも対応出来るようにしておく
EMOLA.tokenize = function (inputStr) {
  return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
    function (str) { return str ? true : false;
  }).map(
    function (ele) { return isNaN(parseInt(ele)) ? ele : parseInt(ele); }
  );
}

EMOLA.parse = function (tokenReader) {
  var syntaxList = [];
  while(true) {
    token = tokenReader.next();
    if (token === '(') {
      syntaxList.push(EMOLA.parse(tokenReader));
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

EMOLA.createListTypeObject = function (syntaxList) {
  var firstList = syntaxList[0];
  var syntaxMap = {};
  syntaxMap[EMOLA.Atom.DEF] = EMOLA.List.Def;
  syntaxMap[EMOLA.Atom.DO] = EMOLA.List.Do;
  syntaxMap[EMOLA.Atom.FN] = EMOLA.List.Fn;
  syntaxMap[EMOLA.Atom.IF] = EMOLA.List.If;
  syntaxMap[EMOLA.Atom.MINUS] = EMOLA.List.Minus;
  syntaxMap[EMOLA.Atom.PLUS] = EMOLA.List.Plus;
  var targetFunction = syntaxMap[firstList.type];
  return new targetFunction(syntaxList);
}

EMOLA.parseAno = function (tokenReader) {
  var syntaxList = [];
  while(true) {
    token = tokenReader.next();
    if (token === '(') {
      syntaxList.push(EMOLA.parse(parseAno));
    } else if (token === ')') {
      return EMOLA.createListTypeObject(syntaxList);
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
    return true;
  } else if (token === EMOLA.Atom.FALSE) {
    return false;
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
  return EMOLA.eval(EMOLA.parse(tokenReader), env);
}

EMOLA.readAndEval = function (line, env) {
  EMOLA.Global.tokenReader.add(line);
  return EMOLA.parseAndEval(EMOLA.Global.tokenReader, env);
}

EMOLA.readAndEvalForDrawing = function (line) {
  env = new EMOLA.DictEnv(null);
  var tokenReader = new EMOLA.TokenReader(line);
  var syntaxList = EMOLA.parse(tokenReader)
  var drawingList = EMOLA.convertSyntaxListForDrawing(syntaxList, null);
  drawingList.draw(EMOLA.Global.graphicContext);
}
