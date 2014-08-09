var globalEnv = new EMOLA.DictEnv(null);
var globalContext = null;

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
       return [{msg:"=> " + EMOLA.readAndEval(line, globalEnv), className:"jquery-console-message-value"} ]
     },
     autofocus: true,
     animateScroll: true,
     promptHistory: true,
     charInsertTrigger:function(keycode,line) {
       return true;
     }
   });
 });

function makeContext(canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) {
    throw "This browser doesn't support HTML5 canvas";
  }
  return new EMOLA.ContextWrapper(canvas.getContext('2d'));
}

EMOLA.Front = {};

window.onload = function () {
  globalContext = makeContext('canvas');
}
