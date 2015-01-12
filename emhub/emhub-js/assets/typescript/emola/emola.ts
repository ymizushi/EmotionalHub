/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>
/// <reference path="global.ts"/>

module emola {
  var emola:any
  emola = {}

  emola.Front = {};
  emola.Front.drawLoop = function () {
    setTimeout(emola.Front.drawLoop, 15)
    Global.graphicContext.clear()
    CanvasWindow.createCanvasWindow(Global.graphicContext);
    Global.drawingManager.draw(Global.graphicContext)
  }

  $(document).ready(function() {
    if (Global.graphicContext === null) {
      var canvas = document.getElementById('canvas');
      Global.graphicContext = CanvasContext.create(canvas);
      if(Global.graphicContext !== null) {
        emola.Front.drawLoop();
      }
    }
  
    var consoleManager = new ConsoleManager('<div class="console">', function (line) {
        var parsedList;
      var result = ''
        try {
          Global.tokenReader.add(line)
          parsedList = Parser.parse(Global.tokenReader);
          if (parsedList.draw) {
            // var palette = new Palette()
            // var paletteWidget = new PaletteWidget(SyntaxNode.Plus)
            // palette.add(paletteWidget)
            // Global.drawingManager.add(palette)

            Global.drawingManager.add(parsedList)

          }
          result = parsedList.evalSyntax(Global.env)
        } catch (e) {
          result = "Parse error"
          console.log(e)
        } 
        return [{ msg:"=> " + result, className:"jquery-console-message-value"} ]
      })
  });

  class EventManager {
    setMouseUpEventListener(func) {
      $(window).mouseup(func)
    }


    constructor() {

      function getPosition(e:any):Point {
        var pageX = e.pageX;
        var pageY = e.pageY;
        var rect = e.target.getBoundingClientRect();

        var x = pageX - rect.left;
        var y = pageY - rect.top;
        return new Point(x, y)
      }

      function getDrawingObject(drawing:any , e:any):any {
        var point = getPosition(e)
        return Global.drawingManager.getListObject(point, drawing)
      }

      (function () {
        var druggingObject = null

        $(window).mousedown(function (e) {
          Global.drugging = true
          var drawing = getDrawingObject(null, e)
          if (drawing) {
            druggingObject = drawing
          }
        })

        $(window).mouseup(
          function (e) {
            Global.drugging = false
            if (druggingObject) {
              var drawing = getDrawingObject(druggingObject, e)
              if (drawing && druggingObject != drawing) {
                drawing.add(druggingObject)
                // Global.drawingManager.remove(druggingObject);
              }
              druggingObject = null
            }
          }
        )
        
        $(window).mousemove(
          function (e) {
            if (druggingObject) {
              druggingObject.point = getPosition(e)
            }
          }
        )

        $(window).dblclick(
           (e) => {
             console.log("double clicked");
             var drawing = getDrawingObject(druggingObject, e)
             if (drawing) {
               var result = drawing.evalSyntax(Global.env);
               console.log(result);
               var text: Text = new Text(result, drawing.point, new Color());
               Global.drawingManager.add(text);
               // text.draw(Global.graphicContext);
             }
          }
        )
      })()
    }

  }

  new EventManager()
}
