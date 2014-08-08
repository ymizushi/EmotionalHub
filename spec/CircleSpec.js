describe("Circle test", function() {
  it("constructor", function() {
    var circle = new EMOLA.Circle(new EMOLA.Point(100,200), 300, new EMOLA.Color(50, 60, 70));
    expect(circle.point.x).toEqual(100);
    expect(circle.point.y).toEqual(200);
    expect(circle.radius).toEqual(300);
    expect(circle.color.r).toEqual(50);
    expect(circle.color.g).toEqual(60);
    expect(circle.color.b).toEqual(70);

    expect(EMOLA.readAndEval('(circle (point 100 200) 100 (color 192 80 77))')).toEqual(
      new EMOLA.Circle(new EMOLA.Point(100 , 200), 100, new EMOLA.Color(192, 80, 77))
    );

    expect(EMOLA.readAndEval('(do (def hoge (circle (point 100 200) 100 (color 192 80 77))) hoge)')).toEqual(
      new EMOLA.Circle(new EMOLA.Point(100 , 200), 100, new EMOLA.Color(192, 80, 77))
    );
  });
});


