describe("GraphExpList Spec", function() {
  it("integration", function() {
    var list = new emola.GraphExpList([1,2,3,4]);
    expect(list.pop()).toEqual(4);
    expect(list.expList).toEqual([1,2,3]);
    expect(list.push(5)).toEqual(4);
    expect(list.expList).toEqual([1,2,3,5]);
  });
});

describe("createListTypeObject test", function() {
  it("constructor", function() {
    var parent = emola.ExpList.create([new emola.Atom(emola.AtomType.MINUS, null), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom(emola.AtomType.NUMBER, 2)], null);
    var result = emola.ExpList.create([new emola.Atom(emola.AtomType.MINUS, null), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom(emola.AtomType.NUMBER, 2)], parent);
    var expected = new emola.GraphMinusList([new emola.Atom(emola.AtomType.MINUS, null), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom(emola.AtomType.NUMBER, 2)], parent);
    expected.id = result.id;
    expect(result).toEqual(expected);
    expect(expected.evalSyntax(new emola.Env(null))).toEqual(-1);

  });
});

