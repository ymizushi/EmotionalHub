describe("GraphPlusList Spec", function () {
  it("integration", function() {
    var plusList = new emola.GraphPlusList([new emola.Atom('+'), new emola.Atom(emola.Atom.NUMBER, 1), new emola.Atom(emola.Atom.NUMBER, 2)]);
    expect(plusList.evalSyntax(emola.Global.env)).toEqual(3);
  });
});


