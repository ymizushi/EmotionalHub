var EMOLA = { REVISION: '0.0.1'};

EMOLA.DictEnv = function (outer) {
  this.outer = outer;
  this.dict = {};
};

EMOLA.DictEnv.prototype.find = function (key) {
  if (this.outer === null && !this.dict[key]) {
    throw 'symbol is not defined.'
  }
  if (this.dict[key]) {
    return this.dict;
  }
  return this.outer.find(key);
};

EMOLA.Fn = function (args, exp, outer) {
  this.args = args;
  this.exp = exp;
  this.outer = outer;
};

EMOLA.Fn.prototype.exec = function (valueArgs) {
  var dictEnv = new EMOLA.DictEnv(this.outer);
  for (var i=0;i<this.args.length;i++) {
    dictEnv.dict[this.args[i]] = valueArgs[i];
  }
  return ev(this.exp, dictEnv);
};


EMOLA.Symbol = function (str, type, value) {
  this.str = str;
  this.type = type;
}

function ev(x, env) {
  if (x instanceof Array) {
    if (x[0] === 'if') {
      var testExp = x[1];
      var thenExp = x[2];
      var elseExp = x[3];
      if (ev(testExp, env)) {
        return ev(thenExp, env);
      } 
      return ev(elseExp, env);
    } else if (x[0] == 'do') {
      for(var i=1;i < x.length-1;++i) {
        ev(x[i], env);
      }
      return ev(x[x.length-1], env);
    } else if (x[0] == 'def') {
      var symbol = x[1];
      var value = x[2];
      env.dict[symbol] = ev(value, env);
    } else if (x[0] == 'fn') {
      var args =  x[1];
      var exp = x[2];
      return new EMOLA.Fn(args, exp, env);
    } else if (x[0] == '+') {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum += ev(x[i], env);
      }
      return sum;
    } else if (x[0] == '-') {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum -= ev(x[i], env);
      }
      return sum;
    } else if (x[0] == '*') {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum *= ev(x[i], env);
      }
      return sum;
    } else if (x[0] == '/') {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum /= ev(x[i], env);
      }
      return sum;
    } else if (x[0] == '=') {
      return ev(x[1], env) == ev(x[2], env);
    } else if (x[0] == '<') {
      return ev(x[1], env) < ev(x[2], env);
    } else if (typeof(x[0]) == 'string') {
      func = env.find(x[0])[x[0]];
      args = [];
      for (var i=1;i<x.length;i++) {
        args.push(x[i]);
      }
      return func.exec(args);
    }
  } else {
    if (!isNaN(Number(x))) {
      return Number(x);
    } else if (typeof(x) == 'string') {
      if (env.find(x)) {
        return ev(env.find(x)[x], env);
      }
    }
  }
}

function tokenize(string) {
  return string.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(function (str) { return str ? true : false;});
}

function ListEnv(outer) {
  this.outer = outer;
  this.list = [];
}

ListEnv.prototype.push = function (list) {
  this.list.push(list);
}

function parse(tokens, nowEnv) {
  var token = tokens[0];
  var restToken = tokens.slice(1);
  if(!(restToken.length > 0)) {
    return nowEnv;
  }

  if (token === '(') {
    var newEnv = new ListEnv(nowEnv);
    return parse(restToken, newEnv);
  } else if (token ===')') {
    nowEnv.outer.push(nowEnv)
    return parse(restToken, nowEnv.outer);
  } else {
    nowEnv.push(token);
    return parse(restToken, nowEnv);
  }
}

var parserEnv = new ListEnv(null);
var piyo = parse(tokenize('(do (def hoge (fn (x y ) (+ x y))) (hoge 1 2))'), parserEnv)

var parsed = ['do', ['def', 'hoge', ['fn', ['x', 'y'], ['*', 'x', 'y']]], ['hoge', 100, 2]];
var hoge = ev(parsed, new EMOLA.DictEnv(null));
console.log(hoge);
