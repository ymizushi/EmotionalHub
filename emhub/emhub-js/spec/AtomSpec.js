describe("Atom test", function() {
  it("constructor", function() {
    var atom = new emola.Atom(emola.AtomType.FN, 'hoge');
    expect(atom.type).toBe('fn');
    expect(atom.value).toBe('hoge');
  });

  it("static isAtom", function() {
    var result = emola.Atom.isAtom(new emola.Atom(emola.AtomType.FN, 'hoge'));
    expect(result).toBe(true);
  });

  it("equalToType", function() {
    var atom = new emola.Atom(emola.AtomType.STR, 'hoge');
    expect(atom.equalToType(emola.AtomType.STR)).toBe(true);
    expect(atom.equalToType(emola.AtomType.IF)).toBe(false);
  });
});

