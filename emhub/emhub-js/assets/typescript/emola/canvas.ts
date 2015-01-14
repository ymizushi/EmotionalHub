///<reference path="shape.ts"/>
///<reference path="input.ts"/>

module emola {
  class SyntaxNodeType {
    static PLUS = '+';
    static MINUS = '-';
    static DIV = '/';
    static MUL = '*';
    static CIRCLE = 'circle';
  }

  export class PaletteComponent implements WidgetComponent {
    syntaxNodeType: string;

    constructor(syntaxNodeType: string) {
      this.syntaxNodeType = syntaxNodeType
    }

    draw(contextWrapper: CanvasContext, rect: Rect) {
      rect.draw(contextWrapper);
      var point:Point = new Point(rect.point.x+(rect.size.width/2), rect.point.y+(rect.size.height/2));
      var text: Text = new Text(this.syntaxNodeType, point, new Color(200,200,200,1), 20);

      text.draw(contextWrapper);
    }
  }

  export interface WidgetComponent {
  }

  export interface Widget {
    rect : Rect

    click(mouseInput: MouseInput): WidgetComponent
    draw(contextWrapper: CanvasContext): void
  }

  export class Palette implements Widget {
    rect = new Rect(new Point(0,0), new Size(150,1000), new Color());
    paletteComponentList: PaletteComponent[];

    constructor(rect: Rect) {
      this.rect = rect;
      this.paletteComponentList = [];
    }

    click(mouseInput: MouseInput): WidgetComponent {
      var perHeight = this.rect.size.height/this.paletteComponentList.length;
      for (var i in this.paletteComponentList) {
        var size = new Size(this.rect.size.width, perHeight);
        var rect = new Rect(new Point(this.rect.point.x, this.rect.point.y+perHeight*i), size, new Color(100,100,100,1));
        if (rect.point.x <= mouseInput.clickPoint.x &&  mouseInput.clickPoint.x <= rect.point.x+rect.size.width && rect.point.y <= mouseInput.clickPoint.y && mouseInput.clickPoint.y <= rect.point.y+rect.size.height) {
          return this.paletteComponentList[i];
        }
      }
      return null;
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
      var palette: Palette = new Palette(new Rect(new Point(0,0), new Size(50,251), new Color(10,97,50,1)));
      var paletteComponentPlus = new PaletteComponent(SyntaxNodeType.PLUS);
      var paletteComponentMinus = new PaletteComponent(SyntaxNodeType.MINUS);
      var paletteComponentMul = new PaletteComponent(SyntaxNodeType.MUL);
      var paletteComponentDiv = new PaletteComponent(SyntaxNodeType.DIV);
      var paletteComponentCircle = new PaletteComponent(SyntaxNodeType.CIRCLE);

      palette.add(paletteComponentPlus);
      palette.add(paletteComponentMinus);
      palette.add(paletteComponentMul);
      palette.add(paletteComponentDiv);
      palette.add(paletteComponentCircle);
      palette.draw(canvasContext);

      // rect.draw(contextWrapper);
      // var point:Point = new Point(rect.point.x+(rect.size.width/2), rect.point.y+(rect.size.height/2));
      // var text: Text = new Text(this.syntaxNodeType, point, new Color(200,200,200,1), 20);
      // text.draw(contextWrapper);

    }

    constructor(palette: Palette) {
      this.paletteList.push(palette);
    }
  }

}
