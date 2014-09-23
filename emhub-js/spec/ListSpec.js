describe("List Spec", function() {
  it("integration", function() {
    var list = new EMOLA.List([1,2,3,4]);
    expect(list.pop()).toEqual(4);
    expect(list.list).toEqual([1,2,3]);
    expect(list.push(5)).toEqual(4);
    expect(list.list).toEqual([1,2,3,5]);
  });
});

