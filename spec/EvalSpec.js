describe("Eval test", function() {
  it("true", function() {
      expect(EMOLA.readAndEval('(= 1 1)')).toEqual(true);
  });

  it("if", function() {
      expect(EMOLA.readAndEval('(do (def x 3) (def y 3) (if (= x y ) true false))')).toEqual(1);
  });

  it("send", function() {
      var point = new EMOLA.Point(200, 300);
      expect(EMOLA.readAndEval('(do (def hoge (point 100 200)) (send hoge move (point 200 300)) hoge)')).toEqual(point);
  });
});

