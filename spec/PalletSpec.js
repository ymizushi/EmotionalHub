describe("Pallet test", function() {
  it("constructor", function() {
    pallet = new EMOHUB.Pallet(null, 10, 10);
    expect(pallet.width ).toEqual(10);
  });
});
