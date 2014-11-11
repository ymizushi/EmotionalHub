describe("Type Eval test", function() {
  it("boolean", function() {
    expect(emola.Core.readAndEval('(= 1 1)')).toEqual(true);
    expect(emola.Core.readAndEval('(= 1 2)')).toEqual(false);
    expect(emola.Core.readAndEval('true')).toEqual(true);
    expect(emola.Core.readAndEval('false')).toEqual(false);
  });

  it("integer", function() {
      expect(emola.Core.readAndEval('1')).toEqual(1);
      expect(emola.Core.readAndEval('0')).toEqual(0);
      expect(emola.Core.readAndEval('0100')).toEqual(100);
      expect(emola.Core.readAndEval('100.1')).toEqual(100.1);
  });

  it("string", function() {
      expect(emola.Core.readAndEval('"hoge"')).toEqual('hoge');
      expect(emola.Core.readAndEval('"1"')).toEqual('1');
      expect(emola.Core.readAndEval("'1'")).toEqual("1");
  });
});

describe("Lang Eval test", function() {
  // TODO
  // it("space", function() {
  //   expect(emola.Core.readAndEval('(do (def hoge "hoge  piyo") hoge)')).toEqual(0);
  // });
  it("if", function() {
      expect(emola.Core.readAndEval('(if (= 1 1) 1 0)')).toEqual(1);
      expect(emola.Core.readAndEval('(if (= 1 2) 1 0)')).toEqual(0);
  });

  it("do", function() {
      expect(emola.Core.readAndEval('(do 1 2 3 4 5)')).toEqual(5);
      expect(emola.Core.readAndEval('(do (def hoge 1))')).toEqual(null);
  });

  it("def", function() {
      expect(emola.Core.readAndEval('(do (def hoge 1) hoge)')).toEqual(1);
      expect(emola.Core.readAndEval('(def hoge 1)')).toEqual(null);
  });

  it("fn", function() {
      expect(emola.Core.readAndEval('(do (def hoge (fn (a b c d) (* a b c d))) (hoge 1 2 3 4))')).toEqual(24);

      expect(emola.Core.readAndEval('(do (def hoge (fn (a b c d) (* a b c d))) (hoge 1 2 3 4))')).toEqual(24);
  });

  // TODO: 再帰に対応しておく
  // it("recur fn", function() {
  //     expect(emola.Core.readAndEval('(do (def count (fn (x) (if (= x 0) "finished" (hoge (- x 1))))) (hoge 2))')).toEqual("finished");
  // });

  it("defn", function() {
      expect(emola.Core.readAndEval('(do (defn hoge (a b c d) (* a b c d)) (hoge 1 2 3 4))')).toEqual(24);
  });

  it("let", function() {
      expect(emola.Core.readAndEval('(let (x 1 y 2) (+ x y))')).toEqual(3);
      expect(emola.Core.readAndEval('(do (def hoge (fn (x) (fn (a) (+ x a)))) (def piyo (hoge 2)) (piyo 2))')).toEqual(4);
      expect(emola.Core.readAndEval('(do (def hoge (fn (x) (fn (a) (+ x a)))) ((hoge 2) 2))')).toEqual(4);
      // TODO: expect(emola.Core.readAndEval('(do (def hoge (fn (y) (let (x 1) (fn (a) (+ x a y))))) ((hoge 2) 3))')).toEqual(5);
      // TODO: expect(emola.Core.readAndEval('(do (def hoge (fn () (let (x 1) (fn (a) (+ x a))))) ((hoge) 3))')).toEqual(5);
  });

  it("quote", function() {
      expect(emola.Core.readAndEval('(evalSyntax (quote (+ 1 2)))')).toEqual(3);
      expect(emola.Core.readAndEval('(do (def hoge (quote (+ 1 2))) (evalSyntax hoge))')).toEqual(3);
  });

  it("send", function() {
    var point = new emola.Point(200, 300);
    expect(emola.Core.readAndEval('(do (def hoge (point 100 200)) (send hoge move (point 200 300)) hoge)')).toEqual(point);
  });
});

describe("Math Eval test", function() {
  it("+", function() {
      expect(emola.Core.readAndEval('(+ 1 2 3 4 5 6)')).toEqual(21);
  });

  it("-", function() {
      expect(emola.Core.readAndEval('(- 6 2)')).toEqual(4);
      expect(emola.Core.readAndEval('(- -6 2)')).toEqual(-8);
      expect(emola.Core.readAndEval('(- 6 -2)')).toEqual(8);
      expect(emola.Core.readAndEval('(- -6 -2)')).toEqual(-4);
  });

  it("*", function() {
      expect(emola.Core.readAndEval('(* 1 2 3 4 5)')).toEqual(120);
  });

  it("/", function() {
      expect(emola.Core.readAndEval('(/ 120 2 3 4)')).toEqual(5);
  });

  it("=", function() {
      expect(emola.Core.readAndEval('(= 1 1)')).toEqual(true);
      expect(emola.Core.readAndEval('(= 1 2)')).toEqual(false);
      expect(emola.Core.readAndEval('(= "1" "1")')).toEqual(true);
      expect(emola.Core.readAndEval('(= "1" 1)')).toEqual(false);
  });

  it("<", function() {
      expect(emola.Core.readAndEval('(< 2 3)')).toEqual(true);
      expect(emola.Core.readAndEval('(< 2 1)')).toEqual(false);
  });

  it(">", function() {
      expect(emola.Core.readAndEval('(> 2 1)')).toEqual(true);
      expect(emola.Core.readAndEval('(> 2 3)')).toEqual(false);
  });

  it("<=", function() {
      expect(emola.Core.readAndEval('(<= 2 2)')).toEqual(true);
      expect(emola.Core.readAndEval('(<= 2 3)')).toEqual(true);
      expect(emola.Core.readAndEval('(<= 2 1)')).toEqual(false);
  });

  it(">=", function() {
      expect(emola.Core.readAndEval('(>= 2 2)')).toEqual(true);
      expect(emola.Core.readAndEval('(>= 2 1)')).toEqual(true);
      expect(emola.Core.readAndEval('(>= 2 3)')).toEqual(false);
  });
});

describe("Visual Eval test", function() {
  it("point", function() {
    var point = new emola.Point(200, 300);
    expect(emola.Core.readAndEval('(point 200 300)')).toEqual(point);
  });

  it("color", function() {
    var color = new emola.Color(100, 150, 200);
    expect(emola.Core.readAndEval('(color 100 150 200)')).toEqual(color);
  });

  it("circle", function() {
    var circle = new emola.Circle(new emola.Point(200, 300), 100, new emola.Color(100, 150, 200));
    expect(emola.Core.readAndEval('(circle (point 200 300) 100 (color 100 150 200))')).toEqual(circle);
  });
});
