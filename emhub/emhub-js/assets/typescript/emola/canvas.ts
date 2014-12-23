///<reference path="shape.ts"/>
///<reference path="input.ts"/>

module emola {
  export enum SyntaxNodeType {
    Plus,
    Minus,
    Div,
    Mul
  }

  export interface Widget {
    rect : Rect

    clicked(inputManager: InputManager): Widget
    draw(contextWrapper: CanvasContext): void
  }

  export class PalettComponent {
    size = new Size(100,100);
    syntaxNodeType: SyntaxNodeType;

    constructor(syntaxNodeType: SyntaxNodeType) {
      this.syntaxNodeType = syntaxNodeType
    }

    draw(contextWrapper: CanvasContext, point: Point) {
      contextWrapper.drawRect(new Rect(point, this.size, new Color()));
    }
  }

  export class Palette implements Widget {
    rect = new Rect(new Point(0,0), new Size(200,200), new Color());

    paletteComponentList: PalettComponent[];

    constructor() {
    }

    clicked(inputManager: InputManager): Widget {
      var clickedPoint: Point = inputManager.clicked();
      this.paletteComponentList.forEach(function (paletteComponent) {
        var widget:Widget = paletteComponent.clicked(inputManager);
        if (widget) {
          return widget
        }
      });
      return null
    }

    add(paletteWidget: PalettComponent) {
      this.paletteWidgetList.push(paletteWidget)
    }

    draw(contextWrapper: CanvasContext) {
      this.rect.draw(contextWrapper);
      // for(var paletteWidget in this.paletteWidgetList) {
      //   // paletteWidget.draw(contextWrapper)
      //     console.log(paletteWidget)
      // }
    }

    isContact(point:emola.Point):boolean {
      return this.rect.isContact(point)
    }
  }

  //export class CanvasWindow implements Widget {
  //  rect = new Rect(new Point(0,0), new Size(200,200), new Color());
  //
  //  palette: Palette;
  //
  //  constructor(palette: Palette) {
  //    this.palette = palette
  //  }
  //
  //  //draw(contextWrapper: CanvasContext) {
  //  //  contextWrapper.drawRect(this)
  //  //}
  //
  //  clicked(inputManager: InputManager): Widget {
  //    var widget: Widget = this.palette.clicked(inputManager);
  //    if (widget) {
  //      return widget
  //    }
  //    return null
  //  }
  //
  //  isContact(point: Point): boolean {
  //    return this.rect.isContact(point)
  //  }
  //}
  //}
}
