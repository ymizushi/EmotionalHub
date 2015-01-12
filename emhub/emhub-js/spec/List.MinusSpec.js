describe("GraphExpList.Minus Spec", function () {
  it("integration", function() {
    var minusList = new emola.GraphMinusList([new emola.Atom(emola.AtomType.MINUS), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom(emola.AtomType.NUMBER, 2)]);
    expect(minusList.evalSyntax(emola.Global.env)).toEqual(-1);
  });
});
