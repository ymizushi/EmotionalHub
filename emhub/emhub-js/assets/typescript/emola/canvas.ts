///<reference path="shape.ts"/>
///<reference path="input.ts"/>

module emola {
  export class SyntaxNodeType {
    static PLUS = '+';
    static MINUS = '-';
    static DIV = '/';
    static MUL = '*';
    static CIRCLE = 'circle';
  }

  export interface WidgetComponent {}

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

    toString() {
      return "(" + this.syntaxNodeType + ")";
    }
  }


  export interface Widget {
    rect : Rect

    click(point: Point): WidgetComponent
  }

  export class Palette implements Widget, Drawable {
    rect = new Rect(new Point(0,0), new Size(150,1000), new Color());
    paletteComponentList: PaletteComponent[];

    constructor(rect: Rect) {
      this.rect = rect;
      this.paletteComponentList = [];
    }

    click(point: Point): WidgetComponent {
      var perHeight = this.rect.size.height/this.paletteComponentList.length;
      for (var i in this.paletteComponentList) {
        var size = new Size(this.rect.size.width, perHeight);
        var rect = new Rect(new Point(this.rect.point.x, this.rect.point.y+perHeight*i), size, new Color(100,100,100,1));
        if (rect.point.x <= point.x &&  point.x <= rect.point.x+rect.size.width && rect.point.y <= point.y && point.y <= rect.point.y+rect.size.height) {
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

  export class CanvasLayerSet {
    private toolLayer: CanvasLayer
    private displayLayer: CanvasLayer
    private expLayer: CanvasLayer

    private palette: Palette

    constructor() {
      this.palette = this.createOperatorPalette();

      this.toolLayer = new CanvasLayer();
      this.toolLayer.add(this.palette);

      this.displayLayer = new CanvasLayer();
      this.expLayer = new CanvasLayer();

    }

    createOperatorPalette():Palette {
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
      return palette;
    }

    draw(canvasContext: CanvasContext) {
      this.expLayer.draw(canvasContext);
      this.toolLayer.draw(canvasContext);
      this.displayLayer.draw(canvasContext);
    }

    getDisplayLayer() {
      return this.displayLayer;
    }

    getPalette():Palette {
      return this.palette;
    }

    set(drawableList: Drawable[]) {
      this.expLayer.set(drawableList);
    }

    add(drawable: Drawable) {
      this.expLayer.add(drawable);
    }

    remove(drawable: Drawable) {
      this.expLayer.remove(drawable)
    }

    clear() {
      this.expLayer.clear();
      this.displayLayer.clear();
    }
  }
}

