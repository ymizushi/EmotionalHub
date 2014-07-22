EMOHUB === undefined ? (throw "Not defined.")

var zip = function (a, b) {
  var z = [];
  for (var i = 0; i < a.length; ++i) {
     z.push([a[i], b[i]]);
  }
  return z;
}

EMOHUB.Env = function (params, args, outer) {
  this.dict = zip(params, args);
  this.outer = outer;
};

EMOHUB.Env.prototype = {
  constructor: EMOHUB.Env,
  find : function (key) {
    if (this.dict[key]) {
      return this;
    } else {
      this.outer.find(key);
    }
  },
  update : function(dict) {
    for (var key in dict) {
      this.dict[key] = dict[key];
    }
  }
};
