///<reference path="shape.ts"/>
///<reference path="input.ts"/>

module emola {
  export enum SyntaxNodeType {
    Plus,
    Minus,
    Div,
    Mul
  }

  export class WidgetManager {

  }

  export interface Widget {
    rect : Rect

    clicked(inputManager: InputManager): Widget
    draw(contextWrapper: CanvasContext): void
  }


  export class PaletteComponent {
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
    rect = new Rect(new Point(0,0), new Size(150,1000), new Color());

    paletteComponentList: PaletteComponent[];

    constructor() {
    }

    clicked(inputManager: InputManager): any {
    }

    add(paletteComponent: PaletteComponent) {
      this.paletteComponentList.push(paletteComponent)
    }

    draw(contextWrapper: CanvasContext) {
      this.rect.draw(contextWrapper);
    }
  }

  export class CanvasWindow {
    palette: Palette;

    constructor(palette: Palette) {
      this.palette = palette
    }
  }
}
