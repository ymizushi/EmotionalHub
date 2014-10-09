module EMOLA {
  export class Circle exnteds Figure{
    constructor(point, radius, color) {
      super(point, 2*radius, 2*radius);
      this.radius = radius;
      this.color = color;
    };
    EMOLA.Circle.prototype = new EMOLA.Figure();
    
    EMOLA.Circle.prototype.move = function (point, radius, color) {
      this.point.x = point.x;
      this.point.y = point.y;
      this.radius = radius;
      this.color.r = color.r;
      this.color.g = color.g;
      this.color.b = color.b;
      this.color.a = color.a;
    };
    
    EMOLA.Circle.prototype.draw = function (context) {
      context.drawCircle(this);
    };

    isMet(point) {
      if (
        this.point.x - this.radius <=  point.x && point.x <=this.point.x + this.radius && this.point.y - this.radius <=  point.y && point.y <=this.point.y + this.radius) {
        return true;
      }
      return false;
    }
  }
}
