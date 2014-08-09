describe("Type Eval test", function() {
  it("boolean", function() {
      expect(EMOLA.readAndEval('(= 1 1)')).toEqual(true);
      expect(EMOLA.readAndEval('(= 1 2)')).toEqual(false);
      expect(EMOLA.readAndEval('true')).toEqual(true);
      expect(EMOLA.readAndEval('false')).toEqual(false);
  });

  it("integer", function() {
      expect(EMOLA.readAndEval('1')).toEqual(1);
      expect(EMOLA.readAndEval('0')).toEqual(0);
      expect(EMOLA.readAndEval('0100')).toEqual(100);
      // TODO: expect(EMOLA.readAndEval('100.1')).toEqual(100.1);
  });

  it("string", function() {
      expect(EMOLA.readAndEval('"hoge"')).toEqual('hoge');
      expect(EMOLA.readAndEval('"1"')).toEqual('1');
      expect(EMOLA.readAndEval("'1'")).toEqual("1");
  });
});

describe("Lang Eval test", function() {
  it("if", function() {
      expect(EMOLA.readAndEval('(if (= 1 1) 1 0)')).toEqual(1);
      expect(EMOLA.readAndEval('(if (= 1 2) 1 0)')).toEqual(0);
  });

  it("do", function() {
      expect(EMOLA.readAndEval('(do 1 2 3 4 5)')).toEqual(5);
      expect(EMOLA.readAndEval('(do (def hoge 1))')).toEqual(null);
  });

  it("def", function() {
      expect(EMOLA.readAndEval('(do (def hoge 1) hoge)')).toEqual(1);
      expect(EMOLA.readAndEval('(def hoge 1)')).toEqual(null);
  });

  it("fn", function() {
      expect(EMOLA.readAndEval('(do (def hoge (fn (a b c d) (* a b c d))) (hoge 1 2 3 4))')).toEqual(24);
  });


  it("send", function() {
    var point = new EMOLA.Point(200, 300);
    expect(EMOLA.readAndEval('(do (def hoge (point 100 200)) (send hoge move (point 200 300)) hoge)')).toEqual(point);
  });
});

describe("Math Eval test", function() {
  it("+", function() {
      expect(EMOLA.readAndEval('(+ 1 2 3 4 5 6)')).toEqual(21);
  });

  it("-", function() {
      expect(EMOLA.readAndEval('(- 6 2)')).toEqual(4);
      expect(EMOLA.readAndEval('(- -6 2)')).toEqual(-8);
      expect(EMOLA.readAndEval('(- 6 -2)')).toEqual(8);
      expect(EMOLA.readAndEval('(- -6 -2)')).toEqual(-4);
  });

  it("*", function() {
      expect(EMOLA.readAndEval('(* 1 2 3 4 5)')).toEqual(120);
  });

  it("/", function() {
      expect(EMOLA.readAndEval('(/ 120 2 3 4)')).toEqual(5);
  });

  it("=", function() {
      expect(EMOLA.readAndEval('(= 1 1)')).toEqual(true);
      expect(EMOLA.readAndEval('(= 1 2)')).toEqual(false);
      expect(EMOLA.readAndEval('(= "1" "1")')).toEqual(true);
      expect(EMOLA.readAndEval('(= "1" 1)')).toEqual(false);
  });

  it("<", function() {
      expect(EMOLA.readAndEval('(< 2 3)')).toEqual(true);
      expect(EMOLA.readAndEval('(< 2 1)')).toEqual(false);
  });

  it(">", function() {
      expect(EMOLA.readAndEval('(> 2 1)')).toEqual(true);
      expect(EMOLA.readAndEval('(> 2 3)')).toEqual(false);
  });

  it("<=", function() {
      expect(EMOLA.readAndEval('(<= 2 2)')).toEqual(true);
      expect(EMOLA.readAndEval('(<= 2 3)')).toEqual(true);
      expect(EMOLA.readAndEval('(<= 2 1)')).toEqual(false);
  });

  it(">=", function() {
      expect(EMOLA.readAndEval('(>= 2 2)')).toEqual(true);
      expect(EMOLA.readAndEval('(>= 2 1)')).toEqual(true);
      expect(EMOLA.readAndEval('(>= 2 3)')).toEqual(false);
  });

});

describe("Visual Eval test", function() {
  it("point", function() {
    var point = new EMOLA.Point(200, 300);
    expect(EMOLA.readAndEval('(point 200 300)')).toEqual(point);
  });

  it("color", function() {
    var color = new EMOLA.Color(100, 150, 200);
    expect(EMOLA.readAndEval('(color 100 150 200)')).toEqual(color);
  });

  it("circle", function() {
    var circle = new EMOLA.Circle(new EMOLA.Point(200, 300), 100, new EMOLA.Color(100, 150, 200));
    expect(EMOLA.readAndEval('(circle (point 200 300) 100 (color 100 150 200))')).toEqual(circle);
  });
});
