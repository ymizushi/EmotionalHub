EMOLA.eval = function (x, env) {
  if (x instanceof Array) {
    if (x[0].equalToType(EMOLA.Symbol.IF)) {
      var testExp = x[1];
      var thenExp = x[2];
      var elseExp = x[3];
      if (EMOLA.eval(testExp, env)) {
        return EMOLA.eval(thenExp, env);
      } 
      return EMOLA.eval(elseExp, env);
    } else if (x[0].equalToType(EMOLA.Symbol.DO)) {
      for(var i=1;i < x.length-1;++i) {
        EMOLA.eval(x[i], env);
      }
      return EMOLA.eval(x[x.length-1], env);
    } else if (x[0].equalToType(EMOLA.Symbol.DEF)) {
      var symbol = x[1];
      var value = x[2];
      env.dict[symbol.value] = EMOLA.eval(value, env);
    } else if (x[0].equalToType(EMOLA.Symbol.FN)) {
      var args =  x[1];
      var exp = x[2];
      return new EMOLA.Fn(args, exp, env);
    } else if (x[0].equalToType(EMOLA.Symbol.PLUS)) {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum += EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.MINUS)) {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum -= EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.MUL)) {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum *= EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.DIV)) {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum /= EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.EQUAL)) {
      return EMOLA.eval(x[1], env) == EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Symbol.LESS)) {
      return EMOLA.eval(x[1], env) < EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Symbol.VAR)) {
      func = env.find(x[0].value)[x[0].value];
      args = [];
      for (var i=1;i<x.length;i++) {
        args.push(x[i]);
      }
      return func.exec(args);
    }
  } else {
    if (!isNaN(Number(x))) {
      return Number(x); 
    } else if (typeof x === 'string') {
      return x; 
    } else if (x.equalToType(EMOLA.Symbol.INT)) {
      return Number(x.value);
    } else if (x.equalToType(EMOLA.Symbol.VAR)) {
      if (env.find(x.value)) {
        return EMOLA.eval(env.find(x.value)[x.value], env);
      } else {
        throw 'unknown error.';
      }
    } else if (x.equalToType(EMOLA.Symbol.STR)) {
      return x.value;
    }
  }
}

EMOLA.tokenize = function (inputStr) {
  return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(
    function (str) { return str ? true : false;
  }).map(
    function (ele) { return isNaN(parseInt(ele)) ? ele : parseInt(ele); }
  );
}

EMOLA.parse = function (tokens) {
  var env = [];
  for (var i=0;i<tokens.length;i++) {
    if (tokens[i] === '(') {
      var result = EMOLA.parse(tokens.slice(i+1));
      env.push(result[0]);
      i += result[1] + 1;
    } else if (tokens[i] === ')') {
      return [env, i];
    } else {
      env.push(EMOLA.atomize(tokens[i]));
    }
  }
  return env[0];
}

EMOLA.atomize = function (token) {
  switch (token) {
    case EMOLA.Symbol.IF:
      return new EMOLA.Symbol(EMOLA.Symbol.IF, null);
    case EMOLA.Symbol.DO:
      return new EMOLA.Symbol(EMOLA.Symbol.DO, null);
    case EMOLA.Symbol.DEF:
      return new EMOLA.Symbol(EMOLA.Symbol.DEF, null);
    case EMOLA.Symbol.FN:
      return new EMOLA.Symbol(EMOLA.Symbol.FN, null);
    case EMOLA.Symbol.PLUS:
      return new EMOLA.Symbol(EMOLA.Symbol.PLUS, null);
    case EMOLA.Symbol.MINUS:
      return new EMOLA.Symbol(EMOLA.Symbol.MINUS, null);
    case EMOLA.Symbol.DIV:
      return new EMOLA.Symbol(EMOLA.Symbol.DIV, null);
    case EMOLA.Symbol.MUL:
      return new EMOLA.Symbol(EMOLA.Symbol.MUL, null);
    case EMOLA.Symbol.EQUAL:
      return new EMOLA.Symbol(EMOLA.Symbol.EQUAL, null);
    case EMOLA.Symbol.GREATER:
      return new EMOLA.Symbol(EMOLA.Symbol.GREATER, null);
    case EMOLA.Symbol.LESS:
      return new EMOLA.Symbol(EMOLA.Symbol.LESS, null);
  }
  if (typeof token === 'string') {
    if (token[0] === '"' || token[0] === "'") {
      return  new EMOLA.Symbol(EMOLA.Symbol.STR, token.slice(1,-1));
    } else {
      return new EMOLA.Symbol(EMOLA.Symbol.VAR, token);
    }
  } else if (typeof token === 'number') {
      return new EMOLA.Symbol(EMOLA.Symbol.INT, token);
  } else {
    throw 'Unknown token';
    
  }
}
