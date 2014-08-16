EMOLA.FigureTree = function () {
  this.children = [];
  this.circle = new EMOLA.Circle(new EMOLA.Point(Math.radom()*1000, Math.radom()*1000), 100, new EMOLA.Color(100, 100, 100));
  this.outer = outer;
}
EMOLA.FigureTree.prototype.addChildren = function (children) {
  this.children.push(children);
}

function drawTree() {
  var parsed = [
    new EMOLA.Atom(EMOLA.Atom.DO, null),
      [new EMOLA.Atom(EMOLA.Atom.DEF, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'),
        [new EMOLA.Atom(EMOLA.Atom.FN, null),
          [new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')],
          [new EMOLA.Atom(EMOLA.Atom.MUL, null), new EMOLA.Atom(EMOLA.Atom.VAR, 'x'), new EMOLA.Atom(EMOLA.Atom.VAR, 'y')]]], 
      [new EMOLA.Atom(EMOLA.Atom.VAR, 'hoge'), new EMOLA.Atom(EMOLA.Atom.INT, 100), new EMOLA.Atom(EMOLA.Atom.INT, 2)]
  ];
}

function eval(eleList, figureTree) {
  var target = eleList[0];
  var restList = eleList.slice(1);
  if (target instanceof Array) {
    return eval(restList);
  } else if (target instanceof EMOLA.Atom) {
    figureTree.add()
    return eval(restList, new EMOLA.FigureTree(figureTree));
  }
}

