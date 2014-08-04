describe("Ev test", function() {
  it("constructor", function() {
    var parsed = ['do', ['def', 'hoge', ['fn', ['x', 'y'], ['*', 'x', 'y']]], ['hoge', 100, 2]];
    var hoge = ev(parsed, new EMOLA.DictEnv(null));
    expect(hoge).toBe(200);

});
});
