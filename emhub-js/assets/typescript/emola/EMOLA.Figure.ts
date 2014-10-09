module EMOLA {
  export class Figure {
    point: any
    width: number
    height: number

    constructor(point, width, height) {
      this.point = point
      this.width = width
      this.height = height
    }

    move(point, width, height) {
      this.point.move(point);
      this.width = width;
      this.height = height;
    }
  }
}
