describe("Tokenizer test", function() {
  it("function tokenize", function() {
    expect(emola.Core.tokenize(
      '(def hoge (x y) (+ x y))'))
      .toEqual(
      ['(', 'def', 'hoge', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')']);
    // TODO:
      // var re = /".*"/;
      // '"hoge piyo    fuga", "fuga piyo             asdf "'.match(re);
    // expect(emola.Core.tokenize(
    //   '(def hoge "hoge   piyo")'))
    //   .toEqual(
    //   ['(', 'def', 'hoge', '"hoge"', ')']);
    expect(emola.Core.tokenize(
      '(+ 1 2 (- 2 1))'
      )).toEqual(
      ['(', '+', 1, 2, '(', '-', 2, 1, ')', ')']
    );
  });
});

describe("createListTypeObject test", function() {
  it("constructor", function() {
    var result = emola.Core.createList([new emola.Atom(emola.Atom.MINUS, null), new emola.Atom(emola.Atom.NUMBER, 1), new emola.Atom(emola.Atom.NUMBER, 2)]);
    var expected = new emola.MinusList([new emola.Atom(emola.Atom.MINUS, null), new emola.Atom(emola.Atom.NUMBER, 1), new emola.Atom(emola.Atom.NUMBER, 2)]);
    expect(result).toEqual(expected);
    expect(expected.evalSyntax(new emola.Env(null))).toEqual(-1);
    
  });
});

describe("parse test", function() {
  it("constructor", function() {
    emola.Global.tokenReader.add("(- 1 2)");

    var result = emola.Core.parse(emola.Global.tokenReader).evalSyntax(emola.Global.env);
    expect(result).toEqual(-1);
    
  });
});
