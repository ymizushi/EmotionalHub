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
         if (parsedList.draw) {
           EMOLA.Global.drawingManager.add(parsedList);
         }
         result = parsedList.eval(EMOLA.Global.env);
       } catch (e) {
         result = "Parse error";
         console.log(e);
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

EMOLA.Front.drawLoop = function () {
  EMOLA.Global.graphicContext.clear();
  EMOLA.Global.drawingManager.draw(EMOLA.Global.graphicContext);
  setTimeout(EMOLA.Front.drawLoop, 30);
}

// TODO: 下の2つなんとかする
window.onkeydown = function () {
  if (EMOLA.Global.graphicContext === null) {
    EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
    EMOLA.Front.drawLoop();
  }
}

window.onclick = function () {
  if (EMOLA.Global.graphicContext === null) {
    EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
  }
}

EMOLA.createContextWrapper = function (canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) {
    return new EMOLA.ContextWrapper(null);
  }
  return new EMOLA.ContextWrapper(canvas.getContext('2d'));
};
