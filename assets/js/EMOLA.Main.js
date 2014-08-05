EMOLA.DictEnv = function (outer) {
  this.outer = outer;
  this.dict = {};
};
EMOLA.DictEnv.prototype.find = function (key) {
  if (this.outer === null && !this.dict[key]) {
    throw 'symbol is not defined.';
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
    dictEnv.dict[this.args[i].value] = valueArgs[i];
  }
  return eval(this.exp, dictEnv);
};

EMOLA.Symbol = function (type, value) {
  this.type = type;
  this.value = value;
}
EMOLA.Symbol.IF = 'if';
EMOLA.Symbol.DO = 'do';
EMOLA.Symbol.DEF = 'def';
EMOLA.Symbol.FN = 'fn';

EMOLA.Symbol.PLUS = '+';
EMOLA.Symbol.MINUS = '-';
EMOLA.Symbol.DIV = '/';
EMOLA.Symbol.MUL = '*';
EMOLA.Symbol.EQUAL = '=';
EMOLA.Symbol.GREATER = '>';
EMOLA.Symbol.LESS = '<';

EMOLA.Symbol.VAR = 'var';
EMOLA.Symbol.STR = 'str';
EMOLA.Symbol.INT = 'int';

EMOLA.Symbol.isSymbol = function (symbol) {
  if (symbol instanceof EMOLA.Symbol) {
    return true;
  } else {
    return false;
  }
};

EMOLA.Symbol.prototype.equalToType = function (type) {
  if (this.type === type) {
    return true;
  } else {
    return false;
  }
};


function eval(x, env) {
  if (x instanceof Array) {
    if (x[0].equalToType(EMOLA.Symbol.IF)) {
      var testExp = x[1];
      var thenExp = x[2];
      var elseExp = x[3];
      if (eval(testExp, env)) {
        return eval(thenExp, env);
      } 
      return eval(elseExp, env);
    } else if (x[0].equalToType(EMOLA.Symbol.DO)) {
      for(var i=1;i < x.length-1;++i) {
        eval(x[i], env);
      }
      return eval(x[x.length-1], env);
    } else if (x[0].equalToType(EMOLA.Symbol.DEF)) {
      var symbol = x[1];
      var value = x[2];
      env.dict[symbol.value] = eval(value, env);
    } else if (x[0].equalToType(EMOLA.Symbol.FN)) {
      var args =  x[1];
      var exp = x[2];
      return new EMOLA.Fn(args, exp, env);
    } else if (x[0].equalToType(EMOLA.Symbol.PLUS)) {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum += eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.MINUS)) {
      var sum = 0;
      for(var i=1;i < x.length;++i) {
        sum -= eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.MUL)) {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum *= eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.DIV)) {
      var sum = 1;
      for(var i=1;i < x.length;++i) {
        sum /= eval(x[i], env);
      }
      return sum;
    } else if (x[0].equalToType(EMOLA.Symbol.EQUAL)) {
      return eval(x[1], env) == eval(x[2], env);
    } else if (x[0].equalToType(EMOLA.Symbol.LESS)) {
      return eval(x[1], env) < eval(x[2], env);
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
        return eval(env.find(x.value)[x.value], env);
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
  });
}

EMOLA.ListEnv = function (outer) {
  this.outer = outer;
  this.list = [];
}

EMOLA.ListEnv.prototype.push = function (list) {
  this.list.push(list);
}

EMOLA.parse = function (tokens) {
  var env = [];
  for (var i=0;i<tokens.length;i++) {
    if (tokens[i] === '(') {
      env.push(EMOLA.parse(tokens.slice(i+1)));
      return env;
    } else if (tokens[i] === ')') {
      return env;
    } else {
      env.push(tokens[i]);
    }
  }
  return env;
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
  if (typeof x === 'string') {
    if (x[0] === '"' || x[0] === "'") {
      return  new EMOLA.Symbol(EMOLA.Symbol.STR, x.slice(1,-1));
    } else {
      return new EMOLA.Symbol(EMOLA.Symbol.VAR, x);
    }
  } else if (typeof x === 'number') {
      return new EMOLA.Symbol(EMOLA.Symbol.INT, x);
  }
}

var parsed = [
  new EMOLA.Symbol(EMOLA.Symbol.DO, null),
  [new EMOLA.Symbol(EMOLA.Symbol.DEF, null), new EMOLA.Symbol(EMOLA.Symbol.STR, 'hoge'),
    [new EMOLA.Symbol(EMOLA.Symbol.FN, null),
      [new EMOLA.Symbol(EMOLA.Symbol.STR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.STR, 'y')],
      [new EMOLA.Symbol(EMOLA.Symbol.MUL, null), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')]]], 
  [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'hoge'), new EMOLA.Symbol(EMOLA.Symbol.INT, 100), new EMOLA.Symbol(EMOLA.Symbol.INT, 2)]
];
var hoge = eval(parsed, new EMOLA.DictEnv(null));


function read_eval(input) {
  return input;
}

$(document).ready(function(){
   /* First console */
   var console1 = $('<div class="console1">');
   $('body').append(console1);
   var controller1 = console1.console({
     promptLabel: 'Emola> ',
     commandValidate: function(line){
       if (line == "") return false;
       else return true;
     },
     commandHandle:function(line){

       return [{msg:"=> " + read_eval(line), className:"jquery-console-message-value"} ]
     },
     autofocus:true,
     animateScroll:true,
     promptHistory:true,
     charInsertTrigger:function(keycode,line){
       return true;
     }
   });
 });
