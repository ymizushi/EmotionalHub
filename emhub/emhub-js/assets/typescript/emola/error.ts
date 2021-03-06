module emola {
  export class InvalidTypeError implements Error {
    name:string;
    message:string;

    constructor(message: string) {
      this.name = 'InvalidTypeError';
      this.message = message;
    }
  }

  export class InvalidArgumentError implements Error {
    name:string;
    message:string;

    constructor(message: string) {
      this.name = 'InvalidArgumentError';
      this.message = message;
    }
  }

  export class NotFoundError implements Error {
    name:string;
    message:string;

    constructor(message: string) {
      this.name = 'NotFoundError';
      this.message = message;
    }
  }

  export class UnknownTokenError implements Error {
    name: string;
    message: string;

    constructor(message: string) {
      this.name = 'UnknownTokenError';
      this.message = message;
    }
  }

}
