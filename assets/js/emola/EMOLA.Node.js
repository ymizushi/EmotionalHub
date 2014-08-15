EMOLA.Node = function (parent, token) {
  this.parent = parent;
  this.token = token;
  this.children = [];
}
EMOLA.Node.prototype.addChildren = function (children) {
  this.children.push(children);
}
