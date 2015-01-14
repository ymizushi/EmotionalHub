describe("GraphExpList.Do Spec", function () {
  it("integration", function() {
      var doList = new emola.GraphDoList([new emola.Atom('do'), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom(emola.AtomType.NUMBER, 2), new emola.Atom(emola.AtomType.NUMBER, 3)]);
    expect(doList.evalSyntax(new emola.Env(null))).toEqual(3);
  });
});
