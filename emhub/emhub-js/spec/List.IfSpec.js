describe("GraphIfList Spec", function () {
  it("integration", function() {
    var resultTrueTypeIfList = new emola.GraphIfList([new emola.Atom('if'), new emola.Atom('true'), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom('false')]);
    expect(resultTrueTypeIfList.evalSyntax(new emola.Env(null))).toEqual(1);

    var resultFalseTypeIfList = new emola.GraphIfList([new emola.Atom('if'), new emola.Atom('false'), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom('false')]);
    expect(resultFalseTypeIfList.evalSyntax(new emola.Env(null))).toEqual(false);

    var resultTrueTypeIfNestedList = new emola.GraphIfList([new emola.Atom('if'), new emola.Atom('true'), new emola.GraphIfList([new emola.Atom('if'), new emola.Atom('true'), new emola.Atom(emola.AtomType.NUMBER, 10), new emola.Atom('false')]), new emola.Atom('false')]);
    expect(resultTrueTypeIfNestedList.evalSyntax(new emola.Env(null))).toEqual(10);
  });
});


