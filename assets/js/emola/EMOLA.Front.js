var globalEnv = new EMOLA.DictEnv(null);

$(document).ready(function(){
   /* First console */
   var commandContainer = $('<div class="console">');
   $('body').append(commandContainer);
   var controller1 = commandContainer.console({
     promptLabel: 'Emola> ',
     commandValidate: function(line){
       if (line == "") return false;
       else return true;
     },
     commandHandle:function(line){

      draw();


       return [{msg:"=> " + EMOLA.readAndEval(line, globalEnv), className:"jquery-console-message-value"} ]
     },
     autofocus:true,
     animateScroll:true,
     promptHistory:true,
     charInsertTrigger:function(keycode,line){
       return true;
     }
   });
 });


function draw() {
  var canvas = document.getElementById('canvas');
  if (!canvas || !canvas.getContext ) {
    throw "This browser doesn't support HTML5 canvas";
  }
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
  ctx.arc(70, 45, 35, 0, Math.PI*2, false);
  ctx.fill();
}

// window.onload = function() {
//     draw();
// };
