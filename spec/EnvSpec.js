describe("Env test", function() {
  it("constructor", function() {
    outerEnv = new EMOHUB.Env(['hoge', 'piyo', 'fuga'], [1, 2, 3], null);
    env = new EMOHUB.Env(['foo', 'bar', 'boo'], [1, 2, 3], outerEnv);
  });
});
