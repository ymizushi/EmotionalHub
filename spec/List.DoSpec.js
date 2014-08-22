describe("List.Do Spec", function () {
  it("integration", function() {
      var doList = new EMOLA.List.Do([new EMOLA.Atom('do'), new EMOLA.Atom('int', 1), new EMOLA.Atom('int', 2), new EMOLA.Atom('int', 3));
    expect(doList.eval(EMOLA.Global.env)).toEqual(3);
  });
});


