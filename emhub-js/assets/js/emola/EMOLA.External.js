EMOLA.External = {};
EMOLA.External.createTestList = function () {
  var childList = new EMOLA.List([new EMOLA.Atom(EMOLA.Atom.PLUS, null), new EMOLA.Atom(EMOLA.Atom.INT, 2) ,new EMOLA.Atom(EMOLA.Atom.INT, 3)]);
  var testList = new EMOLA.List(
    [new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.INT, 2), new EMOLA.Point(400, 200), childList],null,
    new EMOLA.Point(400, 200)
  );
  childList.parent = testList;
  return testList;
};

