React-WinJS Responsive app
============

## Instructions

### Prerequisites

Install `npm` and `git`.

Create your project folder, and the `cd` into that empty folder.

Install Yeoman generator, `generator-appx`, and `gulp`.
```
npm install -g yo generator-appx gulp
```

Create the project scaffolding.
```
yo appx
```
Develop on Windows 10: yes.
Automatically install dependencies: yes.
(The rest of the prompts are not yet hooked up)

Install `react-winjs`.
```
npm install react-winjs --save
```

Install `reactify`.
```
npm install reactify --save-dev
```

Add the transpiler (works for ES6 and JSX) to `gulpfile.js/config.js` above `module.exports`.
```javascript
// gulpfile.js/config.js
var reactify = require('reactify');
var reactifyES6 = function(file) {
  return reactify(file, {'es6': true});
};
```

(Optional) Change the file extension of `bundles/bundle.js` to `.jsx`, and rename the file itself.
```javascript
// gulpfile.js/config.js
entries: src + '/bundles/bundle.jsx',
```

Apply the transform in `browserify.bundleConfigs`, beneath `entries: src + '/bundles/bundle.jsx'`.
```javascript
// gulpfile.js/config.js
transform: [reactifyES6],
```

Add `"node-copy"` to `package.json` anywhere in the file.
```javascript
// package.json
"node-copy": [
  "node_modules/winjs/css/ui-light.css",
  "node_modules/winjs/js/base.min.js",
  "node_modules/winjs/js/ui.min.js"
  ],
```

(Optional) Delete the files and folders that will be unused for this project: `html/templates`, `html/swig.html`, `bundles/vendor`.

Run `gulp`.
```
gulp
```
