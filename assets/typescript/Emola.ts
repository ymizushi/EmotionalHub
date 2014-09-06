class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};
var greeter = new Greeter("Hello, world!");
var hoge = "hoge";
var str = greeter.greet();
document.body.innerHTML = str;
