EMOLA.Exception = {};

EMOLA.Exception.InvalidArgumentException = function () {
  Error.apply(this, arguments);
}
EMOLA.Exception.InvalidArgumentException.prototype = new Error;

EMOLA.Exception.InvalidTypeException = function () {
  Error.apply(this, arguments);
}
EMOLA.Exception.InvalidTypeException.prototype = new Error;
