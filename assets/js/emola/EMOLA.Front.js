EMOLA.Front = {};

$(document).ready(function() {
   var commandContainer = $('<div class="console">');
   $('body').append(commandContainer);
   commandContainer.console({
     promptLabel: 'Emola> ',
     commandValidate: function(line) {
       return line != "";
     },
     commandHandle:function(line) {
       var result = '';
       try {
         EMOLA.Global.tokenReader.add(line);
         var parsedList = EMOLA.parse(EMOLA.Global.tokenReader);
         parsedList.draw(EMOLA.Global.graphicContext);
         result = parsedList.eval(EMOLA.Global.env);
       } catch (e) {
         result = "Parse error";
       } 
       return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
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

var testList = EMOLA.External.createTestList();
EMOLA.Front.drawLoop = function () {
  EMOLA.Global.graphicContext.clear();
  testList.rotate(0.01);
  testList.draw(EMOLA.Global.graphicContext);
  setTimeout(EMOLA.Front.drawLoop, 10);
}

window.onclick = function () {
  if (EMOLA.Global.graphicContext === null) {
    EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
  }

  EMOLA.Front.drawLoop();
}

EMOLA.createContextWrapper = function (canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) {
    return new EMOLA.ContextWrapper(null);
  }
  return new EMOLA.ContextWrapper(canvas.getContext('2d'));
};
