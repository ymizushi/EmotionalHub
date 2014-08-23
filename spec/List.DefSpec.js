describe("List.Def Spec", function () {
  it("integration", function() {
      var defList = new EMOLA.List.Def([new EMOLA.Atom('def'), new EMOLA.Atom('var', 'hoge'), new EMOLA.Atom('int', 2)]);
      defList.eval(EMOLA.Global.env);
      expect(EMOLA.Global.env.get('hoge')).toEqual(2);
  });
});

