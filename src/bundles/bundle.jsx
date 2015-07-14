var React = require('react');
var ReactWinJS = require('react-winjs');
var Pivot = require('./components/Pivot.jsx');

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
  handleResize: function () {
    var prevMode = this.state.mode;
    var nextMode = getMode();

    if (prevMode !== nextMode) {
      this.setState({ mode: nextMode });
    }
  },
  handleTogglePane: function () {
    this.setState({ paneOpened: !this.state.paneOpened });
  },
  handleAfterClose: function () {
    this.setState({ paneOpened: false });
  },
	componentDidMount: function () {
		window.addEventListener('resize', this.handleResize);
	},
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },
	render: function () {
    var paneComponent = (
      <div className="pane">
        <div className="header">
          <ReactWinJS.SplitViewPaneToggle
            aria-controls={splitViewId}
            onInvoked={this.handleTogglePane} />
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
        onAfterClose={this.handleAfterClose}
        {...this.getSplitViewConfig()} />
    );
  }
});

React.render(<App />, document.body);