describe("List.Do Spec", function () {
  it("integration", function() {
      var doList = new EMOLA.List.Do([new EMOLA.Atom('do'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2), new EMOLA.Atom(EMOLA.Atom.NUMBER, 3)]);
    expect(doList.eval(EMOLA.Global.env)).toEqual(3);
  });
});
