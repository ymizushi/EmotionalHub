# EmotionalHub
[![Build Status](https://travis-ci.org/ymizushi/EmotionalHub.png?branch=master)](https://travis-ci.org/ymizushi/EmotionalHub)

EmotionalHub is the interactive programming platform for amusement and education with Emola.

Emola is a kind of LISP programming language designed by ymizushi.

[Try Emola](http://emohub.ymizushi.info/)

## Screenshot
![alt text](https://github.com/ymizushi/EmotionalHub/blob/master/description/screenshot.png "Screenshot1")
![alt text](https://github.com/ymizushi/EmotionalHub/blob/master/description/screenshot2.png "Screenshot2")

## Emola Language Specification

### Arithmetic operator    
```clojure
(+ 1 1 1) ; Emola=> 3
(- 2 1 1) ; Emola=> 0
(* 2 2 2) ; Emola=> 8
(/ 4 2 2) ; Emola=> 1
(/ 1 3)   ; Emola=> 0.3333333333333333 
(= 2 2)   ; Emola=> true 
(= 2 1)   ; Emola=> false 
(>= 1 1)  ; Emola=> true 
(> 1 1)   ; Emola=> false 
(<= 1 1)  ; Emola=> true 
(< 1 1)   ; Emola=> false 
```

### Binding
```clojure
(def hoge 1)
hoge
;Emola=> 1
```

### Defiinition of function
```clojure
(defn calc (x y)
  (* x y))
(calc 2 3)
;Emola=> 6
```

### Local binding
```clojure
(defn calc (x)
  (let (y 1 z 2)
    (* x y z)))
(calc 3)
;Emola=> 6
```

### If
```clojure
(defn calc (x)
  (if (= x 1)
    true
    false))
(calc 1)
;Emola=> true
(calc 2)
;Emola=> false
```

### Evaluates the expressions in order.
```clojure
(do 
  (def hoge 1)
  (+ hoge 1))
;Emola=> 2
```

### Message passing
```clojure
(send (point 100 100) toString)
;Emola=> {x: 100, y: 100}
```

### Call Javascript built-in function
```clojure
(send (window) alert 1)
```

### Create Circle
```clojure
(def c (circle (point 100 100) 200 (color 100 100 100)))
(draw c)
```

### Create Rectangle
```clojure
(def r (rect (point 100 100) (size 100 100) (color 0 255 0)))
(draw r)
```

### Create Line
```clojure
(def l (line (point 100 100) (point 1000 1000)))
(draw l)
```

### Create Text
```clojure
(def t (text "hoge" (point 100 100) (color 50 50 50)))
(draw t)
```

### Clear graphic context
```clojure
(clear)
```
