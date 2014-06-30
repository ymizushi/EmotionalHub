EMOHUB === undefined ? (throw "Not defined.")

EMOHUB.Tag = function (tagName, attribute, value) {
  this.tagName = tagName;
  this.attribute = attribute;
  this.value = value;
};

EMOHUB.Tag.prototype = {
  constructor: EMOHUB.Tag
};
