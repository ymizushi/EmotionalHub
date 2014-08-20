describe("List.If Spec", function() {
  it("integration", function() {
      var typeIfList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.Atom('int', 1), new EMOLA.Atom('false')]);
    ;
    expect(typeIfList.eval(EMOLA.Global.env)).toEqual(1);
  });
});


