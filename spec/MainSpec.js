describe("Eval test", function() {
  it("constructor", function() {
    var parsed = ['do', ['def', 'hoge', ['fn', ['x', 'y'], ['*', 'x', 'y']]], ['hoge', 100, 2]];
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
