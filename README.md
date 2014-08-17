# Emotional Hub
The interactive programming environtment with Emola.
(Emola is the kind of LISP designed by ymizushi).

Emotional Hub provides interactive programming, music sequencer, toolset for making github-emoji art.

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
