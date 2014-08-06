describe("Atom test", function() {
  it("constructor", function() {
    var atom = new EMOLA.Atom(EMOLA.Atom.FN, 'hoge');
    expect(atom.type).toBe('fn');
    expect(atom.value).toBe('hoge');
  });

  it("static isAtom", function() {
    var result = EMOLA.Atom.isAtom(new EMOLA.Atom(EMOLA.Atom.FN, 'hoge'));
    expect(result).toBe(true);
  });

  it("equalToType", function() {
    var atom = new EMOLA.Atom(EMOLA.Atom.STR, 'hoge');
    expect(atom.equalToType(EMOLA.Atom.STR)).toBe(true);
    expect(atom.equalToType(EMOLA.Atom.IF)).toBe(false);
  });
});

