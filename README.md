# EmotionalHub
[![Build Status](https://travis-ci.org/ymizushi/EmotionalHub.png?branch=master)](https://travis-ci.org/ymizushi/EmotionalHub)

EmotionalHub is the interactive programming platform for amusement and education with Emola.

Emola is a kind of LISP programming language designed by Yuta Mizushima.

This repository is under development.

## Screenshot
![alt text](https://github.com/ymizushi/EmotionalHub/blob/master/description/screenshot.png "Screenshot1")
![alt text](https://github.com/ymizushi/EmotionalHub/blob/master/description/screenshot2.png "Screenshot2")

## System
EmotionalHub Components(Server side)
https://docs.google.com/drawings/d/1gh6Fzs61AxsI4xbTUMgXuV3o8YkWVjGqIxYlALNQhRc

EmotionalHub Components(Client side)
https://docs.google.com/drawings/d/1imRUTv_ILlSOW3gvipSyi4quXv08q3CdYAaR6rB85JM

EmotionalHub Components(View side)
https://docs.google.com/drawings/d/1RwGYKqnmMIhU7JJBnRr_bN44PopG6dXDCAtYqp_CAro

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

### Local binding
```clojure
(defn calc (x)
  (let (y 1 z 2)
    (* x y z)))
(calc 3)
;Emola=> 6
```

### Create function object
```clojure
((fn (x y) (* x y)) 2 3)
;Emola=> 6
```

### Defiinition of function
```clojure
(defn calc (x y)
  (* x y))
(calc 2 3)
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

### Do
```clojure
(do 
  (def hoge 1)
  (+ hoge 1))
```

### Message passing
```clojure
(do
  (def hoge (point 100 200))
  (send hoge move (point 200 300)))
```

### Clear graphic context
```clojure
(clear)
```

### Create circle
```clojure
(def hoge (circle (point 100 100) 200 (color 100 100 100)))
(draw hoge)
```

### Create Rectangle
```clojure
```

### Create Line
```clojure
```

## Development setting

### Initialize
```sh
cd emhub/emhub-js/
./setup_js.sh
```

### Test
```sh
grunt jasmine
```

### Watching modified file
```sh
grunt watch
```

### Development command
```sh
grunt dev
```

### Compile *.ts
```sh
grunt ts
```

### Building for production
```sh
grunt
```
