/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>

module emola {
  export class DrawingManager {
    private graphList: GraphExpList[]
    private socket: Socket

    constructor(socket: Socket) {
      this.graphList = []
      this.socket = socket
    }

    add(drawing: any) {
      this.graphList.push(drawing)
      // this.socket.send("hoge")
    }

    remove(drawing) {
      this.graphList.forEach(function(element) {
        element.remove(drawing);
      })
    }

    clear() {
      this.graphList = []
    }

    draw(context: CanvasContext) {
      for (var i=0;i<this.graphList.length;i++) {
        if (this.graphList[i].rotate) {
          this.graphList[i].rotate(0.01)
        }
        this.graphList[i].draw(context)
      }
    }

    getListObject(point: Point, drawing:Drawable) {
      for (var i in this.graphList) {
        var targetListObject = this.graphList[i].getListObject(point)
        if (targetListObject && targetListObject !== drawing) {
          return targetListObject
        }
      }
    }
  }

  export class ConsoleManager {
    callbackList: any
    commandContainer: any

    constructor(htmlString: string, func) {
      this.commandContainer = $(htmlString)
      this.callbackList = func;

      $('#emola-console').append(this.commandContainer);
      this.commandContainer.console({
        promptLabel: 'Emola> ',
        commandValidate: function(line) {
          return line !== "";
        },
        commandHandle:this.callbackList,
        autofocus: true,
        animateScroll: true,
        promptHistory: true,
        charInsertTrigger: function(keycode,line) {
          return true;
        }
      })
    }
    addCallback(callback) {
      this.callbackList = callback
    }
  }
}
