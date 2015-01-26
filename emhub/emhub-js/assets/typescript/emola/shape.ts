///<reference path="canvas.ts"/>
///<reference path="canvas.ts"/>

module emola {
  export interface Drawable {
    draw(context: CanvasContext);
  }

  export interface Figure {
    point: Point
    size: Size
  }

  export class Point {
    x: number;
    y: number;

    static copy(point: Point) {
      return new Point(point.x, point.y);
    }

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y
    }

    move(point: Point) {
      this.x = point.x;
      this.y = point.y
    }

    add(point: Point) {
      this.x += point.x;
      this.y += point.y
    }
  }

  export class Size {
    width: number;
    height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height
    }

    move(size: Size) {
      this.width = size.width;
      this.height = size.height
    }
  }

  export class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r=0, g=0, b=0, a=1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a
    }

    move(color: Color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a
    }
  }


  export class Rect implements Drawable {
    point: Point;
    size: Size;
    color: Color;

    constructor(point: Point, size: Size, color: Color) {
      this.point = point;
      this.size = size;
      this.color = color
  }

    move(point: Point, size: Size, color: Color) {
      this.point.move(point);
      this.size.move(size);
      this.color.move(color)
    }

    isContact(point: Point):boolean {
      return !!(this.point.x <= point.x && point.x <= this.point.x + this.size.width
      && this.point.y <= point.y && point.y <= this.point.y + this.size.height);
    }
    
    draw(context: CanvasContext) {
      context.drawRect(this)
    }
  }

  export class Text implements Drawable {
    static DEFAULT_FONT_TYPE ="Hiragino Kaku Gothic ProN";
    static DEFAULT_FONT_SIZE =12;

    description: string;
    point: Point;
    color: Color;
    fontSize: number;
    fontType: string;

    constructor(description: string, point: Point, color: Color, fontSize=Text.DEFAULT_FONT_SIZE, fontType=Text.DEFAULT_FONT_TYPE) {
      this.description = description;
      this.point = point;
      this.color = color
      this.fontSize = fontSize;
      this.fontType = fontType;
    }

    draw(context: CanvasContext) {
      context.drawText(this)
    }
  }

  export class Circle implements Figure, Drawable {
    point = new Point(0,0);
    size = new Size(100,100);
    radius: number;
    color: Color;

    constructor(point: Point, radius: number, color: Color) {
      this.point = point;
      this.size =new Size(2*radius, 2*radius);
      this.radius = radius;
      this.color = color
    }
  
    move(point:Point, radius, color) {
      this.point.move(point);
      this.radius = radius;
      this.color.move(color)
    }
  
    draw(context: CanvasContext) {
      context.drawCircle(this)

    }
    isMet(point: Point) {
      return !!(this.point.x - this.radius <= point.x && point.x <= this.point.x + this.radius && this.point.y - this.radius <= point.y && point.y <= this.point.y + this.radius);
    }
  }

  export class Line implements Drawable {
    from: Point;
    to: Point;

    constructor(from: Point, to: Point) {
      this.from = from;
      this.to = to
    }
    
    draw(context: CanvasContext) {
      context.drawLine(this)
    }
  }

  export class CanvasContext {
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private offsetLeft: number;
    private offsetTop: number;

    static create(canvas:any) {
      if (!canvas || !canvas.getContext) {
        return null;
      }
      return new CanvasContext(canvas.getContext('2d'));
    }

    constructor(context: CanvasRenderingContext2D) {
      this.context = context;
      this.width = context.canvas.width;
      this.height = context.canvas.height;
      this.offsetLeft = context.canvas.offsetLeft;
      this.offsetTop = context.canvas.offsetTop
    }
    
    drawCircle(circle: Circle) {
      this.context.beginPath();
      this.context.fillStyle = 'rgba(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ' ,' + circle.color.a + ')';
      this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI*2, false);
      this.context.fill()
    } 
    
    drawRect(rect: Rect) {
      this.context.fillStyle = 'rgb(' + rect.color.r + ' ,' + rect.color.g + ' ,' + rect.color.b + ')';
      this.context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height)
    }
    
    drawLine(line: Line) {
      this.context.beginPath();
      this.context.moveTo(line.from.x, line.from.y);
      this.context.lineTo(line.to.x, line.to.y);
      this.context.stroke()
    }
    
    drawText(textObject: Text) {
      this.context.fillStyle = 'rgb(' + textObject.color.r + ' ,' + textObject.color.g + ' ,' + textObject.color.b + ')';
      this.context.font = textObject.fontSize+"px "+ "\'" + textObject.fontType + "\'";
      this.context.fillText(textObject.description, textObject.point.x, textObject.point.y, 200)
    }

    drawImage(path: string, point, Point) {
      var img = new Image();
      img.src = path;
      this.context.drawImage(img, point.x, point.y)
    }


    clear() {
      var sizeWidth = this.context.canvas.clientWidth;
      var sizeHeight = this.context.canvas.clientHeight;
      this.context.clearRect(0, 0, sizeWidth, sizeHeight)
    }
  }

  export class CanvasLayer {
    drawableList: Drawable[];

    constructor() {
      this.drawableList = [];
    }

    draw(canvasContext: CanvasContext) {
      this.drawableList.forEach(e => e.draw(canvasContext));
    }

    add(drawable: Drawable) {
      this.drawableList.push(drawable);
    }

    set(drawableList: Drawable[]) {
      this.drawableList = drawableList;
    }

    remove(drawable: Drawable) {
      for (var i in this.drawableList) {
        if (this.drawableList[i] === drawable) {
          this.drawableList.splice(i,1);
          return;
        }
      }
    }
    clear() {
      this.drawableList = [];
    }
  }

  export class CanvasLayerSet {
    toolLayer: CanvasLayer
    expLayer: CanvasLayer

    constructor() {
      this.toolLayer = new CanvasLayer();
      var palette = this.createPalette();
      this.toolLayer.add(palette);
      this.expLayer = new CanvasLayer();
    }

    createPalette() {
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
    }
  }
}
