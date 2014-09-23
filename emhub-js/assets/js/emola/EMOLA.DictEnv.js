EMOLA.DictEnv = function (outer) {
  this.outer = outer;
  this.dict = {}; 
};

EMOLA.DictEnv.prototype.update = function (key, value) {
  this.dict[key] = value;
};

EMOLA.DictEnv.prototype.get = function (key) {
  return this.dict[key];
};

EMOLA.DictEnv.prototype.find = function (key) {
  if (this.outer === null && !this.dict[key]) {
    throw 'symbol:' + key +  ' is not defined.';
  }
  if (this.dict[key]) {
    return this;
  }
  return this.outer.find(key);
};
