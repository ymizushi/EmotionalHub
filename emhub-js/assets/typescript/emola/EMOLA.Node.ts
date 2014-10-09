EMOLA.Node = function (parent) {
  this.parent = parent;
  this.children = [];
  this.token = null;
};

EMOLA.Node.prototype.addChildren = function (children) {
  this.children.push(children);
};
