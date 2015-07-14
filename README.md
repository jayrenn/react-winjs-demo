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

Add the WinJS `SplitView` control.
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

Add the pane component of the `SplitView`. Here we will use three WinJS `NavBarCommands`.
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

Add the content component of the `SplitView`. Here we will insert our `Pivot` component. Create a `components` folder, then add a `Pivot.jsx` file within it. Make sure to import the module at the top.
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
          handleTogglePane={this.handleTogglePane} />
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

Now, let's have the `SplitView` modify its pane display based on which mode is currently active.
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
  getSplitViewConfig: function () {
    return splitViewConfigs[this.state.mode];
  },
  // ...
  render: function () {
    // ...
    return (
      <ReactWinJS.SplitView
        id={splitViewId}
        closedDisplayMode="inline"
        openedDisplayMode="inline"
        paneComponent={paneComponent}
        contentComponent={contentComponent}
        paneOpened={this.state.paneOpened}
        onAfterClose={this.handleAfterClose}
        {...this.getSplitViewConfig()} />
    );
```

##### bundles/components/Pivot.jsx

Let's move on to the `Pivot` module. We'll start, as always, by importing our required modules and creating the component for export.
```javascript
// bundles/components/Pivot.jsx
var React = require('react');
var ReactWinJS = require('react-winjs');

var Pivot = React.createClass({
  // Component
});

module.exports = Pivot;
```

Add the WinJS `Pivot` control.
```javascript
// bundles/components/Pivot.jsx
var Pivot = React.createClass({
  render: function () {
    return (
      <ReactWinJS.Pivot
        id="pivot"
        selectedIndex={3}
        <ReactWinJS.Pivot.Item key="news" header="news">
          <p>News</p>
        </ReactWinJS.Pivot.Item>
        <ReactWinJS.Pivot.Item key="players" header="players">
          <p>Players</p>
        </ReactWinJS.Pivot.Item>
        <ReactWinJS.Pivot.Item key="clubs" header="clubs">
          <p>Clubs</p>
        </ReactWinJS.Pivot.Item>
        <ReactWinJS.Pivot.Item key="scores" header="scores">
          <p>Scores</p>
        </ReactWinJS.Pivot.Item>
        <ReactWinJS.Pivot.Item key="standings" header="standings">
          <p>Standings</p>
        </ReactWinJS.Pivot.Item>
      </ReactWinJS.Pivot>
		);
	}
});
```

In order to best take advantage of the screen real estate on large and small screens, we can add content on either side of the `Pivot` headers. Here we will add a WinJS `SplitViewPaneToggle` control on the left, and a WinJS `AutoSuggestBox` control on the right. Note: the latter control is merely for visual purposes, and will not be hooked up in this demo. For more information on how to use an `AutoSuggestBox`, visit our [Try Site samples](http://try.buildwinjs.com/#searchbox).
```javascript
// bundles/components/Pivot.jsx
var Pivot = React.createClass({
  render: function () {
    var customLeftHeaderComponent = (
      <div className="left">
        <ReactWinJS.SplitViewPaneToggle
          aria-controls={this.props.splitViewId}
          onInvoked={this.props.handleTogglePane} />
        </div>
    );
    var customRightHeaderComponent = (
      <div className="right">
        <ReactWinJS.AutoSuggestBox
          placeholderText="Search sports, teams, or players..." />
      </div>
    );
    
		return (
      <ReactWinJS.Pivot
        id="pivot"
        selectedIndex={3}
        customLeftHeaderComponent={customLeftHeaderComponent}
        customRightHeaderComponent={customRightHeaderComponent}>
```

Let's add some additional responsive design, and some helper class names for when we get to the CSS.
```javascript
// bundles/components/Pivot.jsx
var Pivot = React.createClass({
  handleModeChange: function () {
    return this.props.mode == "small" ? "block" : "none";
  },
  handlePaneChange: function () {
    return this.props.paneOpened ? "paneOpened" : "paneClosed";
  },
	render: function () {
    var customLeftHeaderComponent = (
      <div className="left">
        <ReactWinJS.SplitViewPaneToggle
          aria-controls={this.props.splitViewId}
          onInvoked={this.props.handleTogglePane}
          style={{display: this.handleModeChange()}} />
        </div>
    );
    // ...
    return (
      <ReactWinJS.Pivot
        id="pivot"
        className={this.handlePaneChange()}
        selectedIndex={3}
        customLeftHeaderComponent={customLeftHeaderComponent}
        customRightHeaderComponent={customRightHeaderComponent}>
```

Now, let's add some content to one of the `Pivot` items. Add a `Scores.jsx` file to the `components` folder. Import that module at the top of your page. Replace `<p>Scores</p> with the new component.
```javascript
// bundles/components/Pivot.jsx
var React = require('react');
var ReactWinJS = require('react-winjs');
var Scores = require('./Scores.jsx');

var Pivot = React.createClass({
  // ...
  render: function () {
    // ...
    return (
      // ...
        <ReactWinJS.Pivot.Item key="scores" header="scores">
          <Scores />
        </ReactWinJS.Pivot.Item>
```

##### bundles/components/Scores.jsx

Import the required module and our sample data. Create the component for export.
``` javascript
// bundles/components/Scores.jsx
var React = require('react');
var Data = require('../../js/data.js');

var Scores = React.createClass({
  // Component
});

module.exports = Scores;
```

Here we will take the data and iterate through each line item, rendering a DOM element for each line item.
```javascript
// bundles/components/Scores.jsx
var Scores = React.createClass({
	render: function () {
    var fixtureNodes = Data.fixtures.map(function (fixture, i) {
      return (
        <div className="fixture" key={i}>
          <div className="date">{fixture.date}</div>
          <div className="scores">
            <div className="team" className={fixture.homeClass}>
              <div className="logo"><img src={fixture.homeTeam.logo} /></div>
              <div className="name">{fixture.homeTeam.name}</div>
              <div className="score">{fixture.homeScore}</div>
            </div>
            <div className="team" className={fixture.awayClass}>
              <div className="logo"><img src={fixture.awayTeam.logo} /></div>
              <div className="name">{fixture.awayTeam.name}</div>
              <div className="score">{fixture.awayScore}</div>
            </div>
          </div>
          <div className="description">{fixture.description}</div>
        </div>
      );
    });
    return (
      <div id="fixturesRepeater">
        {fixtureNodes}
      </div>
    );
  }
});
```

##### css/app.scss

Let's add some styles. First, we'll define the default app styles.
```css
/* css/app.scss */
.win-navbarcommand-button {
  background-color: transparent;
}

.win-splitviewpanetoggle {
  float: left;
}

#splitView {
  min-width: 320px;
}

#splitView .pane {
  background-color: #333;
  color: #FFF;
}

.win-splitview-panewrapper,
.win-splitview-pane,
#splitView .pane {
  height: 100%;
}

#splitView .pane .header {
  white-space: nowrap;
}

#splitView .pane .header .win-splitviewpanetoggle {
  color: #FFF;
}

#splitView .pane .header div {
  display: inline-block;
  font-size: 22px;
  margin: 10px;
}

#splitView .pane .commands .win-navbarcommand-button:hover,
#splitView .pane .header .win-splitviewpanetoggle:hover {
  background-color: #666;
}

#splitView .pane .commands .win-navbarcommand-button-content {
  color: #FFF;
}

#splitView .content {
  height: 100%;
}

#splitView .content .right {
  margin-right: 12px;
}

#splitView .content .win-pivot .win-pivot-header {
  margin-top: 10px;
}

#splitView .content .win-pivot .win-pivot-header-leftcustom {
  margin: 0;
}

#splitView .content .win-pivot .win-pivot-header-rightcustom {
  margin-top: 9px;
}

.win-pivot.win-pivot-nosnap .win-pivot-viewport {
  height: 100%;
  overflow-y: scroll;
}
```

Next, we'll add on to our responsive design and add some screen size-specific styling.
```css
/* css/app.scss */

/* When the pane is closed, hide the AutoSuggestBox and show the search button */
@media screen and (max-width: 824px) {
  #splitView .content #pivot.paneClosed .right {
    display: none;
  }
}

/* When the pane is closed, show the AutoSuggestBox and hide the search button */
@media screen and (min-width: 824px) {
  #splitView.win-splitview-pane-closed .pane .commands #searchCommand {
    display: none;
  }
}

/* When the pane is opened, hide the AutoSuggestBox and show the search button */
@media screen and (max-width: 1100px) {
  #splitView .content #pivot.paneOpened .right {
    display: none;
  }
}

/* When the pane is opened, show the AutoSuggestBox and hide the search button */
@media screen and (min-width: 1100px) {
  #splitView.win-splitview-pane-opened .pane .commands #searchCommand {
    display: none;
  }
}
```

Finally, we'll style the content.
```css
#fixturesRepeater {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.fixture {
  flex: 1 0 250px;
  min-width: 200px;
  max-width: 369px;
  margin: 5px;
  padding: 10px;
  display: inline-block;
  background-color: #f2f2f2;;
  font-family: Segoe UI Light;
  text-align: left;
}

.fixture .date,
.fixture .description {
  color: #999;
}

.fixture .scores  {
  padding: 5px 0;
  font-size: 20px;
}

.fixture .scores .winner {
  font-family: Segoe UI;
}

.fixture .scores .logo {
  display: inline-block;
  position: relative;
  top: 3px;
}

.fixture .scores .name {
  display: inline-block;
  padding-left: 5px;
}

.fixture .scores .score {
  float: right;
  text-align: right;
  position: relative;
  top: 2px;
}
```
