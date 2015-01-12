describe("Color test", function() {
  it("constructor", function() {
    var color = new emola.Color(100, 200, 300);
    // expect(emola.readAndEval('(color 100 200 300)')).toEqual(color);

    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(color 100 200 300)'), null).toEqual(color);
  });
});
