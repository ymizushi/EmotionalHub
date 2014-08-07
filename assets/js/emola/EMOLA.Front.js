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
