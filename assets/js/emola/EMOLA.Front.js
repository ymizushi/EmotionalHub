EMOLA.Front = {};

$(document).ready(function(){
   /* First console */
   var commandContainer = $('<div class="console">');
   $('body').append(commandContainer);
   var controller1 = commandContainer.console({
     promptLabel: 'Emola> ',
     commandValidate: function(line) {
       return line != "";
     },
     commandHandle:function(line) {
       return [{msg:"=> " + EMOLA.readAndEval(line, EMOLA.Global.env), className:"jquery-console-message-value"} ]
     },
     autofocus: true,
     animateScroll: true,
     promptHistory: true,
     charInsertTrigger:function(keycode,line) {
       return true;
     }
   });
});

// TODO: 下の二つなんとかする
window.onkeydown = function () {
  if (EMOLA.Global.graphicContext === null) {
    EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
  }
}

window.onclick = function () {
  if (EMOLA.Global.graphicContext === null) {
    EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
  }

  var childList = new EMOLA.List([new EMOLA.Atom(EMOLA.Atom.PLUS, null), new EMOLA.Atom(EMOLA.Atom.INT, 2) ,new EMOLA.Atom(EMOLA.Atom.INT, 3)]);
  var testList = new EMOLA.List(
    [new EMOLA.Atom(EMOLA.Atom.MINUS, null), new EMOLA.Atom(EMOLA.Atom.INT, 2), new EMOLA.Point(400, 200), childList],
    new EMOLA.Point(400, 200)
  )
  childList.parent = testList;

  var circle = new EMOLA.Circle(new EMOLA.Point(100, 100), 100, new EMOLA.Color(100, 100, 100));
  var rect = new EMOLA.Rect(new EMOLA.Point(500, 100), new EMOLA.Size(100, 100), new EMOLA.Color(100, 100, 100));
  function loop(){
    // circle.point.x += 10;
    // rect.draw(EMOLA.Global.graphicContext);
    // circle.draw(EMOLA.Global.graphicContext)
    EMOLA.Global.graphicContext.clear();
    testList.rotate(0.01);
    testList.draw(EMOLA.Global.graphicContext);
    setTimeout(loop,10);
  }
  loop();
}

EMOLA.createContextWrapper = function (canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) {
    return new EMOLA.ContextWrapper(null);
  }
  return new EMOLA.ContextWrapper(canvas.getContext('2d'));
};
