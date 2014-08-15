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

var circle = new EMOLA.Circle(new EMOLA.Point(100, 100), 100, EMOLA.Color(100, 100, 100));
function loop(){
  circle.point.x += 10;
  setTimeout(loop,1000);
}
