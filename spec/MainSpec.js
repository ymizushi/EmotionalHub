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
  });
});

describe("Circle test", function() {
  it("constructor", function() {
    var circle = new EMOLA.Circle(new EMOLA.Point(100,200), 300, new EMOLA.Color(50, 60, 70));
    expect(circle.point.x).toEqual(100);
    expect(circle.point.y).toEqual(200);
    expect(circle.radius).toEqual(300);
    expect(circle.color.r).toEqual(50);
    expect(circle.color.g).toEqual(60);
    expect(circle.color.b).toEqual(70);
  });
});
