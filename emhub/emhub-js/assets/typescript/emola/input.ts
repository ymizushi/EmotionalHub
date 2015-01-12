///<reference path="shape.ts"/>

module emola {
  export class MouseInput {
    clickPoint: Point
    drugPoint: Point
    dropPoint: Point

    constructor() {
      this.clickPoint = new Point(10,10);
      this.drugPoint = new Point(20,20);
      this.dropPoint = new Point(30,30);
    }
  }

  export class KeyboardInput {
    constructor() {
    }
  }

  export class InputManager {
    mouse = new MouseInput();
    keyboard = new KeyboardInput();
  }
}
