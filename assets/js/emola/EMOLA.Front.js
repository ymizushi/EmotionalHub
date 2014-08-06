function read_eval(input) {
  return input;
}

$(document).ready(function(){
   /* First console */
   var console1 = $('<div class="console1">');
   $('body').append(console1);
   var controller1 = console1.console({
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
