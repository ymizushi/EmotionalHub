describe("Point spec", function() {
  it("constructor", function() {
    var point = new emola.Point(100, 200);
    expect(point.x).toEqual(100);
    expect(point.y).toEqual(200);
  });

  it("move", function() {
    var point = new emola.Point(100, 200);
    var movePoint = new emola.Point(300, 400);
    point.move(movePoint);
    expect(point.x).toEqual(300);
    expect(point.y).toEqual(400);
  });

  it("add", function() {
    var point = new emola.Point(100, 200);
    var addPoint = new emola.Point(300, 400);
    point.add(addPoint);
    expect(point.x).toEqual(400);
    expect(point.y).toEqual(600);
  });
});

describe("Circle test", function() {
  it("constructor", function () {
    var circle = new emola.Circle(new emola.Point(100,200), 300, new emola.Color(50, 60, 70));
    expect(circle.point.x).toEqual(100);
    expect(circle.point.y).toEqual(200);
    expect(circle.radius).toEqual(300);
    expect(circle.color.r).toEqual(50);
    expect(circle.color.g).toEqual(60);
    expect(circle.color.b).toEqual(70);

    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(circle (point 100 200) 100 (color 192 80 77))')).toEqual(
      new emola.Circle(new emola.Point(100 , 200), 100, new emola.Color(192, 80, 77))
    );

    expect(emola.Parser.readAndEval(tokenReader, '(do (def hoge (circle (point 100 200) 100 (color 192 80 77))) hoge)')).toEqual(
      new emola.Circle(new emola.Point(100 , 200), 100, new emola.Color(192, 80, 77))
    );
  });
});

describe("Color test", function() {
  it("constructor", function() {
    var color = new emola.Color(100, 200, 300);
    // expect(emola.readAndEval('(color 100 200 300)')).toEqual(color);

    var tokenReader  = new emola.TokenReader();
    expect(emola.Parser.readAndEval(tokenReader, '(color 100 200 300)'), null).toEqual(color);
  });
});

describe("Rect test", function() {
  it("constructor", function() {
    var rect = new emola.Rect(new emola.Point(100,200), new emola.Size(50, 60), new emola.Color(100, 150, 200));
    expect(rect.point.x).toEqual(100);
    expect(rect.point.y).toEqual(200);
    expect(rect.size.width).toEqual(50);
    expect(rect.size.height).toEqual(60);
    expect(rect.color.r).toEqual(100);
    expect(rect.color.g).toEqual(150);
    expect(rect.color.b).toEqual(200);
  });
});

