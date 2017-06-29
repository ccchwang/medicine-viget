# Medicine Project


## Requirements

* [Node](https://nodejs.org/download/) (v0.10.x or greater)

## Installation

```bash
git clone https://github.com/chloehwang/medicine-viget.git
cd medicine-viget
npm install
```

## Workflow

This project uses [Node-sass](https://github.com/sass/node-sass) to watch and compile .scss files, and [Browserify](http://browserify.org/) to bundle .js files. It's necessary to bundle the JS in order to use the `require` method.

Source assets (pre-compiled JS, SASS) are saved in the `assets/` directory. Images and compiled files are in the `public/` directory.


**Start compiling and watching .scss files**
```bash
npm run build-css
```

**Build the .js file**
```bash
browserify ./assets/js/main.js -o ./public/js/bundle.js
```

To view the page, open the index.html file in your browser.
