EMOLA.List.Fn = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Fn.prototype = new EMOLA.List();

EMOLA.List.Fn.prototype.eval = function (env) {
  this.assert();
  var expList = this.list.slice(1);
  var result = expList.map(function (elem) { return elem.eval(env) });
  return result[result.length-1]; // 配列の最後の要素を取り出す
}

EMOLA.List.Fn.prototype.assert = function () {
}
