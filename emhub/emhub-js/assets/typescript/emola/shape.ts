///<reference path="canvas.ts"/>

module emola {
  export interface Drawable {
    draw(context: CanvasContext);
  }

  export class Point {
    static copy(point: Point) {
      return new Point(point.x, point.y);
    }

    x: number;
    y: number;

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

    toString() {
      return '{x: ' + this.x + ', y: ' + this.y + '}'
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
    static Red:   Color = new Color(255, 0, 0, 1);
    static Green: Color = new Color(0, 255, 0, 1);
    static Blue:  Color = new Color(0, 0, 255, 1);

    static BaseGlay: Color = new Color(100, 100, 100, 0.3);
    static BaseYellow: Color = new Color(255, 255, 200);

    static copy(color: Color) {
      return new Color(color.r, color.g, color.b, color.a);
    }

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

    constructor(point: Point, size: Size, color: Color=new Color()) {
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
    static DEFAULT_FONT_SIZE =18;

    description: string;
    point: Point;
    color: Color;
    fontSize: number;
    fontType: string;

    constructor(description: string, point: Point, color: Color, fontSize=Text.DEFAULT_FONT_SIZE, fontType=Text.DEFAULT_FONT_TYPE) {
      this.description = description;
      this.point = point;
      this.color = color;
      this.fontSize = fontSize;
      this.fontType = fontType;
    }

    draw(context: CanvasContext) {
      context.drawText(this)
    }
  }

  export class Circle implements Drawable {
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
    color: Color;

    constructor(from: Point, to: Point, color: Color = new Color()) {
      this.from = from;
      this.to = to;
      this.color = color;
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
      this.context.fillText(textObject.description, textObject.point.x, textObject.point.y, 1000)
    }

    drawImage(path: string, point: Point) {
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

  export class CanvasLayer implements Drawable {
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
          this.drawableList.splice(parseInt(i), 1);
          return null;
        }
      }
    }

    clear() {
      this.drawableList = [];
    }
  }

}
