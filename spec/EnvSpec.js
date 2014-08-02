describe("Fn test", function() {
  it("constructor", function() {
    outerEnv = new EMOLA.Fn(['hoge', 'piyo', 'fuga'], [1, 2, 3], null);
    env = new EMOHUB.Env(['foo', 'bar', 'boo'], [1, 2, 3], outerEnv);
  });
});
