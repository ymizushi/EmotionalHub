///<reference path="shape.ts"/>

module emola {
  export class MouseInput {
    constructor() {
    }
  }

  export class KeyboardInput {
    constructor() {
    }
  }

  export interface Druggable {
  }

  export class InputManager {
    clicked(): Point {
      return new Point(1 ,2)
    }
  }
}
