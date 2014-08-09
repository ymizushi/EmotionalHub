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
  return canvas.getContext('2d');
}

EMOLA.Front = {};
EMOLA.Front.draw = function (figure, point, context) {
  if (context === null) {
    globalContext = makeContext('canvas');
    context = globalContext;
  }

  context.clearRect(figure.point.x, figure.point.y, figure.width, figure.height);
  figure.point.move(point);

  context.beginPath();
  context.fillStyle = 'rgb(' + figure.color.r + ' ,' + figure.color.g + ' ,' + figure.color.b + ')';
  context.arc(figure.point.x, figure.point.y, figure.radius, 0, Math.PI*2, false);
  context.fill();
}
