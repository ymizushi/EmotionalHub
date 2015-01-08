///<reference path="shape.ts"/>
///<reference path="input.ts"/>

module emola {
  export enum SyntaxNodeType {
    Plus,
    Minus,
    Div,
    Mul
  }

  export class PaletteComponent {
    syntaxNodeType: SyntaxNodeType;

    constructor(syntaxNodeType: SyntaxNodeType) {
      this.syntaxNodeType = syntaxNodeType
    }

    draw(contextWrapper: CanvasContext, rect: Rect) {
      rect.draw(contextWrapper);
      var point:Point = new Point(rect.point.x+(rect.size.width/2), rect.point.y+(rect.size.height/2));
      var text: Text = new Text("+", point, new Color(200,200,200,1), 20);

      text.draw(contextWrapper);
    }
  }
  export interface Widget {
    rect : Rect

    clicked(inputManager: InputManager): Widget
    draw(contextWrapper: CanvasContext): void
  }

  export class Palette implements Widget {
    rect = new Rect(new Point(0,0), new Size(150,1000), new Color());

    paletteComponentList: PaletteComponent[];

    constructor(rect: Rect) {
      this.rect = rect;
      this.paletteComponentList = [];
    }

    clicked(inputManager: InputManager): any {
    }

    add(paletteComponent: PaletteComponent) {
      this.paletteComponentList.push(paletteComponent);
    }

    draw(canvasContext: CanvasContext) {
      this.rect.draw(canvasContext);
      var perHeight = this.rect.size.height/this.paletteComponentList.length;
      for (var i in this.paletteComponentList) {
        var size = new Size(this.rect.size.width, perHeight);
        var rect = new Rect(new Point(this.rect.point.x, this.rect.point.y+perHeight*i), size, new Color(100,100,100,1));
        this.paletteComponentList[i].draw(canvasContext, rect)
      }
    }
  }

  export class CanvasWindow {
    paletteList: Palette[];

    static createCanvasWindow(canvasContext: CanvasContext) {
      var palette: Palette = new Palette(new Rect(new Point(100,100), new Size(50,200), new Color(10,80,50,1)));
      var paletteComponentPlus = new PaletteComponent(SyntaxNodeType.Plus);
      var paletteComponentMinus = new PaletteComponent(SyntaxNodeType.Minus);
      var paletteComponentDiv = new PaletteComponent(SyntaxNodeType.Div);

      palette.add(paletteComponentPlus);
      palette.add(paletteComponentMinus);
      palette.add(paletteComponentDiv);
      palette.draw(canvasContext);

    }

    constructor(palette: Palette) {
      this.paletteList.push(palette);
    }
  }

}
