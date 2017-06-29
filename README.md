# Medicine Project


### Requirements

* [Node](https://nodejs.org/download/) (v0.10.x or greater)

This project uses [Node-sass](https://github.com/sass/node-sass) to watch and compile .scss files, and [Browserify](http://browserify.org/) to bundle .js files.

Source assets (pre-compiled .js, .scss) are saved in `assets/` directory. Images and compiled files are in the `public/` directory.

### Installation

```bash
git clone https://github.com/chloehwang/medicine-viget.git
cd medicine-viget
npm install
```

Start compiling and watching .scss files
```bash
npm run build-css
```

Build .js files
```bash
browserify ./assets/js/main.js -o ./public/js/bundle.js
```

### Workflow

This repository utilizes [Gulp Starter's 2.0 branch](https://github.com/greypants/gulp-starter/tree/2.0/) which, in addition to compiling our SASS and Javascript, will compress any images, build an svg spritesheet, and make development easier in general.

If you have just cloned the repository you can now run `npm run gulp`. This will watch and compile your source assets for changes and open a browser utilizing BrowserSync to update in real-time those changes.

##Deployment
For information on this project, as well as all the other Pointed Project's deployment process, view the [explorations.viget.com's repo](https://github.com/vigetlabs/explorations.viget#deploying)
