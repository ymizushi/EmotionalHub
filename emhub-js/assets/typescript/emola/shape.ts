module EMOLA {
  export class Color {
    r: number
    g: number
    b: number
    a: number
    constructor(r=0, g=0, b=0, a=1) {
      this.r = r
      this.g = g
      this.b = b
      this.a = a
    }
    move(color: Color) {
      this.r = color.r
      this.g = color.g
      this.b = color.b
      this.a = color.a
    }
  }

  export class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
      this.x = x
      this.y = y
    }
    
    move(point: Point) {
      this.x = point.x
      this.y = point.y
    }
    
    add(point: Point) {
      this.x += point.x
      this.y += point.y
    }
  }

  export class Rect {
    point: Point
    size: Size
    color: Color

    constructor(point: Point, size: Size, color: Color) {
      this.point = point
      this.size = size
      this.color = color
    }
    
    move(point: Point, size: Size, color: Color) {
      this.point.x = point.x
      this.point.y = point.y
      this.size.width = size.width
      this.size.height = size.height
      this.color.r = color.r
      this.color.g = color.g
      this.color.b = color.b
    }
    
    draw(context: ContextWrapper) {
      context.drawRect(this)
    }
  }

  export class Size {
    width: number
    height: number

    constructor(width, height) {
      this.width = width
      this.height = height
    }
    
    move(width, height) {
      this.width = width
      this.height = height
    }
  }

  export class Text {
    text: Text
    point: Point
    color: Color

    constructor(text, point, color) {
      this.text = text
      this.point = point
      this.color = color
    }

    draw(context) {
      context.drawText(this)
    }
  }

  export class Figure {
    point: Point
    width: number
    height: number

    constructor(point: Point, width: number, height: number) {
      this.point = point
      this.width = width
      this.height = height
    }
    move(point: Point, width: number, height: number) {
      this.point.move(point)
      this.width = width
      this.height = height
    }
  }

  export class Circle extends Figure {
    radius: number
    color: Color

    constructor(point, radius, color) {
      super(point, 2*radius, 2*radius)
      this.radius = radius
      this.color = color
    }
  
    move(point, radius, color) {
      this.point.x = point.x
      this.point.y = point.y
      this.radius = radius
      this.color.r = color.r
      this.color.g = color.g
      this.color.b = color.b
      this.color.a = color.a
    }
  
    draw(context) {
      context.drawCircle(this)
    }
    isMet(point: Point) {
      if (
        this.point.x - this.radius <=  point.x && point.x <=this.point.x + this.radius && this.point.y - this.radius <=  point.y && point.y <=this.point.y + this.radius) {
        return true
      }
      return false
    }
  }

  export class Line {
    from: Point
    to: Point

    constructor(from: Point, to: Point) {
      this.from = from
      this.to = to
    }
    
    draw(context: ContextWrapper) {
      context.drawLine(this)
    }
  }

  export class ContextWrapper {
    context: any
    width: number 
    height: number
    offsetLeft: number
    offsetTop: number

    constructor(context) {
      this.context = context
    
      this.width = context.canvas.width
      this.height = context.canvas.height
      this.offsetLeft = context.canvas.offsetLeft
      this.offsetTop = context.canvas.offsetTop
    }
    
    drawCircle(circle) {
      this.context.beginPath()
      this.context.fillStyle = 'rgba(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ' ,' + circle.color.a + ')'
      this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI*2, false)
      this.context.fill()
    } 
    
    drawRect(rect) {
      this.context.fillStyle = 'rgb(' + rect.color.r + ' ,' + rect.color.g + ' ,' + rect.color.b + ')'
      this.context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height)
    }
    
    clear() {
      var sizeWidth = this.context.canvas.clientWidth
      var sizeHeight = this.context.canvas.clientHeight
      this.context.clearRect(0, 0, sizeWidth, sizeHeight)
    }
    
    drawLine(line) {
      this.context.beginPath()
      this.context.moveTo(line.from.x, line.from.y)
      this.context.lineTo(line.to.x, line.to.y)
      this.context.stroke()
    }
    
    drawText(textObject) {
      this.context.fillStyle = 'rgb(' + textObject.color.r + ' ,' + textObject.color.g + ' ,' + textObject.color.b + ')'
      this.context.fillText(textObject.text, textObject.point.x, textObject.point.y)
    }
  }
}
