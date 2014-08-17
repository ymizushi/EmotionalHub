EMOLA.List = function (list) {
  this.list = list;
};

EMOLA.List.prototype.push = function (element) {
  return this.list.push(element);
}

EMOLA.List.prototype.pop = function () {
  return this.list.pop();
}
