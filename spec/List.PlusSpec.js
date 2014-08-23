describe("List.Plus Spec", function () {
  it("integration", function() {
      var plusList = new EMOLA.List.Plus([new EMOLA.Atom('+'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
      expect(plusList.eval(EMOLA.Global.env)).toEqual(3);
  });
});


