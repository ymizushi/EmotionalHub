describe("List.Minus Spec", function () {
  it("integration", function() {
    var minusList = new emola.MinusList([new emola.Atom(emola.Atom.MINUS), new emola.Atom(emola.Atom.NUMBER, 1), new emola.Atom(emola.Atom.NUMBER, 2)]);
    expect(minusList.evalSyntax(emola.Global.env)).toEqual(-1);
  });
});
