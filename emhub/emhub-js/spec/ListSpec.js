describe("GraphExpList Spec", function() {
  it("integration", function() {
    var list = new emola.GraphExpList([1,2,3,4]);
    expect(list.pop()).toEqual(4);
    expect(list.expList).toEqual([1,2,3]);
    expect(list.push(5)).toEqual(4);
    expect(list.expList).toEqual([1,2,3,5]);
  });
});

