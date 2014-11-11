describe("TokenReader Test", function() {
  it("add and next", function() {
      var tokenReader = new emola.TokenReader('(defn hoge (x y)');
      expect(tokenReader.next()).toEqual('(');
      expect(tokenReader.next()).toEqual('defn');
      expect(tokenReader.next()).toEqual('hoge');
      expect(tokenReader.next()).toEqual('(');
      expect(tokenReader.next()).toEqual('x');
      expect(tokenReader.next()).toEqual('y');
      expect(tokenReader.next()).toEqual(')');
      expect(tokenReader.next()).toEqual(null);

      tokenReader.add('(+ x y 1))');
      expect(tokenReader.next()).toEqual('(');
      expect(tokenReader.next()).toEqual('+');
      expect(tokenReader.next()).toEqual('x');
      expect(tokenReader.next()).toEqual('y');
      expect(tokenReader.next()).toEqual(1);
      expect(tokenReader.next()).toEqual(')');
      expect(tokenReader.next()).toEqual(')');
      expect(tokenReader.next()).toEqual(null);
  });
});


