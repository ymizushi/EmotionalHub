# Setup

## Initialize
```sh
cd emhub/emhub-js/
./setup_js.sh
```

### Test
```sh
cd emhub/emhub-js/
grunt ts-test
```

### Watching modified file
```sh
cd emhub/emhub-js/
grunt watch
```

### Development command
```sh
cd emhub/emhub-js/
grunt dev
```

### Compile *.ts
```sh
cd emhub/emhub-js/
grunt ts
```

### Building for production
```sh
cd emhub/emhub-js/
grunt
```

### Running Web server
```sh
cd emhub/
lein install
lein ring server
```

### Running Web socket server
```sh
cd emhub/
lein install
lein run
```
