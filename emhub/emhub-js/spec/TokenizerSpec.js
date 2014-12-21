describe("Tokenizer test", function() {
    it("function tokenize", function() {
        expect(emola.Tokenizer.tokenize(
            '(def hoge (x y) (+ x y))'))
            .toEqual(
            ['(', 'def', 'hoge', '(', 'x', 'y', ')', '(', '+', 'x', 'y', ')', ')']);
        // TODO:
        // var re = /".*"/;
        // '"hoge piyo    fuga", "fuga piyo             asdf "'.match(re);
        // expect(emola.Core.tokenize(
        //   '(def hoge "hoge   piyo")'))
        //   .toEqual(
        //   ['(', 'def', 'hoge', '"hoge"', ')']);
        expect(emola.Tokenizer.tokenize(
            '(+ 1 2 (- 2 1))'
        )).toEqual(
            ['(', '+', 1, 2, '(', '-', 2, 1, ')', ')']
        );
    });
});
