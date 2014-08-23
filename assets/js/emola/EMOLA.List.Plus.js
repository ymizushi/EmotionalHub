EMOLA.List.Plus = function () {
  EMOLA.List.apply(this, arguments);
}

EMOLA.List.Plus.prototype = new EMOLA.List();

EMOLA.List.Plus.prototype.eval = function (env) {
  this.assert();
  var sum = this.list.slice(1).reduce(
    function (previousValue, currentValue, index, array) {
      return previousValue.eval(env) + currentValue.eval(env);
    }
  );
  return sum;

}

EMOLA.List.Plus.prototype.assert = function () {
}
