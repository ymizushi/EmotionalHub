describe("Atom test", function() {
  it("constructor", function() {
    var atom = new emola.Atom(emola.Atom.FN, 'hoge');
    expect(atom.type).toBe('fn');
    expect(atom.value).toBe('hoge');
  });

  it("static isAtom", function() {
    var result = emola.Atom.isAtom(new emola.Atom(emola.Atom.FN, 'hoge'));
    expect(result).toBe(true);
  });

  it("equalToType", function() {
    var atom = new emola.Atom(emola.Atom.STR, 'hoge');
    expect(atom.equalToType(emola.Atom.STR)).toBe(true);
    expect(atom.equalToType(emola.Atom.IF)).toBe(false);
  });
});

