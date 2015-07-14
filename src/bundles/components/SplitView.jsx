var React = require('react');
var ReactWinJS = require('react-winjs');

var Pivot = require('./Pivot.jsx');

var splitViewId = "splitView";

var SplitView = React.createClass({
  handleTogglePane: function () {
    this.setState({ paneOpened: !this.state.paneOpened });
  },
  handleAfterClose: function () {
    this.setState({ paneOpened: false });
  },
  handleChangeContent: function (newContent) {
    this.setState({
      content: newContent,
      paneOpened: false
    });
  },
  getInitialState: function () {
    return {
      content: "Home",
      paneOpened: true
    }
  },
	render: function () {
    var paneComponent = (
      <div className="pane">
        <div className="header">
          <ReactWinJS.SplitViewPaneToggle
            aria-controls={splitViewId}
            paneOpened={this.state.paneOpened}
            onInvoked={this.handleTogglePane} />
          <div>UEFA Champions League</div>
        </div>
        <div className="commands">
          <ReactWinJS.NavBarCommand
            label="Home"
            icon="home"
            onClick={this.handleChangeContent.bind(null, "Home")} />
          <ReactWinJS.NavBarCommand
            label="About"
            icon="settings"
            onClick={this.handleChangeContent.bind(null, "About")} />
          <ReactWinJS.NavBarCommand
            label="Search"
            icon="find"
            onClick={this.handleChangeContent.bind(null, "Search")} />
        </div>
      </div>
    );
    var contentComponent = (
      <div className="content">
        <Pivot
          splitViewId={splitViewId}
          paneOpened={this.state.paneOpened}
          onAfterClose={this.handleAfterClose} />
      </div>
    );

		return (
			<ReactWinJS.SplitView
        id={splitViewId}
        className="large"
        closedDisplayMode="inline"
        openedDisplayMode="inline"
        paneComponent={paneComponent}
        contentComponent={contentComponent}
        paneOpened={this.state.paneOpened}
        onAfterClose={this.handleAfterClose} />
		);
	}
});

module.exports = SplitView;