describe("Type Eval test", function() {
  it("boolean", function() {
    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(= 1 1)' ,null)).toEqual(true);
    expect(emola.Parser.readAndEval(tokenReader, '(= 1 2)' ,null)).toEqual(false);
    expect(emola.Parser.readAndEval(tokenReader, 'true' ,null)).toEqual(true);
    expect(emola.Parser.readAndEval(tokenReader, 'false' ,null)).toEqual(false);
  });

  it("integer", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '1' ,null)).toEqual(1);
      expect(emola.Parser.readAndEval(tokenReader, '0' ,null)).toEqual(0);
      expect(emola.Parser.readAndEval(tokenReader, '0100' ,null)).toEqual(100);
      expect(emola.Parser.readAndEval(tokenReader, '100.1' ,null)).toEqual(100.1);
  });

  it("string", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '"hoge"' ,null)).toEqual('hoge');
      expect(emola.Parser.readAndEval(tokenReader, '"1"' ,null)).toEqual('1');
      expect(emola.Parser.readAndEval(tokenReader, "'1'" ,null)).toEqual("1");
  });
});

describe("Lang Eval test", function() {
  // TODO
  // it("space", function() {
  //   expect(emola.Core.readAndEval(tokenReader, '(do (def hoge "hoge  piyo") hoge)') ,null).toEqual(0);
  // });
  it("if", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(if (= 1 1) 1 0)' ,null)).toEqual(1);
      expect(emola.Parser.readAndEval(tokenReader, '(if (= 1 2) 1 0)' ,null)).toEqual(0);
  });

  it("do", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(do 1 2 3 4 5)' ,null)).toEqual(5);
      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge 1))' ,null)).toEqual(null);
  });

  it("def", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge 1) hoge)' ,null)).toEqual(1);
      expect(emola.Parser.readAndEval(tokenReader, '(def hoge 1)' ,null)).toEqual(null);
  });

  it("fn", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (fn (a b c d) (* a b c d))) (hoge 1 2 3 4))' ,null)).toEqual(24);

      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (fn (a b c d) (* a b c d))) (hoge 1 2 3 4))' ,null)).toEqual(24);
  });

  // TODO: 再帰に対応しておく
  // it("recur fn", function() {
  //     expect(emola.Core.readAndEval(tokenReader, '(do (def count (fn (x) (if (= x 0) "finished" (hoge (- x 1))))) (hoge 2))') ,null).toEqual("finished");
  // });

  it("defn", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(do (defn hoge (a b c d) (* a b c d)) (hoge 1 2 3 4))' ,null)).toEqual(24);
  });

  it("let", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(let (x 1 y 2) (+ x y))') ,null).toEqual(3);
      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (fn (x) (fn (a) (+ x a)))) (def piyo (hoge 2)) (piyo 2))' ,null)).toEqual(4);
      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (fn (x) (fn (a) (+ x a)))) ((hoge 2) 2))' ,null)).toEqual(4);
      // TODO: expect(emola.Core.readAndEval(tokenReader, '(do (def hoge (fn (y) (let (x 1) (fn (a) (+ x a y))))) ((hoge 2) 3))') ,null).toEqual(5);
      // TODO: expect(emola.Core.readAndEval(tokenReader, '(do (def hoge (fn () (let (x 1) (fn (a) (+ x a))))) ((hoge) 3))') ,null).toEqual(5);
  });

  it("quote", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(eval (quote (+ 1 2)))' ,null)).toEqual(3);
      expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (quote (+ 1 2))) (eval hoge))' ,null)).toEqual(3);
  });

  it("send", function() {
    var point = new emola.Point(200, 300);
    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (point 100 200)) (send hoge move (point 200 300)) hoge)' ,null)).toEqual(point);
  });
});

describe("Math Eval test", function() {
  it("+", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(+ 1 2 3 4 5 6)' ,null)).toEqual(21);
  });

  it("-", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(- 6 2)' ,null)).toEqual(4);
      expect(emola.Parser.readAndEval(tokenReader, '(- -6 2)' ,null)).toEqual(-8);
      expect(emola.Parser.readAndEval(tokenReader, '(- 6 -2)' ,null)).toEqual(8);
      expect(emola.Parser.readAndEval(tokenReader, '(- -6 -2)' ,null)).toEqual(-4);
  });

  it("*", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(* 1 2 3 4 5)' ,null)).toEqual(120);
  });

  it("/", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(/ 120 2 3 4)' ,null)).toEqual(5);
  });

  it("=", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(= 1 1)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(= 1 2)' ,null)).toEqual(false);
      expect(emola.Parser.readAndEval(tokenReader, '(= "1" "1")' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(= "1" 1)' ,null)).toEqual(false);
  });

  it("<", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(< 2 3)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(< 2 1)' ,null)).toEqual(false);
  });

  it(">", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(> 2 1)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(> 2 3)' ,null)).toEqual(false);
  });

  it("<=", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(<= 2 2)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(<= 2 3)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(<= 2 1)' ,null)).toEqual(false);
  });

  it(">=", function() {
      var tokenReader  = new emola.TokenReader();
      expect(emola.Parser.readAndEval(tokenReader, '(>= 2 2)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(>= 2 1)' ,null)).toEqual(true);
      expect(emola.Parser.readAndEval(tokenReader, '(>= 2 3)' ,null)).toEqual(false);
  });
});

describe("Visual Eval test", function() {
  it("point", function() {
    var point = new emola.Point(200, 300);
    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(point 200 300)' ,null)).toEqual(point);
  });

  it("color", function() {
    var color = new emola.Color(100, 150, 200);
    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(color 100 150 200)' ,null)).toEqual(color);
  });

  it("circle", function() {
    var circle = new emola.Circle(new emola.Point(200, 300), 100, new emola.Color(100, 150, 200));
    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(circle (point 200 300) 100 (color 100 150 200))' ,null)).toEqual(circle);
  });
});
