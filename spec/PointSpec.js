describe("Point test", function() {
  it("constructor", function() {
    var point = new EMOLA.Point(100, 200);
    expect(EMOLA.readAndEval('(point 100 200)')).toEqual(point);
  });
});

