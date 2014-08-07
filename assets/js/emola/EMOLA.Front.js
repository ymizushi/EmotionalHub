var globalEnv = new EMOLA.DictEnv(null);

function read_eval(input) {
  return EMOLA.readAndEval(input, globalEnv);
}

$(document).ready(function(){
   /* First console */
   var console = $('<div class="console">');
   $('body').append(console);
   var controller1 = console.console({
     promptLabel: 'Emola> ',
     commandValidate: function(line){
       if (line == "") return false;
       else return true;
     },
     commandHandle:function(line){

       return [{msg:"=> " + read_eval(line), className:"jquery-console-message-value"} ]
     },
     autofocus:true,
     animateScroll:true,
     promptHistory:true,
     charInsertTrigger:function(keycode,line){
       return true;
     }
   });
 });
