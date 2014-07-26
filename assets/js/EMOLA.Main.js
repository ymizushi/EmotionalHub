var EMOLA = { REVISION: '0.0.1'};

EMOLA.Env = function (outer) {
  this.outer = outer;
  this.dict = {};
};

EMOLA.Env.prototype.find = function (key) {
  if (this.dict[key]) {
    return this.dict;
  } else {
    return this.outer.find(key);
  }
}

EMOLA.Fn = function (args, exp, outer) {
  this.args = args;
  this.exp = exp;
  this.outer = outer;
}

EMOLA.Fn.prototype.exec = function (valueArgs) {
  env = new Env(this.outer)
  for (var i=0;i<this.args.length;i++) {
    env.dict[this.args[i]] = valueArgs[i];
  }
  return eval(this.exp, env)
}

function eval(x, env) {
  if (x instanceof Array) {
    if (x[0] == 'if') {
      var testExp = x[1];
      var thenExp = x[2];
      var elseExp = x[3];
      if (eval(testExp, env)) {
        return eval(thenExp, env);
      } else {
        return eval(elseExp, env);
      }
    } else if (x[0] == 'do') {
      for(var i=1;i < x.length-1;++i) {
        eval(x[i], env);
      }
      return eval(x[x.length-1], env);
    } else if (x[0] == 'def') {
      var symbol = x[1];
      var value = x[2];
      env.dict[symbol] = eval(value, env);
    } else if (x[0] == 'fn') {
      var args =  x[1];
      var exp = x[2];
      return new Fn(args, exp, env);
    } else if (x[0] == '+') {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum += eval(x[i], env);
      }
      return sum;
    } else if (x[0] == '-') {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum -= eval(x[i], env);
      }
      return sum;
    } else if (x[0] == '*') {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum *= eval(x[i], env);
      }
      return sum;
    } else if (x[0] == '/') {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum /= eval(x[i], env);
      }
      return sum;
    } else if (x[0] == '=') {
      return eval(x[1], env) == eval(x[2], env);
    } else if (x[0] == '<') {
      return eval(x[1], env) < eval(x[2], env);
    } else if (typeof(x[0]) == 'string') {
      func = env.find(x[0])[x[0]];
      args = [];
      for (var i=1;i<x.length;i++) {
        args.push(x[i]);
      }
      return func.exec(args);
    }
  } else {
    if (typeof(x) == 'number') {
      return x;
    } else if (typeof(x) == 'string') {
      if (env.find(x)) {
        return eval(env.find(x)[x], env);
      } else {
        throw 'symbol is not defined.'
      }
    }
  }
}

originalEnv = new Env(null);
originalEnv.dict['hoge'] = 'bar';
env = new Env(originalEnv);
env.dict['foo'] = 'piyo';

console.log(eval(['do', ['def', 'hoge', ['fn', ['x', 'y', 'z'], ['+', 'x', 'y', 'z']]], ['hoge', 2, 3, 10]], new Env(null)));
