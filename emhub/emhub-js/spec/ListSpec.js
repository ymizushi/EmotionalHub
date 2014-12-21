describe("ExpList Spec", function() {
  it("integration", function() {
    var list = new emola.ExpList([1,2,3,4]);
    expect(list.pop()).toEqual(4);
    expect(list.list).toEqual([1,2,3]);
    expect(list.push(5)).toEqual(4);
    expect(list.list).toEqual([1,2,3,5]);
  });
});

