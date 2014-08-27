describe("Eval test", function() {
  it("constructor", function() {
      var parsed = [
        new EMOLA.Atom(EMOLA.Atom.DO, null),
        [new EMOLA.Atom(EMOLA.Atom.DEF, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'),
          [new EMOLA.Atom(EMOLA.Atom.FN, null),
            [new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')],
            [new EMOLA.Atom(EMOLA.Atom.MUL, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')]]], 
        [new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 100), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]
      ];
    var hoge = EMOLA.eval(parsed, new EMOLA.DictEnv(null));
    expect(hoge).toBe(200);
  });
});

describe("Tokenizer test", function() {
  it("function tokenize", function() {
    expect(EMOLA.tokenize(
      '(def hoge (x y) (+ x y))'))
      .toEqual(
      ['(', 'def', 'hoge', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')']);
    // TODO:
      // var re = /".*"/;
      // '"hoge piyo    fuga", "fuga piyo             asdf "'.match(re);
    // expect(EMOLA.tokenize(
    //   '(def hoge "hoge   piyo")'))
    //   .toEqual(
    //   ['(', 'def', 'hoge', '"hoge"', ')']);
    expect(EMOLA.tokenize(
      '(+ 1 2 (- 2 1))'
      )).toEqual(
      ['(', '+', 1, 2, '(', '-', 2, 1, ')', ')']
    );
  });
});

describe("Eval test", function() {
  it("constructor", function() {
      var parsed = [
        new EMOLA.Atom(EMOLA.Atom.DO, null),
        [new EMOLA.Atom(EMOLA.Atom.DEF, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'),
          [new EMOLA.Atom(EMOLA.Atom.FN, null),
            [new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')],
            [new EMOLA.Atom(EMOLA.Atom.MUL, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')]]], 
        [new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 100), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]
      ];
    var hoge = EMOLA.eval(parsed, new EMOLA.DictEnv(null));
    expect(hoge).toBe(200);
  });
});

describe("createListTypeObject test", function() {
  it("constructor", function() {
    var result = EMOLA.createListTypeObject([new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    var expected = new EMOLA.List.Minus([new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    expect(result).toEqual(expected);
    expect(expected.eval(new EMOLA.DictEnv(null))).toEqual(-1);
    
  });
});

describe("parseAno test", function() {
  it("constructor", function() {
    var result = EMOLA.createListTypeObject([new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    var expected = new EMOLA.List.Minus([new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    expect(result).toEqual(expected);
    expect(expected.eval(new EMOLA.DictEnv(null))).toEqual(-1);
    
  });
});
