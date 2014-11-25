describe("Point test", function() {
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

