describe("List.If Spec", function () {
  it("integration", function() {
    var resultTrueTypeIfList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.Atom('int', 1), new EMOLA.Atom('false')]);
    expect(resultTrueTypeIfList.eval(EMOLA.Global.env)).toEqual(1);

    var resultFalseTypeIfList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('false'), new EMOLA.Atom('int', 1), new EMOLA.Atom('false')]);
    expect(resultFalseTypeIfList.eval(EMOLA.Global.env)).toEqual(false);

    var resultTrueTypeIfNestedList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.Atom('int', 10), new EMOLA.Atom('false')]), new EMOLA.Atom('false')]);
    expect(resultTrueTypeIfNestedList.eval(EMOLA.Global.env)).toEqual(10);
  });
});


