EMOHUB === undefined ? alert('not defined'): 'success!';

EMOHUB.Pallet = function (palletElement, width, height) {
  this.palletElement = palletElement;
  this.width = width;
  this.height = height;
  this.palletFieldHash = {};
};

EMOHUB.Pallet.prototype = {
  constructor: EMOHUB.Pallet,

  getElement: function () {
    return this.palletElement;
  },

  init: function () {
    for (var i=this.palletElement.childNodes.length-1;i>=0;i--) {
      pallet.removeChild(pallet.childNodes[i]);
    }

  },

  refresh: function () {
    for (var i=0;i<this.palletFieldHash.length;i++) {
      icon = this.palletFieldHash[i];
    }
  },

  addIcon: function (icon, x, y) {
    var key = x + "_" + y;
    this.palletFieldHash[key] = icon;
  }
};
