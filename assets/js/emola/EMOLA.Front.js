EMOLA.Front = {};

$(document).ready(function() {
  if (EMOLA.Global.graphicContext === null) {
    EMOLA.Global.graphicContext = EMOLA.createContextWrapper('canvas');
    if(EMOLA.Global.graphicContext !== null) {
      EMOLA.Front.drawLoop();
    }
  }

  var commandContainer = $('<div class="console">');
  $('body').append(commandContainer);
  commandContainer.console({
    promptLabel: 'Emola> ',
    commandValidate: function(line) {
      return line !== "";
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
      return [{ msg:"=> " + result, className:"jquery-console-message-value"} ];
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
  setTimeout(EMOLA.Front.drawLoop, 30);
  EMOLA.Global.graphicContext.clear();
  EMOLA.Global.drawingManager.draw(EMOLA.Global.graphicContext);
};


window.onkeydown = function (event) {
};

window.onclick = function (event) {
};

function getDrawing() {
  var point = getPosition();
  return EMOLA.Global.drawingManager.getDrawing(point);
}

function getPosition() {
  var clientX = event.clientX;
  var clientY = event.clientY;
  var offsetLeft = EMOLA.Global.graphicContext.offsetLeft;
  var offsetTop = EMOLA.Global.graphicContext.offsetTop;
  return new EMOLA.Point(clientX-offsetLeft, clientY-offsetTop);
}

var drugging = null;
window.onmousedown = function (event) {
  EMOLA.Global.drugging = true;
  var drawing = getDrawing();
  if (drawing) {
    drugging = drawing;
  }
};

window.onmouseup = function (event) {
  EMOLA.Global.drugging = false;
  if (drugging) {
    var drawing = getDrawing();
    if (drawing && drugging != drawing) {
      drawing.add(drugging);
      EMOLA.Global.drawingManager.remove(drugging);
    }
    drugging = null;
  }
};

window.onmousemove = function (event) {
  if (drugging) {
    drugging.point = getPosition();
  }
};

EMOLA.createContextWrapper = function (canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) {
    return null;
  }
  return new EMOLA.ContextWrapper(canvas.getContext('2d'));
};
