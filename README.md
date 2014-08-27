# Emotional Hub
The interactive programming environtment with Emola.

(Emola is a kind of LISP programming language designed by ymizushi)

Emotional Hub provides interactive programming environtment, music sequencer, presentation tool, and so on.

This repository is under development.

### Screenshot
![alt text](https://github.com/ymizushi/emohub/blob/master/screenshot.png "Screenshot")

### Initialize
```sh
git clone git@github.com:ymizushi/emohub.git
brew install npm
npm install -g bower # javascript package manager
bower install

npm install -g grunt-cli # automation tool
npm install grunt@master
npm install --save-dev grunt-contrib-jasmine
npm install --save-dev grunt-contrib-concat
npm install --save-dev grunt-contrib-uglify
npm install --save-dev grunt-contrib-watch
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

### Building for production
```sh
grunt
```

## Emola

### Defiinition of function
```clojure
(defn calc (x y)
  (* x y))
```

### Defiinition of bindings
```clojure
(defn calc (x)
  (let (y 1)
    (* x y)))
```

### If Statement
```clojure
(defn calc (x)
  (if (= x 1)
    true
    false))
```

### Do Statement

### Send Statement

### Drawing Function
