describe("GraphExpList.Do Spec", function () {
  it("integration", function() {
      var doList = new emola.DoList([new emola.Atom('do'), new emola.Atom(emola.Atom.NUMBER, 1), new emola.Atom(emola.Atom.NUMBER, 2), new emola.Atom(emola.Atom.NUMBER, 3)]);
    expect(doList.evalSyntax(emola.Global.env)).toEqual(3);
  });
});
