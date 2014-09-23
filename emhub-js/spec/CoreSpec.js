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

describe("createListTypeObject test", function() {
  it("constructor", function() {
    var result = EMOLA.createList([new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    var expected = new EMOLA.List.Minus([new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    expect(result).toEqual(expected);
    expect(expected.eval(new EMOLA.DictEnv(null))).toEqual(-1);
    
  });
});

describe("parseAno test", function() {
  it("constructor", function() {
    EMOLA.Global.tokenReader.add("(- 1 2)");

    var result = EMOLA.parse(EMOLA.Global.tokenReader).eval(EMOLA.Global.env);
    expect(result).toEqual(-1);
    
  });
});
