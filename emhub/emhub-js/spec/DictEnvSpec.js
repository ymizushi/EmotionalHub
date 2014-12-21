describe("Env test", function() {
  it("update", function() {
    var env = new emola.Env(null);
    env.update("hoge", 5);
    expect(env.dict["hoge"]).toEqual(5);
  });

  it("findEnv", function() {
    var outerEnv = new emola.Env(null);
    outerEnv.update('hoge', 5);
    var env = new emola.Env(outerEnv);
    expect(env.findEnv('hoge')).toBe(outerEnv);
  });

  it("get", function() {
    var env = new emola.Env(null);
    env.update("hoge", 5);
    expect(env.get("hoge")).toBe(5);
    ;
  });
});
