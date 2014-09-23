describe("List.Minus Spec", function () {
  it("integration", function() {
    var minusList = new EMOLA.List.Minus([new EMOLA.Atom(EMOLA.Atom.MINUS), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
    expect(minusList.eval(EMOLA.Global.env)).toEqual(-1);
  });
});
