EMOLA.eval = function (x, env) {
  if (x instanceof Array) {
    if (x[0].equalToType(EMOLA.Atom.IF)) {
      var testExp = x[1];
      var thenExp = x[2];
      var elseExp = x[3];
      if (EMOLA.eval(testExp, env)) {
        return EMOLA.eval(thenExp, env);
      } 
      return EMOLA.eval(elseExp, env);
    } else if (x[0].equalToType(EMOLA.Atom.DO)) {
      for(var i=1;i < x.length-1;++i) {
        EMOLA.eval(x[i], env);
      }
      return EMOLA.eval(x[x.length-1], env);
    } else if (x[0].equalToType(EMOLA.Atom.DEF)) {
      var symbol = x[1];
      var value = x[2];
      env.update(symbol.value, EMOLA.eval(value, env));
    } else if (x[0].equalToType(EMOLA.Atom.FN)) {
      var args =  x[1];
      var exp = x[2];
      return new EMOLA.Fn(args, exp, env);
    } else if (x[0].equalToType(EMOLA.Atom.PLUS)) {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum += EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.MINUS)) {
      var sum = 0;
      for(var i=1;i < x.length;i++) {
        if (i === 1) {
          sum = EMOLA.eval(x[i], env);
        } else {
          sum -= EMOLA.eval(x[i], env);
        }
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.MUL)) {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum *= EMOLA.eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.DIV)) {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        if (i === 1) {
          sum = EMOLA.eval(x[i], env);
        } else {
          sum /= EMOLA.eval(x[i], env);
        }
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Atom.EQUAL)) {
      return EMOLA.eval(x[1], env) == EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Atom.LESS)) {
      return EMOLA.eval(x[1], env) < EMOLA.eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Atom.VAR)) {
      func = env.find(x[0].value).get(x[0].value);
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
    } else if (x.equalToType(EMOLA.Atom.INT)) {
      return Number(x.value);
    } else if (x.equalToType(EMOLA.Atom.VAR)) {
      if (env.find(x.value)) {
        return EMOLA.eval(env.find(x.value).get(x.value), env);
      } else {
        throw 'unknown error.';
      }
    } else if (x.equalToType(EMOLA.Atom.STR)) {
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
    case EMOLA.Atom.IF:
      return new EMOLA.Atom(EMOLA.Atom.IF, null);
    case EMOLA.Atom.DO:
      return new EMOLA.Atom(EMOLA.Atom.DO, null);
    case EMOLA.Atom.DEF:
      return new EMOLA.Atom(EMOLA.Atom.DEF, null);
    case EMOLA.Atom.FN:
      return new EMOLA.Atom(EMOLA.Atom.FN, null);
    case EMOLA.Atom.PLUS:
      return new EMOLA.Atom(EMOLA.Atom.PLUS, null);
    case EMOLA.Atom.MINUS:
      return new EMOLA.Atom(EMOLA.Atom.MINUS, null);
    case EMOLA.Atom.DIV:
      return new EMOLA.Atom(EMOLA.Atom.DIV, null);
    case EMOLA.Atom.MUL:
      return new EMOLA.Atom(EMOLA.Atom.MUL, null);
    case EMOLA.Atom.EQUAL:
      return new EMOLA.Atom(EMOLA.Atom.EQUAL, null);
    case EMOLA.Atom.GREATER:
      return new EMOLA.Atom(EMOLA.Atom.GREATER, null);
    case EMOLA.Atom.LESS:
      return new EMOLA.Atom(EMOLA.Atom.LESS, null);
  }
  if (typeof token === 'string') {
    if (token[0] === '"' || token[0] === "'") {
      return  new EMOLA.Atom(EMOLA.Atom.STR, token.slice(1,-1));
    } else {
      return new EMOLA.Atom(EMOLA.Atom.VAR, token);
    }
  } else if (typeof token === 'number') {
      return new EMOLA.Atom(EMOLA.Atom.INT, token);
  } else {
    throw 'Unknown token';
    
  }
}

EMOLA.readAndEval = function (str) {
  return EMOLA.eval(EMOLA.parse(EMOLA.tokenize(str)), new EMOLA.DictEnv(null));
}
