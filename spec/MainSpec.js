describe("Eval test", function() {
  it("constructor", function() {
      var parsed = [
        new EMOLA.Symbol(EMOLA.Symbol.DO, null),
        [new EMOLA.Symbol(EMOLA.Symbol.DEF, null), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'hoge'),
          [new EMOLA.Symbol(EMOLA.Symbol.FN, null),
            [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')],
            [new EMOLA.Symbol(EMOLA.Symbol.MUL, null), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')]]], 
        [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'hoge'), new EMOLA.Symbol(EMOLA.Symbol.INT, 100), new EMOLA.Symbol(EMOLA.Symbol.INT, 2)]
      ];
    var hoge = EMOLA.eval(parsed, new EMOLA.DictEnv(null));
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
    var def = EMOLA.tokenize('(def hoge (x y) (+ x y))');
    expect(def).toEqual(
      ['(', 'def', 'hoge', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')']
    );
    var calc = EMOLA.tokenize('(+ 1 2 (- 2 1))');
    expect(calc).toEqual(
      ['(', '+', 1, 2, '(', '-', 2, 1, ')', ')']
    );
  });
});

describe("Parser test", function() {
  it("function parser", function() {
      var result = EMOLA.parse(['(', '-', 2, '(', '+', 2 , 3, ')', ')']);
      expect(result).toEqual(
        [new EMOLA.Symbol(EMOLA.Symbol.MINUS, null),
          new EMOLA.Symbol(EMOLA.Symbol.INT, 2),
            [new EMOLA.Symbol(EMOLA.Symbol.PLUS, null), new EMOLA.Symbol(EMOLA.Symbol.INT, 2) ,new EMOLA.Symbol(EMOLA.Symbol.INT, 3)]]
    );

    var result2 = EMOLA.parse(['(', 'do', '(', 'def', 'hoge' , '(', 'fn', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')', ')', '(', 'hoge', 2 , 1, ')', ')']);
    expect(result2).toEqual(
        [new EMOLA.Symbol(EMOLA.Symbol.DO, null),
          [
            new EMOLA.Symbol(EMOLA.Symbol.DEF, null), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'hoge'),            [new EMOLA.Symbol(EMOLA.Symbol.FN, null),
              [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')],
              [new EMOLA.Symbol(EMOLA.Symbol.PLUS, null), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'x'), new EMOLA.Symbol(EMOLA.Symbol.VAR, 'y')]
            ]
          ],
          [new EMOLA.Symbol(EMOLA.Symbol.VAR, 'hoge'), new EMOLA.Symbol(EMOLA.Symbol.INT, 2), new EMOLA.Symbol(EMOLA.Symbol.INT, 1)]
        ]
    );
  });

});

describe("integration test", function() {
  it("integration", function() {
      var result = EMOLA.eval(EMOLA.parse(EMOLA.tokenize('(+ 1 2)')), new EMOLA.DictEnv(null));
      expect(result).toEqual(3);

      var result2 = EMOLA.eval(EMOLA.parse(EMOLA.tokenize('(do (def hoge (fn (x y) (* x y))) (hoge 100 2))')), new EMOLA.DictEnv(null));
      expect(result2).toEqual(200);
  });
});
