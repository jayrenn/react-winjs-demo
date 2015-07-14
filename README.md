React-WinJS Responsive app
============

### Instructions

#### Installing the prerequisites

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

#### Setting up your workspace

##### gulpfile.js/config.js

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

##### package.json

Add `"node-copy"` to `package.json` anywhere in the file.
```javascript
// package.json
"node-copy": [
  "node_modules/winjs/css/ui-light.css",
  "node_modules/winjs/js/base.min.js",
  "node_modules/winjs/js/ui.min.js"
],
```

##### Housekeeping

(Optional) Delete the files and folders that will be unused for this project: `html/templates`, `html/swig.html`, `bundles/vendor`.

Run `gulp`.
```
gulp
```

#### Creating your React app

##### html/index.html

Set your app title.
```html
<!-- html/index.html -->
<title>React-WinJS Responsive app</title>
```

Add the WinJS references.
```html
<!-- html/index.html -->
<title>React-WinJS Responsive app</title>

<!-- WinJS references -->
<link rel="stylesheet" href="node_modules/winjs/css/ui-light.css" />
<script src="node_modules/winjs/js/base.min.js"></script>
<script src="node_modules/winjs/js/ui.min.js"></script>

<!-- App references -->
<link rel="stylesheet" href="css/app.css" />
```

Turn on default intrinsic styling by adding the `win-type-body` class to `body`.
```html
<!-- html/index.html -->
<body class="win-type-body">
```

Remove the unused markup.
```html
<!-- html/index.html -->
<body class="win-type-body">
  <script src="bundles/bundle.js"></script>
</body>
```

##### bundles/bundle.jsx

Import your required modules.
```javascript
// bundles/bundle.jsx
var React = require('react');
var ReactWinJS = require('react-winjs');
```

Create your base component, which will render in the document `body`.
```javascript
// bundles/bundle.jsx
var App = React.createClass({
  // Component
});

React.render(<App />, document.body);
```

Add a `SplitView` component.
```javascript
// bundles/bundle.jsx
var splitViewId = "splitView";

var App = React.createClass({
  render: function () {
    return (
      <ReactWinJS.SplitView
        id={splitViewId}
        closedDisplayMode="inline"
        openedDisplayMode="inline" />
    );
  }
});
```

Add the pane component of the `SplitView`. Here we will use three `NavBarCommands`.
```javascript
// bundles/bundle.jsx
var App = React.createClass({
  render: function () {
    var paneComponent = (
      <div className="pane">
        <div className="header">
          <div>UEFA Champions League</div>
        </div>
        <div className="commands">
          <ReactWinJS.NavBarCommand
            label="Home"
            icon="home" />
          <ReactWinJS.NavBarCommand
            label="About"
            icon="settings" />
          <ReactWinJS.NavBarCommand
            label="Search"
            icon="find"
            id="searchCommand" />
        </div>
      </div>
    );
    
    return (
      <ReactWinJS.SplitView
        id={splitViewId}
        closedDisplayMode="inline"
        openedDisplayMode="inline"
        paneComponent={paneComponent} />
    );
  }
});
```

Add the content component of the `SplitView`. Here we will use a `Pivot` component. Create a `components` folder, then add a `Pivot.jsx` file within it. Import that module at the top of your base component page.
```javascript
// bundles/bundle.jsx
var React = require('react');
var ReactWinJS = require('react-winjs');
var Pivot = require('./components/Pivot.jsx');

// ...

var App = React.createClass({
  render: function () {
    // var paneComponent = ( ... );
    var contentComponent = (
      <div className="content">
        <Pivot
          splitViewId={splitViewId} />
      </div>
    );
    
    return (
      <ReactWinJS.SplitView
        id={splitViewId}
        closedDisplayMode="inline"
        openedDisplayMode="inline"
        paneComponent={paneComponent}
        contentComponent={contentComponent} />
    );
  }
});
```

Add logic to handle the pane opening and closing.
```javascript
// bundles/bundle.jsx
var App = React.createClass({
  getInitialState: function () {
    return {
      paneOpened: false
    }
  },
  handleTogglePane: function () {
    this.setState({ paneOpened: !this.state.paneOpened });
  },
  handleAfterClose: function () {
    this.setState({ paneOpened: false });
  },
  render: function () {
    // ...
    var contentComponent = (
      <div className="content">
        <Pivot
          splitViewId={splitViewId}
          paneOpened={this.state.paneOpened}
          onAfterClose={this.handleAfterClose}
          handleTogglePane={this.handleTogglePane}
          mode={this.state.mode} />
      </div>
    );
    
    return (
      <ReactWinJS.SplitView
        id={splitViewId}
        closedDisplayMode="inline"
        openedDisplayMode="inline"
        paneComponent={paneComponent}
        contentComponent={contentComponent}
        paneOpened={this.state.paneOpened}
        onAfterClose={this.handleAfterClose} />
    );
  }
});
```

Let's add some responsive design. The `SplitView` offers various customization options for displaying the pane. We can choose which settings to use based on the app screen width. We will refer to these as "modes".
```javascript
// bundles/bundle.jsx
var splitViewId = "splitView";

var splitViewConfigs = {
  small: {
    closedDisplayMode: "none",
    openedDisplayMode: "overlay"
  },
  medium: {
    closedDisplayMode: "inline",
    openedDisplayMode: "overlay"
  },
  large: {
    closedDisplayMode: "inline",
    openedDisplayMode: "inline"
  }
};

function getMode() {
	return (
    window.innerWidth <= 480 ? "small" :
    window.innerWidth <= 1024 ? "medium" :
    "large"
  );
}

var App = React.createClass({
```

As you can see above, when your app has a width less than or equal to `480px`, the mode will be set as `small`. When your app has a width less than or equal to `1024px`, the mode will be set as `medium`. Any widths greater than `1024px` will result in the mode being set as `large`.

Let's implement the logic to dynamically update the mode.
```javascript
// bundles/bundle.jsx
var App = React.createClass({
  getInitialState: function () {
    var mode = getMode();
    return {
      mode: mode,
      paneOpened: false
    }
  },
  handleResize: function () {
    var prevMode = this.state.mode;
    var nextMode = getMode();

    if (prevMode !== nextMode) {
      this.setState({ mode: nextMode });
    }
  },
  // ...
  componentDidMount: function () {
		window.addEventListener('resize', this.handleResize);
	},
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  render: function () {
    // ...
    var contentComponent = (
      <div className="content">
        <Pivot
          splitViewId={splitViewId}
          paneOpened={this.state.paneOpened}
          onAfterClose={this.handleAfterClose}
          handleTogglePane={this.handleTogglePane}
          mode={this.state.mode} />
      </div>
    );
```
