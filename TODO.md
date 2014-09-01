(def hoge (+ 1 2)) // グラフィックが表示されるがevalされて一瞬で消える。

(def hoge (quote (+ 1 2))) // グラフィックが固定化
(eval hoge) //アニメーションする

javascriptでの非同期処理について学習しておく
