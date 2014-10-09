EMOLA.List.Do = function () {
  EMOLA.List.apply(this, arguments);
};

EMOLA.List.Do.prototype = new EMOLA.List();

EMOLA.List.Do.prototype.evalSyntax = function (env) {
  this.assert();
  var expList = this.list.slice(1);
  var result = expList.map(function (elem) { return elem.evalSyntax(env);});
  return result[result.length-1]; // 配列の最後の要素を取り出す
};

EMOLA.List.Do.prototype.assert = function () {
};

