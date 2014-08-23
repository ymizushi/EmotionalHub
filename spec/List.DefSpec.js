describe("List.Def Spec", function () {
  it("integration", function() {
    var defList = new EMOLA.List.Def([new EMOLA.Atom(EMOLA.Atom.DEF), new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 2)]);
      defList.eval(EMOLA.Global.env);
      expect(EMOLA.Global.env.get('hoge')).toEqual(2);
  });
});

