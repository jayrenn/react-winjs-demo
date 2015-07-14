var React = require('react');
var ReactWinJS = require('react-winjs');
var Scores = require('./Scores.jsx');

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
    var customRightHeaderComponent = (
      <div className="right">
        <ReactWinJS.AutoSuggestBox
          placeholderText="Search sports, teams, or players..." />
      </div>
    );
    
		return (
      <ReactWinJS.Pivot
        id="pivot"
        className={this.handlePaneChange()}
        selectedIndex={3}
        customLeftHeaderComponent={customLeftHeaderComponent}
        customRightHeaderComponent={customRightHeaderComponent}>
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
          <Scores />
        </ReactWinJS.Pivot.Item>
        <ReactWinJS.Pivot.Item key="standings" header="standings">
          <p>Standings</p>
        </ReactWinJS.Pivot.Item>
      </ReactWinJS.Pivot>
		);
	}
});

module.exports = Pivot;