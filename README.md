# Medicine Project


## Requirements

* [Node](https://nodejs.org/download/) (v0.10.x or greater)
* [npm](https://www.npmjs.com/) package manager

## Installation

```bash
git clone https://github.com/chloehwang/medicine-viget.git
cd medicine-viget
npm install
```

## Workflow

This project uses [Node-sass](https://github.com/sass/node-sass) to watch and compile .scss files, and [Browserify](http://browserify.org/) to bundle .js files. It's necessary to bundle the JS in order to use the [inViewport](https://www.npmjs.com/package/in-viewport) library.

Source assets (pre-compiled JS, SASS) are saved in the `assets/` directory. Images and compiled files are in the `public/` directory.


**Start compiling and watching .scss files**
```bash
npm run build-css
```

**Build the .js file**
```bash
npm run build-js
```
This runs the script `browserify ./assets/js/main.js -o ./public/js/bundle.js`.

**View page**

Open the index.html file in your browser.
