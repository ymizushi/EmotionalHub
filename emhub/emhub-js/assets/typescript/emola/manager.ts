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

    constructor() {
      this.graphList = []

      this.canvasLayerSet = new CanvasLayerSet();
    }

    addDisplayElement(text: Text) {
      var displayLayer =this.canvasLayerSet.getDisplayLayer();
      displayLayer.add(text);
    }

    add(drawing: any) {
      this.graphList.push(drawing)
    }

    remove(drawing) {
      this.graphList.forEach(function(element) {
        element.remove(drawing);
      })
    }

    clear() {
      this.graphList = []
      this.canvasLayerSet.clear()
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

    getPalette():Palette {
      return this.canvasLayerSet.getPalette();
    }

    getListObject(point: Point, drawing:Drawable) {
      for (var i in this.graphList) {
        var targetListObject
        targetListObject = this.graphList[i].getListObject(point)
        if (targetListObject && targetListObject !== drawing) {
          return targetListObject
        }
      }
    }
  }
}
