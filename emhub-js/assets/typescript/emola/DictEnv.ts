module EMOLA {
  export class DictEnv {
    outer: DictEnv;
    dict: any;
    constructor (outer: DictEnv) {
      this.outer = outer;
      this.dict = {};
    }
    update(key: string, value: any) {
      this.dict[key] = value;
    }
  }
}
