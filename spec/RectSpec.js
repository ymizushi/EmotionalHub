describe("Rect test", function() {
  it("constructor", function() {
      var rect = new EMOLA.Rect(new EMOLA.Point(100,200), new EMOLA.Size(50, 60), new EMOLA.Color(100, 150, 200));
    expect(rect.point.x).toEqual(100);
    expect(rect.point.y).toEqual(200);
    expect(rect.size.width).toEqual(50);
    expect(rect.size.height).toEqual(60);
    expect(rect.color.r).toEqual(100);
    expect(rect.color.g).toEqual(150);
    expect(rect.color.b).toEqual(200);
  });
});

