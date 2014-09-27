describe("List.If Spec", function () {
  it("integration", function() {
    var resultTrueTypeIfList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom('false')]);
    expect(resultTrueTypeIfList.evalSyntax(EMOLA.Global.env)).toEqual(1);

    var resultFalseTypeIfList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('false'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 1), new EMOLA.Atom('false')]);
    expect(resultFalseTypeIfList.evalSyntax(EMOLA.Global.env)).toEqual(false);

    var resultTrueTypeIfNestedList = new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.List.If([new EMOLA.Atom('if'), new EMOLA.Atom('true'), new EMOLA.Atom(EMOLA.Atom.NUMBER, 10), new EMOLA.Atom('false')]), new EMOLA.Atom('false')]);
    expect(resultTrueTypeIfNestedList.evalSyntax(EMOLA.Global.env)).toEqual(10);
  });
});


