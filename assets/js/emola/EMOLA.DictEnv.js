EMOLA.DictEnv = function (outer) {
  this.outer = outer;
  this.dict = {}; 
};
EMOLA.DictEnv.prototype.find = function (key) {
  if (this.outer === null && !this.dict[key]) {
    throw 'symbol is not defined.';
  }
  if (this.dict[key]) {
    return this.dict;
  }
  return this.outer.find(key);
};
