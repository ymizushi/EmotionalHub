describe("Eval test", function() {
  it("constructor", function() {
      var parsed = [
        new EMOLA.Atom(EMOLA.Atom.DO, null),
        [new EMOLA.Atom(EMOLA.Atom.DEF, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'),
          [new EMOLA.Atom(EMOLA.Atom.FN, null),
            [new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')],
            [new EMOLA.Atom(EMOLA.Atom.MUL, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')]]], 
        [new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'), new EMOLA.Atom(EMOLA.Atom.INT, 100), new EMOLA.Atom(EMOLA.Atom.INT, 2)]
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

describe("Parser test", function() {
  it("function parser", function() {
      var result = EMOLA.parse(['(', '-', 2, '(', '+', 2 , 3, ')', ')']);
      expect(result).toEqual(
        [new EMOLA.Atom(EMOLA.Atom.MINUS, null),
          new EMOLA.Atom(EMOLA.Atom.INT, 2),
            [new EMOLA.Atom(EMOLA.Atom.PLUS, null), new EMOLA.Atom(EMOLA.Atom.INT, 2) ,new EMOLA.Atom(EMOLA.Atom.INT, 3)]]
    );

    var result2 = EMOLA.parse(['(', 'do', '(', 'def', 'hoge' , '(', 'fn', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')', ')', '(', 'hoge', 2 , 1, ')', ')']);
    expect(result2).toEqual(
        [new EMOLA.Atom(EMOLA.Atom.DO, null),
          [
            new EMOLA.Atom(EMOLA.Atom.DEF, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'),            [new EMOLA.Atom(EMOLA.Atom.FN, null),
              [new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')],
              [new EMOLA.Atom(EMOLA.Atom.PLUS, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')]
            ]
          ],
          [new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'), new EMOLA.Atom(EMOLA.Atom.INT, 2), new EMOLA.Atom(EMOLA.Atom.INT, 1)]
        ]
    );
  });
});

describe("integration test", function() {
  it("integration", function() {
      expect(EMOLA.readAndEval('(+ 1 2)')).toEqual(3);
      expect(EMOLA.readAndEval('(do (def hoge (fn (x y) (* x y))) (hoge 100 2))')).toEqual(200);
      expect(EMOLA.readAndEval('(do (def hoge (+ (* 10 20) 10 (/ 4 2))) hoge)')).toEqual(212);
  });
});
