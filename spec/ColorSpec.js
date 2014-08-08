describe("Color test", function() {
  it("constructor", function() {
    var color = new EMOLA.Color(100, 200, 300);
    expect(EMOLA.readAndEval('(color 100 200 300)')).toEqual(color);
  });
});
