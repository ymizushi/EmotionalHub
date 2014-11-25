var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var emola;
(function (emola) {
    var Color = (function () {
        function Color(r, g, b, a) {
            if (typeof r === "undefined") { r = 0; }
            if (typeof g === "undefined") { g = 0; }
            if (typeof b === "undefined") { b = 0; }
            if (typeof a === "undefined") { a = 1; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.prototype.move = function (color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        };
        return Color;
    })();
    emola.Color = Color;

    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.move = function (point) {
            this.x = point.x;
            this.y = point.y;
        };

        Point.prototype.add = function (point) {
            this.x += point.x;
            this.y += point.y;
        };
        return Point;
    })();
    emola.Point = Point;

    var Rect = (function () {
        function Rect(point, size, color) {
            this.point = point;
            this.size = size;
            this.color = color;
        }
        Rect.prototype.move = function (point, size, color) {
            this.point.x = point.x;
            this.point.y = point.y;
            this.size.width = size.width;
            this.size.height = size.height;
            this.color.r = color.r;
            this.color.g = color.g;
            this.color.b = color.b;
        };

        Rect.prototype.draw = function (context) {
            context.drawRect(this);
        };
        return Rect;
    })();
    emola.Rect = Rect;

    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        Size.prototype.move = function (width, height) {
            this.width = width;
            this.height = height;
        };
        return Size;
    })();
    emola.Size = Size;

    var Text = (function () {
        function Text(text, point, color) {
            this.text = text;
            this.point = point;
            this.color = color;
        }
        Text.prototype.draw = function (context) {
            context.drawText(this);
        };
        return Text;
    })();
    emola.Text = Text;

    var Figure = (function () {
        function Figure(point, width, height) {
            this.point = point;
            this.width = width;
            this.height = height;
        }
        Figure.prototype.move = function (point, width, height) {
            this.point.move(point);
            this.width = width;
            this.height = height;
        };
        return Figure;
    })();
    emola.Figure = Figure;

    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle(point, radius, color) {
            _super.call(this, point, 2 * radius, 2 * radius);
            this.radius = radius;
            this.color = color;
        }
        Circle.prototype.move = function (point, radius, color) {
            this.point.x = point.x;
            this.point.y = point.y;
            this.radius = radius;
            this.color.r = color.r;
            this.color.g = color.g;
            this.color.b = color.b;
            this.color.a = color.a;
        };

        Circle.prototype.draw = function (context) {
            context.drawCircle(this);
        };
        Circle.prototype.isMet = function (point) {
            if (this.point.x - this.radius <= point.x && point.x <= this.point.x + this.radius && this.point.y - this.radius <= point.y && point.y <= this.point.y + this.radius) {
                return true;
            }
            return false;
        };
        return Circle;
    })(Figure);
    emola.Circle = Circle;

    var Line = (function () {
        function Line(from, to) {
            this.from = from;
            this.to = to;
        }
        Line.prototype.draw = function (context) {
            context.drawLine(this);
        };
        return Line;
    })();
    emola.Line = Line;

    var ContextWrapper = (function () {
        function ContextWrapper(context) {
            this.context = context;

            this.width = context.canvas.width;
            this.height = context.canvas.height;
            this.offsetLeft = context.canvas.offsetLeft;
            this.offsetTop = context.canvas.offsetTop;
        }
        ContextWrapper.prototype.drawCircle = function (circle) {
            this.context.beginPath();
            this.context.fillStyle = 'rgba(' + circle.color.r + ' ,' + circle.color.g + ' ,' + circle.color.b + ' ,' + circle.color.a + ')';
            this.context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI * 2, false);
            this.context.fill();
        };

        ContextWrapper.prototype.drawRect = function (rect) {
            this.context.fillStyle = 'rgb(' + rect.color.r + ' ,' + rect.color.g + ' ,' + rect.color.b + ')';
            this.context.fillRect(rect.point.x, rect.point.y, rect.size.width, rect.size.height);
        };

        ContextWrapper.prototype.clear = function () {
            var sizeWidth = this.context.canvas.clientWidth;
            var sizeHeight = this.context.canvas.clientHeight;
            this.context.clearRect(0, 0, sizeWidth, sizeHeight);
        };

        ContextWrapper.prototype.drawLine = function (line) {
            this.context.beginPath();
            this.context.moveTo(line.from.x, line.from.y);
            this.context.lineTo(line.to.x, line.to.y);
            this.context.stroke();
        };

        ContextWrapper.prototype.drawText = function (textObject) {
            this.context.fillStyle = 'rgb(' + textObject.color.r + ' ,' + textObject.color.g + ' ,' + textObject.color.b + ')';
            this.context.fillText(textObject.text, textObject.point.x, textObject.point.y);
        };
        return ContextWrapper;
    })();
    emola.ContextWrapper = ContextWrapper;
})(emola || (emola = {}));
var emola;
(function (emola) {
    var DictEnv = (function () {
        function DictEnv(outer) {
            this.outer = outer;
            this.dict = {};
        }
        DictEnv.prototype.update = function (key, value) {
            this.dict[key] = value;
        };

        DictEnv.prototype.get = function (key) {
            return this.dict[key];
        };

        DictEnv.prototype.find = function (key) {
            if (this.outer === null && !this.dict[key]) {
                throw 'symbol:' + key + ' is not defined.';
            }
            if (this.dict[key]) {
                return this;
            }
            return this.outer.find(key);
        };
        return DictEnv;
    })();
    emola.DictEnv = DictEnv;
    var Fn = (function () {
        function Fn(args, expList, env) {
            this.args = args;
            this.expList = expList;
            this.env = env;
        }
        Fn.prototype.evalSyntax = function (env) {
            return this.expList.evalSyntax(this.env);
        };
        return Fn;
    })();
    emola.Fn = Fn;

    var Quote = (function () {
        function Quote(list) {
            this.list = list;
        }
        Quote.prototype.evalSyntax = function (env) {
            return this.list.evalSyntax(env);
        };
        return Quote;
    })();
    emola.Quote = Quote;

    var Node = (function () {
        function Node(parent) {
            this.parent = parent;
            this.children = [];
            this.token = null;
        }
        Node.prototype.addChildren = function (children) {
            this.children.push(children);
        };
        return Node;
    })();
    emola.Node = Node;

    var Atom = (function () {
        function Atom(type, value) {
            if (typeof value === "undefined") { value = null; }
            this.type = type;
            this.value = value;
        }
        Atom.isAtom = function (atom) {
            return atom instanceof Atom;
        };

        Atom.getAtoms = function () {
            return [
                Atom.FN,
                Atom.IF,
                Atom.DEF,
                Atom.DEFN,
                Atom.DO,
                Atom.SEND,
                Atom.LET,
                Atom.QUOTE,
                Atom.EVAL,
                Atom.PLUS,
                Atom.MINUS,
                Atom.DIV,
                Atom.MUL,
                Atom.EQUAL,
                Atom.GREATER,
                Atom.LESS,
                Atom.GREATEREQUAL,
                Atom.LESSEQUAL,
                Atom.DRAW,
                Atom.POINT,
                Atom.COLOR,
                Atom.CIRCLE,
                Atom.CLEAR
            ];
        };

        Atom.isAtomToken = function (token) {
            return Atom.getAtoms().indexOf(token) >= 0;
        };

        Atom.prototype.equalToType = function (type) {
            return this.type === type;
        };

        Atom.prototype.evalSyntax = function (env) {
            switch (this.type) {
                case Atom.TRUE:
                    return true;
                case Atom.FALSE:
                    return false;
                case Atom.STR:
                    return this.value;
                case Atom.NUMBER:
                    return Number(this.value);
                case Atom.VAR:
                    if (env.find(this.value)) {
                        var foundValue = env.find(this.value).get(this.value);
                        if (foundValue.evalSyntax) {
                            return foundValue.evalSyntax(env);
                        } else {
                            return foundValue;
                        }
                    } else {
                        throw 'target key of environment is not found.';
                    }
                    break;
                default:
                    console.log(this.type);
            }
        };
        Atom.FN = 'fn';
        Atom.IF = 'if';
        Atom.DEF = 'def';
        Atom.DEFN = 'defn';
        Atom.DO = 'do';
        Atom.SEND = 'send';
        Atom.VAR = 'var';
        Atom.LET = 'let';
        Atom.QUOTE = 'quote';
        Atom.EVAL = 'evalSyntax';

        Atom.TRUE = 'true';
        Atom.FALSE = 'false';
        Atom.STR = 'str';
        Atom.NUMBER = 'number';

        Atom.PLUS = '+';
        Atom.MINUS = '-';
        Atom.DIV = '/';
        Atom.MUL = '*';
        Atom.EQUAL = '=';
        Atom.GREATER = '>';
        Atom.LESS = '<';
        Atom.GREATEREQUAL = '>=';
        Atom.LESSEQUAL = '<=';

        Atom.DRAW = 'draw';
        Atom.POINT = 'point';
        Atom.COLOR = 'color';
        Atom.CIRCLE = 'circle';
        Atom.CLEAR = 'clear';
        return Atom;
    })();
    emola.Atom = Atom;
})(emola || (emola = {}));
var emola;
(function (_emola) {
    var emola;
    emola = {};

    var List = (function () {
        function List(list, parent, point) {
            if (typeof parent === "undefined") { parent = null; }
            if (typeof point === "undefined") { point = null; }
            this.list = list;

            this.radius = 50;
            this.theta = 0;
            this.nodeColor = new _emola.Color(255, 255, 51);
            this.leafColor = new _emola.Color(102, 102, 102);
            this.listColor = new _emola.Color(50, 50, 50, 0.2);

            this.parent = parent;
            this.point = point;
        }
        List.prototype.push = function (element) {
            return this.list.push(element);
        };

        List.prototype.remove = function (listObject) {
            for (var index in this.list) {
                if (this.list[index] == listObject) {
                    this.list.splice(index, 1);
                }
                if (this.list[index] instanceof List) {
                    this.list[index].remove(listObject);
                }
            }
        };

        List.prototype.rotate = function (theta) {
            this.theta += theta;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i] instanceof List) {
                    this.list[i].rotate(theta);
                }
            }
        };

        List.prototype.pop = function () {
            return this.list.pop();
        };

        List.prototype.draw = function (context) {
            var nodeCircle = new _emola.Circle(this.point, List.NODE_RADIUS, this.nodeColor);

            for (var i = 0; i < this.list.length; i++) {
                this.theta += 2 * Math.PI / this.list.length;
                var point = new _emola.Point(this.point.x + this.radius * Math.cos(this.theta), this.point.y + this.radius * Math.sin(this.theta));
                if (this.list[i] instanceof List) {
                    point = new _emola.Point(this.point.x + this.radius * 3 * Math.cos(this.theta), this.point.y + this.radius * 3 * Math.sin(this.theta));
                    this.list[i].point = point;
                    this.list[i].draw(context);
                } else {
                    var circle = new _emola.Circle(point, List.LEAF_RADIUS, this.leafColor);
                    circle.draw(context);

                    var text;
                    if (this.list[i].value) {
                        text = this.list[i].value;
                    } else {
                        text = this.list[i].type;
                    }
                    text = new _emola.Text(text, point, new _emola.Color(200, 200, 200));
                    text.draw(context);
                }
            }
            (new _emola.Circle(this.point, this.radius, this.listColor)).draw(context);
            nodeCircle.draw(context);
        };

        List.prototype.isMet = function (point) {
            if (this.point.x - List.NODE_RADIUS <= point.x && point.x <= this.point.x + List.NODE_RADIUS && this.point.y - List.NODE_RADIUS <= point.y && point.y <= this.point.y + List.NODE_RADIUS) {
                return true;
            }
            return false;
        };

        List.prototype.getListObject = function (point) {
            if (this.isMet(point)) {
                return this;
            }
            for (var index in this.list) {
                var leafListObject = this.list[index];
                if (leafListObject instanceof List && leafListObject.getListObject(point)) {
                    return leafListObject;
                }
            }
            return null;
        };

        List.prototype.add = function (listObject) {
            this.list.push(listObject);
        };
        List.NODE_RADIUS = 20;
        List.LEAF_RADIUS = 15;
        return List;
    })();
    _emola.List = List;

    var CircleList = (function (_super) {
        __extends(CircleList, _super);
        function CircleList() {
            _super.apply(this, arguments);
        }
        CircleList.prototype.evalSyntax = function (env) {
            var point = this.list[1];
            var radius = this.list[2];
            var color = this.list[3];
            return new _emola.Circle(point.evalSyntax(env), radius.evalSyntax(env), color.evalSyntax(env));
        };
        return CircleList;
    })(List);

    var ClearList = (function (_super) {
        __extends(ClearList, _super);
        function ClearList() {
            _super.apply(this, arguments);
        }
        ClearList.prototype.evalSyntax = function (env) {
            Global.graphicContext.clear();
            Global.drawingManager.clear();
            return null;
        };
        return ClearList;
    })(List);

    var ColorList = (function (_super) {
        __extends(ColorList, _super);
        function ColorList() {
            _super.apply(this, arguments);
        }
        ColorList.prototype.evalSyntax = function (env) {
            this.assert();
            return new _emola.Color(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env), this.list[3].evalSyntax(env));
        };

        ColorList.prototype.assert = function () {
            if (this.list[1] === undefined || this.list[2] === undefined || this.list[3] === undefined || this.list.length > 4) {
                throw 'color arguments are illegal.';
            }
        };
        return ColorList;
    })(List);

    var DefList = (function (_super) {
        __extends(DefList, _super);
        function DefList(list, parent, point) {
            _super.call(this, list, parent, point);
            this.listColor = new _emola.Color(0, 255, 0, 0.2);
        }
        DefList.prototype.evalSyntax = function (env) {
            this.assert();
            var keyName = this.list[1].value;
            var value = this.list[2].evalSyntax(env);
            env.update(keyName, value);
            return null;
        };

        DefList.prototype.assert = function () {
            if (this.list.length !== 3) {
                throw new Error("InvalidArgumentException");
            }
            if (this.list[1].type !== _emola.Atom.VAR) {
                throw new Error("InvalidAtomTypeException");
            }
        };
        return DefList;
    })(List);

    var DefnList = (function (_super) {
        __extends(DefnList, _super);
        function DefnList() {
            _super.apply(this, arguments);
        }
        DefnList.prototype.evalSyntax = function (env) {
            this.assert();
            var symbol = this.list[1];
            var args = this.list[2].list;
            var expList = this.list[3];
            env.update(symbol.value, new _emola.Fn(args, expList, new _emola.DictEnv(env)));
            return null;
        };

        DefnList.prototype.assert = function () {
            if (this.list.length !== 4) {
                throw new Error("InvalidArgumentException");
            }
        };
        return DefnList;
    })(List);

    var DivList = (function (_super) {
        __extends(DivList, _super);
        function DivList() {
            _super.apply(this, arguments);
        }
        DivList.prototype.evalSyntax = function (env) {
            var sum = 1;
            for (var i = 1; i < this.list.length; i++) {
                if (i === 1) {
                    sum = this.list[i].evalSyntax(env);
                } else {
                    sum /= this.list[i].evalSyntax(env);
                }
            }
            return sum;
        };
        return DivList;
    })(List);

    var DoList = (function (_super) {
        __extends(DoList, _super);
        function DoList() {
            _super.apply(this, arguments);
        }
        DoList.prototype.evalSyntax = function (env) {
            var expList = this.list.slice(1);
            var result = expList.map(function (elem) {
                return elem.evalSyntax(env);
            });
            return result[result.length - 1];
        };
        return DoList;
    })(List);
    _emola.DoList = DoList;

    var DrawList = (function (_super) {
        __extends(DrawList, _super);
        function DrawList() {
            _super.apply(this, arguments);
        }
        DrawList.prototype.evalSyntax = function (env) {
            var figure = this.list[1].evalSyntax(env);
            Global.drawingManager.add(figure);
            return figure;
        };
        return DrawList;
    })(List);
    _emola.DrawList = DrawList;

    var EqualList = (function (_super) {
        __extends(EqualList, _super);
        function EqualList() {
            _super.apply(this, arguments);
        }
        EqualList.prototype.evalSyntax = function (env) {
            return this.list[1].evalSyntax(env) === this.list[2].evalSyntax(env);
        };
        return EqualList;
    })(List);
    _emola.EqualList = EqualList;

    var EvalList = (function (_super) {
        __extends(EvalList, _super);
        function EvalList() {
            _super.apply(this, arguments);
        }
        EvalList.prototype.evalSyntax = function (env) {
            if (this.list[1].type === _emola.Atom.VAR) {
                var value = this.list[1].value;
                var quote = env.find(value).get(value);
                return quote.evalSyntax(env);
            }
            return this.list[1].evalSyntax(env).evalSyntax(env);
        };
        return EvalList;
    })(List);
    _emola.EvalList = EvalList;

    var FnList = (function (_super) {
        __extends(FnList, _super);
        function FnList() {
            _super.apply(this, arguments);
        }
        FnList.prototype.evalSyntax = function (env) {
            var args = this.list[1].list;
            var expList = this.list[2];
            return new _emola.Fn(args, expList, env);
        };
        return FnList;
    })(List);
    _emola.FnList = FnList;

    var GreaterList = (function (_super) {
        __extends(GreaterList, _super);
        function GreaterList() {
            _super.apply(this, arguments);
        }
        GreaterList.prototype.evalSyntax = function (env) {
            return this.list[1].evalSyntax(env) > this.list[2].evalSyntax(env);
        };
        return GreaterList;
    })(List);
    _emola.GreaterList = GreaterList;

    var GreaterEqualList = (function (_super) {
        __extends(GreaterEqualList, _super);
        function GreaterEqualList() {
            _super.apply(this, arguments);
        }
        GreaterEqualList.prototype.evalSyntax = function (env) {
            return this.list[1].evalSyntax(env) >= this.list[2].evalSyntax(env);
        };
        return GreaterEqualList;
    })(List);
    _emola.GreaterEqualList = GreaterEqualList;

    var IfList = (function (_super) {
        __extends(IfList, _super);
        function IfList() {
            _super.apply(this, arguments);
        }
        IfList.prototype.evalSyntax = function (env) {
            this.assert();
            var testExp = this.list[1];
            var thenExp = this.list[2];
            var elseExp = this.list[3];
            if (testExp.evalSyntax(env)) {
                return thenExp.evalSyntax(env);
            } else {
                return elseExp.evalSyntax(env);
            }
        };

        IfList.prototype.assert = function () {
            if (this.list.length !== 4) {
                throw new Error("InvalidArgumentException");
            }
        };
        return IfList;
    })(List);
    _emola.IfList = IfList;

    var LessList = (function (_super) {
        __extends(LessList, _super);
        function LessList() {
            _super.apply(this, arguments);
        }
        LessList.prototype.evalSyntax = function (env) {
            return this.list[1].evalSyntax(env) < this.list[2].evalSyntax(env);
        };
        return LessList;
    })(List);

    var LessEqualList = (function (_super) {
        __extends(LessEqualList, _super);
        function LessEqualList() {
            _super.apply(this, arguments);
        }
        LessEqualList.prototype.evalSyntax = function (env) {
            return this.list[1].evalSyntax(env) <= this.list[2].evalSyntax(env);
        };
        return LessEqualList;
    })(List);

    var LetList = (function (_super) {
        __extends(LetList, _super);
        function LetList() {
            _super.apply(this, arguments);
        }
        LetList.prototype.evalSyntax = function (env) {
            var lets = this.list[1].list;
            var expList = this.list[2];
            var newEnv = new _emola.DictEnv(env);
            for (var i = 0; i < lets.length; i = i + 2) {
                newEnv.update(lets[i].value, lets[i + 1].evalSyntax(newEnv));
            }
            return expList.evalSyntax(newEnv);
        };
        return LetList;
    })(List);

    var MinusList = (function (_super) {
        __extends(MinusList, _super);
        function MinusList(list, parent, point) {
            _super.call(this, list, parent, point);
            this.listColor = new _emola.Color(50, 0, 0, 0.2);
        }
        MinusList.prototype.evalSyntax = function (env) {
            var sum = 0;
            for (var i = 1; i < this.list.length; i++) {
                if (i === 1) {
                    sum = this.list[i].evalSyntax(env);
                } else {
                    sum -= this.list[i].evalSyntax(env);
                }
            }
            return sum;
        };
        return MinusList;
    })(List);
    _emola.MinusList = MinusList;

    var MulList = (function (_super) {
        __extends(MulList, _super);
        function MulList(list, parent, point) {
            _super.call(this, list, parent, point);
            this.listColor = new _emola.Color(0, 200, 50, 0.2);
        }
        MulList.prototype.evalSyntax = function (env) {
            var sum = 1;
            for (var i = 1; i < this.list.length; i++) {
                sum *= this.list[i].evalSyntax(env);
            }
            return sum;
        };
        return MulList;
    })(List);

    var NestList = (function (_super) {
        __extends(NestList, _super);
        function NestList() {
            _super.apply(this, arguments);
        }
        NestList.prototype.evalSyntax = function (env) {
            var func = this.list[0].evalSyntax(env);
            var args = this.list[0].slice(1);
            return func.exec(args, env);
        };
        return NestList;
    })(List);

    var PlusList = (function (_super) {
        __extends(PlusList, _super);
        function PlusList(list, parent, point) {
            _super.call(this, list, parent, point);
            this.listColor = new _emola.Color(255, 0, 0, 0.2);
        }
        PlusList.prototype.evalSyntax = function (env) {
            var sum = 0;
            for (var i = 1; i < this.list.length; i++) {
                sum += this.list[i].evalSyntax(env);
            }
            return sum;
        };
        return PlusList;
    })(List);
    _emola.PlusList = PlusList;

    var PointList = (function (_super) {
        __extends(PointList, _super);
        function PointList() {
            _super.apply(this, arguments);
        }
        PointList.prototype.evalSyntax = function (env) {
            this.assert();
            return new _emola.Point(this.list[1].evalSyntax(env), this.list[2].evalSyntax(env));
        };
        PointList.prototype.assert = function () {
            if (this.list[1] === undefined || this.list[2] === undefined || this.list.length > 3) {
                throw 'point arguments are illegal.';
            }
        };
        return PointList;
    })(List);

    var QuoteList = (function (_super) {
        __extends(QuoteList, _super);
        function QuoteList(list, parent, point) {
            _super.call(this, list, parent, point);
            this.listColor = new _emola.Color(0, 100, 0, 0.2);
        }
        QuoteList.prototype.evalSyntax = function (env) {
            this.assert();
            var list = this.list[1];
            return new _emola.Quote(list);
        };

        QuoteList.prototype.assert = function () {
            if (this.list[0].type !== _emola.Atom.QUOTE) {
                throw new Error("InvalidAtomTypeException");
            }
        };
        return QuoteList;
    })(List);

    var SendList = (function (_super) {
        __extends(SendList, _super);
        function SendList() {
            _super.apply(this, arguments);
        }
        SendList.prototype.evalSyntax = function (env) {
            this.assert();
            var object = this.list[1].evalSyntax(env);
            var methodName = this.list[2].value;
            var args = this.list.slice(3).map(function (x) {
                return x.evalSyntax(env);
            });
            object[methodName].apply(object, args);
            return object;
        };

        SendList.prototype.assert = function () {
        };
        return SendList;
    })(List);

    var VarList = (function (_super) {
        __extends(VarList, _super);
        function VarList() {
            _super.apply(this, arguments);
        }
        VarList.prototype.evalSyntax = function (env) {
            this.assert();
            var func;
            if (this.list[0] instanceof VarList) {
                func = this.list[0].evalSyntax(env);
            } else {
                func = env.find(this.list[0].value).get(this.list[0].value);
            }
            var realArgsList = this.list.slice(1);

            for (var i = 0; i < realArgsList.length; i++) {
                func.env.dict[func.args[i].value] = realArgsList[i].evalSyntax(env);
            }
            return func.evalSyntax(env);
        };

        VarList.prototype.assert = function () {
        };
        return VarList;
    })(List);

    var TokenReader = (function () {
        function TokenReader(line) {
            if (typeof line === "undefined") { line = null; }
            this.tokenizedList = [];
            if (line)
                this.add(line);
        }
        TokenReader.prototype.add = function (line) {
            this.tokenizedList = this.tokenizedList.concat(Core.tokenize(line));
        };

        TokenReader.prototype.next = function () {
            if (this.tokenizedList.length === 0) {
                return null;
            }
            return this.tokenizedList.shift();
        };
        return TokenReader;
    })();
    _emola.TokenReader = TokenReader;

    var DrawingManager = (function () {
        function DrawingManager(socket) {
            this.add = function (drawing) {
                this._list.push(drawing);
                this._socket.send("hoge");
            };
            this._list = [];
            this._socket = socket;
        }
        DrawingManager.prototype.remove = function (drawing) {
            for (var i in this._list) {
                if (this._list[i] == drawing) {
                    this._list.splice(i, 1);
                }
                if (this._list[i] instanceof List) {
                    this._list[i].remove(drawing);
                }
            }
        };

        DrawingManager.prototype.clear = function () {
            this._list = [];
        };

        DrawingManager.prototype.draw = function (context) {
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[i].rotate) {
                    this._list[i].rotate(0.01);
                }
                this._list[i].draw(context);
            }
        };

        DrawingManager.prototype.getDrawing = function (point, drawing) {
            for (var index in this._list) {
                var emlistObject = this._list[index];
                if (emlistObject.isMet(point) && emlistObject !== drawing) {
                    return emlistObject;
                }
            }
        };

        DrawingManager.prototype.getListObject = function (point, drawing) {
            for (var index in this._list) {
                var listObject = this._list[index];
                var targetListObject = listObject.getListObject(point);
                if (targetListObject && targetListObject !== drawing) {
                    return targetListObject;
                }
            }
        };
        return DrawingManager;
    })();

    var Socket = (function () {
        function Socket() {
            var socket = new WebSocket("ws://localhost:5000");
            socket.onopen = function (event) {
                console.log("web socket connection is established.");
            };
            socket.onmessage = function (event) {
                console.log(event.data);
            };
            this.socket = socket;
        }
        Socket.prototype.send = function (message) {
            this.socket.send(message);
        };
        return Socket;
    })();

    var Global = (function () {
        function Global() {
        }
        Global.env = new _emola.DictEnv(null);
        Global.tokenReader = new TokenReader();
        Global.graphicContext = null;
        Global.socket = new Socket();
        Global.drawingManager = new DrawingManager(Global.socket);
        Global.lastClickedPoint = null;
        Global.drugging = false;
        Global.clickPoint = new _emola.Point(0, 0);
        Global.event = null;
        return Global;
    })();
    _emola.Global = Global;

    var Core = (function () {
        function Core() {
        }
        Core.tokenize = function (inputStr) {
            return inputStr.split('(').join(' ( ').split(')').join(' ) ').split(' ').filter(function (str) {
                return str ? true : false;
            }).map(function (ele) {
                var parsedFloat = parseFloat(ele);
                return isNaN(parsedFloat) ? ele : parsedFloat;
            });
        };

        Core.atomize = function (token) {
            if (token === _emola.Atom.TRUE) {
                return new _emola.Atom(_emola.Atom.TRUE);
            } else if (token === _emola.Atom.FALSE) {
                return new _emola.Atom(_emola.Atom.FALSE);
            } else if (typeof token === 'string') {
                if (token[0] === '"' || token[0] === "'") {
                    return new _emola.Atom(_emola.Atom.STR, token.slice(1, -1));
                } else if (_emola.Atom.isAtomToken(token)) {
                    return new _emola.Atom(token, null);
                } else {
                    return new _emola.Atom(_emola.Atom.VAR, token);
                }
            } else if (typeof token === 'number') {
                return new _emola.Atom(_emola.Atom.NUMBER, token);
            } else {
                throw 'Unknown token';
            }
        };

        Core.parse = function (tokenReader, parentList) {
            if (typeof parentList === "undefined") { parentList = null; }
            var syntaxList = [];
            while (true) {
                var token = tokenReader.next();
                var point;
                if (!parentList) {
                    var x = Math.random() * 200;
                    var y = Math.random() * 200;
                    point = new _emola.Point(Math.floor(x), Math.floor(y));
                } else {
                    point = null;
                }
                if (token === '(') {
                    syntaxList.push(Core.parse(tokenReader, parentList));
                } else if (token === ')') {
                    return Core.createList(syntaxList, parentList, point);
                } else if (token === null) {
                    break;
                } else {
                    syntaxList.push(Core.atomize(token));
                }
            }
            return syntaxList[0];
        };

        Core.createList = function (syntaxList, parentList, point) {
            var firstList = syntaxList[0];
            var syntaxMap = {};

            syntaxMap[_emola.Atom.FN] = FnList;
            syntaxMap[_emola.Atom.IF] = IfList;
            syntaxMap[_emola.Atom.DEF] = DefList;
            syntaxMap[_emola.Atom.DEFN] = DefnList;
            syntaxMap[_emola.Atom.DO] = DoList;
            syntaxMap[_emola.Atom.SEND] = SendList;
            syntaxMap[_emola.Atom.LET] = LetList;
            syntaxMap[_emola.Atom.QUOTE] = QuoteList;
            syntaxMap[_emola.Atom.EVAL] = EvalList;

            syntaxMap[_emola.Atom.PLUS] = PlusList;
            syntaxMap[_emola.Atom.MINUS] = MinusList;
            syntaxMap[_emola.Atom.DIV] = DivList;
            syntaxMap[_emola.Atom.MUL] = MulList;
            syntaxMap[_emola.Atom.EQUAL] = EqualList;
            syntaxMap[_emola.Atom.GREATER] = GreaterList;
            syntaxMap[_emola.Atom.LESS] = LessList;
            syntaxMap[_emola.Atom.GREATEREQUAL] = GreaterEqualList;
            syntaxMap[_emola.Atom.LESSEQUAL] = LessEqualList;

            syntaxMap[_emola.Atom.DRAW] = DrawList;
            syntaxMap[_emola.Atom.POINT] = PointList;
            syntaxMap[_emola.Atom.COLOR] = ColorList;
            syntaxMap[_emola.Atom.CIRCLE] = CircleList;
            syntaxMap[_emola.Atom.CLEAR] = ClearList;

            var TargetFunction = syntaxMap[firstList.type];
            if (!TargetFunction) {
                TargetFunction = VarList;
            }
            return new TargetFunction(syntaxList, parentList, point);
        };

        Core.parseAndEval = function (tokenReader, env) {
            if (!env)
                env = new _emola.DictEnv(null);
            var parsedList = Core.parse(tokenReader);
            return parsedList.evalSyntax(env);
        };

        Core.readAndEval = function (line, env) {
            Global.tokenReader.add(line);
            return Core.parseAndEval(Global.tokenReader, env);
        };

        Core.createContextWrapper = function (canvasId) {
            var canvas = document.getElementById(canvasId);
            if (!canvas || !canvas.getContext) {
                return null;
            }
            return new _emola.ContextWrapper(canvas.getContext('2d'));
        };
        return Core;
    })();
    _emola.Core = Core;

    var ConsoleManager = (function () {
        function ConsoleManager(htmlString, func) {
            this.commandContainer = $(htmlString);
            this.callbackList = func;

            $('#emola-console').append(this.commandContainer);
            this.commandContainer.console({
                promptLabel: 'Emola> ',
                commandValidate: function (line) {
                    return line !== "";
                },
                commandHandle: this.callbackList,
                autofocus: true,
                animateScroll: true,
                promptHistory: true,
                charInsertTrigger: function (keycode, line) {
                    return true;
                }
            });
        }
        ConsoleManager.prototype.addCallback = function (callback) {
            this.callbackList = callback;
        };
        return ConsoleManager;
    })();

    emola.Front = {};

    $(document).ready(function () {
        if (Global.graphicContext === null) {
            Global.graphicContext = Core.createContextWrapper('canvas');
            if (Global.graphicContext !== null) {
                emola.Front.drawLoop();
            }
        }

        var consoleManager = new ConsoleManager('<div class="console">', function (line) {
            var result = '';
            try  {
                Global.tokenReader.add(line);
                var parsedList = Core.parse(Global.tokenReader);
                if (parsedList.draw) {
                    Global.drawingManager.add(parsedList);
                }
                result = parsedList.evalSyntax(Global.env);
            } catch (e) {
                result = "Parse error";
                console.log(e);
            }
            return [{ msg: "=> " + result, className: "jquery-console-message-value" }];
        });
    });

    var EventManager = (function () {
        function EventManager() {
            (function () {
                var druggingObject = null;
                var drawing = null;

                $(window).mousedown(function (e) {
                    Global.drugging = true;
                    var drawing = getDrawingObject(null, e);
                    if (drawing) {
                        druggingObject = drawing;
                    }
                });

                $(window).mouseup(function (e) {
                    Global.drugging = false;
                    if (druggingObject) {
                        var drawing = getDrawingObject(druggingObject, e);
                        if (drawing && druggingObject != drawing) {
                            drawing.add(druggingObject);
                        }
                        druggingObject = null;
                    }
                });

                $(window).mousemove(function (e) {
                    if (druggingObject) {
                        druggingObject.point = getPosition(e);
                    }
                });
            })();
        }
        return EventManager;
    })();

    var eventManager = new EventManager();

    emola.Front.drawLoop = function () {
        setTimeout(emola.Front.drawLoop, 15);
        Global.graphicContext.clear();
        Global.drawingManager.draw(Global.graphicContext);
    };

    function getDrawingObject(drawing, e) {
        var point = getPosition(e);
        return Global.drawingManager.getListObject(point, drawing);
    }

    function getPosition(e) {
        var pageX = e.pageX;
        var pageY = e.pageY;
        var rect = e.target.getBoundingClientRect();

        var x = pageX - rect.left;
        var y = pageY - rect.top;
        return new _emola.Point(x, y);
    }
})(emola || (emola = {}));
//# sourceMappingURL=emola.js.map
