describe("Eval test", function() {
  it("send", function() {
      var point = new EMOLA.Point(200, 300);
      expect(EMOLA.readAndEval('(do (def hoge (point 100 200)) (send hoge move (point 200 300)) hoge)')).toEqual(point);
  });
});

