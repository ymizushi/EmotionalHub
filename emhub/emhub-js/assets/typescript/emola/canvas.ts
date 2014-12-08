module emola {
  export interface Widget {
    x: number
    y: number
    width: number
    height: number

    clicked(inputManager: InputManager): Widget
  }

  export enum SyntaxNode {
    Plus,
    Minus,
    Div,
    Mul
  }

  export class PaletteWidget implements Widget {
    x = 0
    y = 0
    width = 200
    height = 200

    syntaxNode: SyntaxNode

    constructor(syntaxNode: SyntaxNode) {
      this.syntaxNode = syntaxNode
    }

    clicked(inputManager: InputManager): Widget {
      if (this.exists(inputManager.clicked())) {
        return this
      }
      return null
    }

    exists(point: Point): boolean {
      if (this.x <= point.x && point.x <= this.x+this.width
          && this.y <= point.y && point.y <= this.y + this.height) {
        return true
      } else {
        return false
      }
    }

  }

  export class Palette implements Widget {
    x = 0
    y = 0
    width = 200
    height = 200

    paletteWidgetList: PaletteWidget[]

    constructor(paletteWidgetList=[]) {
      this.paletteWidgetList = paletteWidgetList
    }

    clicked(inputManager: InputManager): Widget {
      var clickedPoint: Point = inputManager.clicked()
      for(var paletteWidget in this.paletteWidgetList) {
        var widget: Widget = paletteWidget.clicked(inputManager)
        if (widget) {
          return widget
        }
      }
      return null
    }

    add(paletteWidget: PaletteWidget) {
      this.paletteWidgetList.push(paletteWidget)
    }
  }

  export class CanvasWindow implements Widget {
    x = 0
    y = 0
    width = 200
    height = 200

    palette: Palette

    constructor(palette: Palette) {
      this.palette = palette
    }

    clicked(inputManager: InputManager): Widget {
      var widget: Widget = this.palette.clicked(inputManager)
      if (widget) {
        return widget
      }
      return null
    }
  }
}
