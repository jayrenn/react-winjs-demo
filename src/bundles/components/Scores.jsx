var React = require('react');
var Data = require('../../js/data.js');

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

module.exports = Scores;