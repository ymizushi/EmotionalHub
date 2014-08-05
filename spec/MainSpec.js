describe("Eval test", function() {
  it("constructor", function() {
      var parsed = [
        new EMOLA.Symbol(EMOLA.Symbol.DO, null),
        [new EMOLA.Symbol(EMOLA.Symbol.DEF, null), new EMOLA.Symbol(EMOLA.Symbol.STR, 'hoge'),
          [new EMOLA.Symbol(EMOLA.Symbol.FN, null),
            [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')],
            [new EMOLA.Symbol(EMOLA.Symbol.MUL, null), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')]]], 
        [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'hoge'), new EMOLA.Symbol(EMOLA.Symbol.INT, 100), new EMOLA.Symbol(EMOLA.Symbol.INT, 2)]
      ];
    var hoge = eval(parsed, new EMOLA.DictEnv(null));
    expect(hoge).toBe(200);
  });
});


describe("Symbol test", function() {
  it("constructor", function() {
    var symbol = new EMOLA.Symbol(EMOLA.Symbol.FN, 'hoge');
    expect(symbol.type).toBe('fn');
    expect(symbol.value).toBe('hoge');
  });

  it("static isSymbol", function() {
    var result = EMOLA.Symbol.isSymbol(new EMOLA.Symbol(EMOLA.Symbol.FN, 'hoge'));
    expect(result).toBe(true);
  });

  it("equalToType", function() {
    var symbol = new EMOLA.Symbol(EMOLA.Symbol.STR, 'hoge');
    expect(symbol.equalToType(EMOLA.Symbol.STR)).toBe(true);
    expect(symbol.equalToType(EMOLA.Symbol.IF)).toBe(false);
  });
});

describe("Tokenizer test", function() {
  it("function tokenize", function() {
    var result = EMOLA.tokenize('(def hoge (x y) (+ x y))');
    expect(result).toEqual(
      ['(', 'def', 'hoge', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')']
    );
  });

  it("equalToType", function() {
    var symbol = new EMOLA.Symbol(EMOLA.Symbol.STR, 'hoge');
    expect(symbol.equalToType(EMOLA.Symbol.STR)).toBe(true);
    expect(symbol.equalToType(EMOLA.Symbol.IF)).toBe(false);
  });
});


// describe("Parser test", function() {
//   it("parse", function() {
//     var parsed = EMOLA.Parser.parse('(do (def hoge (fn [x y] (* x y))) (hoge 100 2))')
//     var result = eval(parsed, new EMOLA.DictEnv(null));
//     expect(result).toBe(200);
//   });
// });
