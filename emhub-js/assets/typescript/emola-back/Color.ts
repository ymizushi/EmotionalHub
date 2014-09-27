module EMOLA {
  export class Color {
    r: Number;
    g: Number;
    b: Number;
    a: Number;
    constructor(r: Number, g: Number, b: Number, a: Number) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
    move(color: Color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a;
    }
  }
}

