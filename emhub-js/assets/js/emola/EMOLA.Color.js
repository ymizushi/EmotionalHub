var EMOLA;
(function (EMOLA) {
    var Color = (function () {
        function Color(r, g, b, a) {
            this.r = r||0;
            this.g = g||0;
            this.b = b||0;
            this.a = a||0;
        }
        Color.prototype.move = function (color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        };
        return Color;
    })();
    EMOLA.Color = Color;
})(EMOLA || (EMOLA = {}));
