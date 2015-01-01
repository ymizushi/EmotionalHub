describe("Color test", function() {
  it("constructor", function() {
    var color = new emola.Color(100, 200, 300);
    // expect(emola.readAndEval('(color 100 200 300)')).toEqual(color);
    expect(emola.Parser.readAndEval('(color 100 200 300)')).toEqual(color);
  });
});
