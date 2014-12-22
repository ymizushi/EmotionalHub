/// <reference path="../../../typings/jquery/jquery.d.ts" />
declare module emola {
    class Color {
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        constructor(r?: number, g?: number, b?: number, a?: number);
        public move(color: Color): void;
    }
    class Point {
        public x: number;
        public y: number;
        constructor(x: number, y: number);
        public move(point: Point): void;
        public add(point: Point): void;
    }
    class Rect {
        public point: Point;
        public size: Size;
        public color: Color;
        constructor(point: Point, size: Size, color: Color);
        public move(point: Point, size: Size, color: Color): void;
        public draw(context: ContextWrapper): void;
    }
    class Size {
        public width: number;
        public height: number;
        constructor(width: any, height: any);
        public move(width: any, height: any): void;
    }
    class Text {
        public text: Text;
        public point: Point;
        public color: Color;
        constructor(text: any, point: any, color: any);
        public draw(context: any): void;
    }
    class Figure {
        public point: Point;
        public width: number;
        public height: number;
        constructor(point: Point, width: number, height: number);
        public move(point: Point, width: number, height: number): void;
    }
    class Circle extends Figure {
        public radius: number;
        public color: Color;
        constructor(point: any, radius: any, color: any);
        public move(point: any, radius: any, color: any): void;
        public draw(context: any): void;
        public isMet(point: Point): boolean;
    }
    class Line {
        public from: Point;
        public to: Point;
        constructor(from: Point, to: Point);
        public draw(context: ContextWrapper): void;
    }
    class ContextWrapper {
        public context: any;
        public width: number;
        public height: number;
        public offsetLeft: number;
        public offsetTop: number;
        constructor(context: any);
        public drawCircle(circle: any): void;
        public drawRect(rect: any): void;
        public clear(): void;
        public drawLine(line: any): void;
        public drawText(textObject: any): void;
    }
}
declare module emola {
    class DictEnv {
        public outer: DictEnv;
        public dict: {};
        constructor(outer: DictEnv);
        public update(key: string, value: any): void;
        public get(key: string): any;
        public find(key: string): any;
    }
    class Fn {
        public args: any;
        public expList: any;
        public env: any;
        constructor(args: any, expList: any, env: any);
        public evalSyntax(env: any): any;
    }
    class Quote {
        public list: any;
        constructor(list: any);
        public evalSyntax(env: DictEnv): any;
    }
    class Node {
        public parent: Node;
        public children: any;
        public token: any;
        constructor(parent: any);
        public addChildren(children: any): void;
    }
    class Atom {
        public type: string;
        public value: any;
        static FN: string;
        static IF: string;
        static DEF: string;
        static DEFN: string;
        static DO: string;
        static SEND: string;
        static VAR: string;
        static LET: string;
        static QUOTE: string;
        static EVAL: string;
        static TRUE: string;
        static FALSE: string;
        static STR: string;
        static NUMBER: string;
        static PLUS: string;
        static MINUS: string;
        static DIV: string;
        static MUL: string;
        static EQUAL: string;
        static GREATER: string;
        static LESS: string;
        static GREATEREQUAL: string;
        static LESSEQUAL: string;
        static DRAW: string;
        static POINT: string;
        static COLOR: string;
        static CIRCLE: string;
        static CLEAR: string;
        constructor(type: string, value?: any);
        static isAtom(atom: any): boolean;
        static getAtoms(): string[];
        static isAtomToken(token: any): boolean;
        public equalToType(type: any): boolean;
        public evalSyntax(env: any): any;
    }
}
declare module emola {
}
