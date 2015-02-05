describe("TreeSerializer Spec", function () {
  it("serializer spec", function() {
    var doList = new emola.GraphDoList([new emola.Atom('do'), new emola.Atom(emola.AtomType.NUMBER, 1), new emola.Atom(emola.AtomType.NUMBER, 2), new emola.Atom(emola.AtomType.NUMBER, 3)]);
    var treeSerializer = new emola.TreeSerializer(doList);
      expect(treeSerializer.serialize()).toEqual("(do 1 2 3 )");
  });
});
