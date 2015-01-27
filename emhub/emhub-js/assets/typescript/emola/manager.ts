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

    private canvasLayerSet: CanvasLayerSet

    constructor(socket: Socket) {
      this.graphList = []
      this.socket = socket

      this.canvasLayerSet = new CanvasLayerSet();
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

      this.canvasLayerSet.set(this.graphList);
      this.canvasLayerSet.draw(context);
    }

    getListObject(point: Point, drawing:Drawable) {
      //for (var i in this.canvasLayerSet.toolLayer) {



      for (var i in this.graphList) {
        var targetListObject = this.graphList[i].getListObject(point)
        if (targetListObject && targetListObject !== drawing) {
          return targetListObject
        }
      }
    }
  }
}
