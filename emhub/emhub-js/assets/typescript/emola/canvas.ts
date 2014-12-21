///<reference path="shape.ts"/>
module emola {
  export interface Widget {
    rect: Rect

    clicked(inputManager: InputManager): Widget
    draw(contextWrapper: ContextWrapper): void
    is_contact(point: Point): boolean
  }

  export enum SyntaxNode {
    Plus,
    Minus,
    Div,
    Mul
  }

  export class PaletteWidget implements Widget {
    rect = new Rect(new Point(200,200), new Size(10,10), new Color(10,10,10,1))
    syntaxNode: SyntaxNode

    constructor(syntaxNode: SyntaxNode) {
      this.syntaxNode = syntaxNode
    }

    clicked(inputManager: InputManager): Widget {
      if (this.is_contact(inputManager.clicked())) {
        return this
      }
      return null
    }

    draw(contextWrapper: ContextWrapper) {
      this.rect.draw(contextWrapper)
    }

    is_contact(point: Point): boolean {
      return this.rect.is_contact(point)
    }

  }

  export class Palette implements Widget {
    rect = new Rect(new Point(0,0), new Size(200,200), new Color())

    paletteWidgetList: PaletteWidget[]

    constructor() {
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

    draw(contextWrapper: ContextWrapper) {
      this.rect.draw(contextWrapper)
      // for(var paletteWidget in this.paletteWidgetList) {
      //   // paletteWidget.draw(contextWrapper)
      //     console.log(paletteWidget)
      // }
    }

    is_contact(point: Point): boolean {
      return this.rect.is_contact(point)
    }
  }

  export class CanvasWindow implements Widget {
    rect = new Rect(new Point(0,0), new Size(200,200), new Color())

    palette: Palette

    constructor(palette: Palette) {
      this.palette = palette
    }

    draw(contextWrapper: ContextWrapper) {
      contextWrapper.drawRect(contextWrapper)
    }

    clicked(inputManager: InputManager): Widget {
      var widget: Widget = this.palette.clicked(inputManager)
      if (widget) {
        return widget
      }
      return null
    }

    is_contact(point: Point): boolean {
      return this.rect.is_contact(point)
    }
  }
}
