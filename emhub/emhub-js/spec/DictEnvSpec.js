describe("DictEnv test", function() {
  it("update", function() {
    var env = new emola.DictEnv(null);
    env.update("hoge", 5);
    expect(env.dict["hoge"]).toEqual(5);
  });

  it("find", function() {
    var outerEnv = new emola.DictEnv(null);
    outerEnv.update('hoge', 5);
    var env = new emola.DictEnv(outerEnv);
    expect(env.find('hoge')).toBe(outerEnv);
  });

  it("get", function() {
    var env = new emola.DictEnv(null);
    env.update("hoge", 5);
    expect(env.get("hoge")).toBe(5);
    ;
  });
});
