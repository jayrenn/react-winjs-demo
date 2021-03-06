'use strict';

var teams = {
	arsenal: { name: 'Arsenal', logo: 'img/arsenal.png' },
	atletico: { name: 'Atletico Madrid', logo: 'img/atleticomadrid.png' },
	barcelona: { name: 'FC Barcelona', logo: 'img/barcelona.png' },
	basel: { name: 'FC Basel', logo: 'img/basel.png' },
	chelsea: { name: 'Chelsea', logo: 'img/chelsea.png' },
	city: { name: 'Manchester City', logo: 'img/manchestercity.png' },
	donetsk: { name: 'Shakhtar Donetsk', logo: 'img/shakhtardonetsk.png' },
	dortmund: { name: 'Borussia Dortmund', logo: 'img/borussiadortmund.png' },
	juventus: { name: 'Juventus', logo: 'img/juventus.png' },
	leverkusen: { name: 'Bayer Leverkusen', logo: 'img/bayerleverkusen.png' },
	monaco: { name: 'AS Monaco', logo: 'img/monaco.png' },
	munich: { name: 'Bayern Munich', logo: 'img/bayernmunich.png' },
	porto: { name: 'FC Porto', logo: 'img/porto.png' },
	psg: { name: 'Paris Saint-Germain', logo: 'img/psg.png' },
	real: { name: 'Real Madrid', logo: 'img/realmadrid.png' },
	schalke: { name: 'Schalke 04', logo: 'img/schalke.png' }
};
var stages = {
	sixteen: 'Round of 16',
	four: 'Quarter-finals',
	two: 'Semi-finals',
	one: 'Final'
};
var legs = {
	one: 'Leg 1',
	two: 'Leg 2'
};

var fixtures = [
	{ date: 'Sat, Jun 6', homeTeam: teams.juventus, homeScore: 1, awayTeam: teams.barcelona, awayScore: 3, stage: stages.one, leg: '' },
	{ date: 'Wed, May 13', homeTeam: teams.real, homeScore: 1, awayTeam: teams.juventus, awayScore: 1, stage: stages.two, leg: legs.two },
	{ date: 'Tue, May 12', homeTeam: teams.munich, homeScore: 3, awayTeam: teams.barcelona, awayScore: 2, stage: stages.two, leg: legs.two },
	{ date: 'Wed, May 6', homeTeam: teams.barcelona, homeScore: 3, awayTeam: teams.munich, awayScore: 0, stage: stages.two, leg: legs.one },
	{ date: 'Tue, May 5', homeTeam: teams.juventus, homeScore: 2, awayTeam: teams.real, awayScore: 1, stage: stages.two, leg: legs.one },
	{ date: 'Wed, Apr 22', homeTeam: teams.monaco, homeScore: 0, awayTeam: teams.juventus, awayScore: 0, stage: stages.four, leg: legs.two },
	{ date: 'Wed, Apr 22', homeTeam: teams.real, homeScore: 1, awayTeam: teams.atletico, awayScore: 0, stage: stages.four, leg: legs.two },
	{ date: 'Tue, Apr 21', homeTeam: teams.munich, homeScore: 6, awayTeam: teams.porto, awayScore: 1, stage: stages.four, leg: legs.two },
	{ date: 'Tue, Apr 21', homeTeam: teams.barcelona, homeScore: 2, awayTeam: teams.psg, awayScore: 0, stage: stages.four, leg: legs.two },
	{ date: 'Wed, Apr 15', homeTeam: teams.porto, homeScore: 3, awayTeam: teams.munich, awayScore: 1, stage: stages.four, leg: legs.one },
	{ date: 'Wed, Apr 15', homeTeam: teams.psg, homeScore: 1, awayTeam: teams.barcelona, awayScore: 3, stage: stages.four, leg: legs.one },
	{ date: 'Tue, Apr 14', homeTeam: teams.juventus, homeScore: 1, awayTeam: teams.monaco, awayScore: 0, stage: stages.four, leg: legs.one },
	{ date: 'Tue, Apr 14', homeTeam: teams.atletico, homeScore: 0, awayTeam: teams.real, awayScore: 0, stage: stages.four, leg: legs.one },
	{ date: 'Wed, Mar 18', homeTeam: teams.dortmund, homeScore: 0, awayTeam: teams.juventus, awayScore: 3, stage: stages.sixteen, leg: legs.two },
	{ date: 'Wed, Mar 18', homeTeam: teams.barcelona, homeScore: 1, awayTeam: teams.city, awayScore: 0, stage: stages.sixteen, leg: legs.two },
	{ date: 'Tue, Mar 17', homeTeam: teams.monaco, homeScore: 0, awayTeam: teams.arsenal, awayScore: 2, stage: stages.sixteen, leg: legs.two },
	{ date: 'Tue, Mar 17', homeTeam: teams.atletico, homeScore: 1, awayTeam: teams.leverkusen, awayScore: 0, stage: stages.sixteen, leg: legs.two },
	{ date: 'Wed, Mar 11', homeTeam: teams.chelsea, homeScore: 2, awayTeam: teams.psg, awayScore: 2, stage: stages.sixteen, leg: legs.two },
	{ date: 'Wed, Mar 11', homeTeam: teams.munich, homeScore: 7, awayTeam: teams.donetsk, awayScore: 0, stage: stages.sixteen, leg: legs.two },
	{ date: 'Tue, Mar 10', homeTeam: teams.porto, homeScore: 4, awayTeam: teams.basel, awayScore: 0, stage: stages.sixteen, leg: legs.two },
	{ date: 'Tue, Mar 10', homeTeam: teams.real, homeScore: 3, awayTeam: teams.schalke, awayScore: 4, stage: stages.sixteen, leg: legs.two },
	{ date: 'Wed, Feb 25', homeTeam: teams.arsenal, homeScore: 1, awayTeam: teams.monaco, awayScore: 3, stage: stages.sixteen, leg: legs.one },
	{ date: 'Wed, Feb 25', homeTeam: teams.leverkusen, homeScore: 1, awayTeam: teams.atletico, awayScore: 0, stage: stages.sixteen, leg: legs.one },
	{ date: 'Tue, Feb 24', homeTeam: teams.juventus, homeScore: 2, awayTeam: teams.dortmund, awayScore: 1, stage: stages.sixteen, leg: legs.one },
	{ date: 'Tue, Feb 24', homeTeam: teams.city, homeScore: 1, awayTeam: teams.barcelona, awayScore: 2, stage: stages.sixteen, leg: legs.one },
	{ date: 'Wed, Feb 18', homeTeam: teams.basel, homeScore: 1, awayTeam: teams.porto, awayScore: 1, stage: stages.sixteen, leg: legs.one },
	{ date: 'Wed, Feb 18', homeTeam: teams.schalke, homeScore: 0, awayTeam: teams.real, awayScore: 2, stage: stages.sixteen, leg: legs.one },
	{ date: 'Tue, Feb 17', homeTeam: teams.psg, homeScore: 1, awayTeam: teams.chelsea, awayScore: 1, stage: stages.sixteen, leg: legs.one },
	{ date: 'Tue, Feb 17', homeTeam: teams.donetsk, homeScore: 0, awayTeam: teams.munich, awayScore: 0, stage: stages.sixteen, leg: legs.one }
];

fixtures.forEach(function (value) {
	var space = value.leg !== '' ? ', ' : '';
	value.description = 'UCL ' + value.stage + space + value.leg;
	value.homeClass = '';
	value.awayClass = '';
	if (value.homeScore > value.awayScore) {
		value.homeClass = 'winner';
	}
	else if (value.homeScore < value.awayScore) {
		value.awayClass = 'winner';
	}
});

module.exports = {
  fixtures: fixtures
};