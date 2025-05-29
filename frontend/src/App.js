import React, { useState, useEffect } from 'react';
import './App.css';

// Mock data for Oklahoma City Thunder players with comprehensive stats
const thunderPlayers = [
  {
    id: 1,
    name: "Shai Gilgeous-Alexander",
    position: "PG",
    jersey: 2,
    image: "https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg",
    stats: {
      gamesPlayed: 58,
      minutesPerGame: 34.2,
      points: 31.1,
      rebounds: 5.5,
      assists: 6.2,
      steals: 2.0,
      blocks: 0.9,
      fieldGoalPercentage: 53.5,
      threePointPercentage: 35.3,
      freeThrowPercentage: 87.3,
      turnovers: 2.8,
      personalFouls: 2.1,
      plusMinus: 8.5,
      usageRate: 33.8,
      trueShootingPercentage: 63.2,
      playerEfficiencyRating: 28.4
    }
  },
  {
    id: 2,
    name: "Josh Giddey",
    position: "PG/SG",
    jersey: 3,
    image: "https://images.unsplash.com/flagged/photo-1580051579393-2e94dd6f4789",
    stats: {
      gamesPlayed: 55,
      minutesPerGame: 29.8,
      points: 12.3,
      rebounds: 6.4,
      assists: 4.8,
      steals: 0.8,
      blocks: 0.6,
      fieldGoalPercentage: 47.5,
      threePointPercentage: 33.7,
      freeThrowPercentage: 82.1,
      turnovers: 2.3,
      personalFouls: 2.5,
      plusMinus: 3.2,
      usageRate: 18.9,
      trueShootingPercentage: 54.8,
      playerEfficiencyRating: 15.2
    }
  },
  {
    id: 3,
    name: "Chet Holmgren",
    position: "C/PF",
    jersey: 7,
    image: "https://images.unsplash.com/photo-1562552052-4e9f2d8e8a4e",
    stats: {
      gamesPlayed: 50,
      minutesPerGame: 28.4,
      points: 16.9,
      rebounds: 7.9,
      assists: 2.4,
      steals: 0.6,
      blocks: 2.3,
      fieldGoalPercentage: 52.8,
      threePointPercentage: 37.0,
      freeThrowPercentage: 79.3,
      turnovers: 1.8,
      personalFouls: 2.8,
      plusMinus: 6.1,
      usageRate: 22.1,
      trueShootingPercentage: 62.4,
      playerEfficiencyRating: 21.3
    }
  },
  {
    id: 4,
    name: "Jalen Williams",
    position: "SF/SG",
    jersey: 8,
    image: "https://images.pexels.com/photos/71103/basketball-sports-teams-players-71103.jpeg",
    stats: {
      gamesPlayed: 57,
      minutesPerGame: 30.1,
      points: 19.1,
      rebounds: 4.0,
      assists: 4.5,
      steals: 1.1,
      blocks: 0.5,
      fieldGoalPercentage: 54.0,
      threePointPercentage: 42.7,
      freeThrowPercentage: 78.8,
      turnovers: 1.9,
      personalFouls: 2.2,
      plusMinus: 7.3,
      usageRate: 24.6,
      trueShootingPercentage: 64.8,
      playerEfficiencyRating: 19.8
    }
  },
  {
    id: 5,
    name: "Isaiah Hartenstein",
    position: "C",
    jersey: 55,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    stats: {
      gamesPlayed: 46,
      minutesPerGame: 26.3,
      points: 11.3,
      rebounds: 12.3,
      assists: 3.9,
      steals: 1.2,
      blocks: 1.1,
      fieldGoalPercentage: 56.2,
      threePointPercentage: 28.6,
      freeThrowPercentage: 70.8,
      turnovers: 2.1,
      personalFouls: 3.1,
      plusMinus: 4.8,
      usageRate: 19.4,
      trueShootingPercentage: 58.9,
      playerEfficiencyRating: 20.1
    }
  },
  {
    id: 6,
    name: "Lu Dort",
    position: "SG/SF",
    jersey: 5,
    image: "https://images.pexels.com/photos/3152045/pexels-photo-3152045.jpeg",
    stats: {
      gamesPlayed: 54,
      minutesPerGame: 29.7,
      points: 11.7,
      rebounds: 4.8,
      assists: 1.7,
      steals: 1.0,
      blocks: 0.4,
      fieldGoalPercentage: 39.8,
      threePointPercentage: 32.4,
      freeThrowPercentage: 83.7,
      turnovers: 1.2,
      personalFouls: 2.6,
      plusMinus: 2.1,
      usageRate: 16.8,
      trueShootingPercentage: 50.2,
      playerEfficiencyRating: 12.4
    }
  }
];

const teamStats = {
  wins: 35,
  losses: 23,
  winPercentage: 60.3,
  conference: "Western Conference",
  division: "Northwest Division",
  conferenceRank: 2,
  pointsPerGame: 116.3,
  reboundsPerGame: 45.8,
  assistsPerGame: 28.1,
  fieldGoalPercentage: 48.9,
  threePointPercentage: 36.2,
  freeThrowPercentage: 80.4,
  turnoverPerGame: 13.8,
  stealsPerGame: 8.9,
  blocksPerGame: 6.2
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    let result = '';

    // Search for specific stats
    if (lowerQuery.includes('points') || lowerQuery.includes('scoring')) {
      if (lowerQuery.includes('shai') || lowerQuery.includes('gilgeous')) {
        result = `Shai Gilgeous-Alexander averages 31.1 points per game, leading the Thunder in scoring.`;
      } else if (lowerQuery.includes('team')) {
        result = `The Thunder average 116.3 points per game as a team.`;
      } else {
        const topScorer = thunderPlayers.reduce((prev, current) => 
          prev.stats.points > current.stats.points ? prev : current
        );
        result = `${topScorer.name} leads the team with ${topScorer.stats.points} points per game.`;
      }
    } else if (lowerQuery.includes('rebounds') || lowerQuery.includes('rebounding')) {
      if (lowerQuery.includes('hartenstein') || lowerQuery.includes('isaiah')) {
        result = `Isaiah Hartenstein leads the team with 12.3 rebounds per game.`;
      } else {
        const topRebounder = thunderPlayers.reduce((prev, current) => 
          prev.stats.rebounds > current.stats.rebounds ? prev : current
        );
        result = `${topRebounder.name} leads the team with ${topRebounder.stats.rebounds} rebounds per game.`;
      }
    } else if (lowerQuery.includes('assists') || lowerQuery.includes('passing')) {
      const topPasser = thunderPlayers.reduce((prev, current) => 
        prev.stats.assists > current.stats.assists ? prev : current
      );
      result = `${topPasser.name} leads the team with ${topPasser.stats.assists} assists per game.`;
    } else if (lowerQuery.includes('blocks') || lowerQuery.includes('blocking')) {
      const topBlocker = thunderPlayers.reduce((prev, current) => 
        prev.stats.blocks > current.stats.blocks ? prev : current
      );
      result = `${topBlocker.name} leads the team with ${topBlocker.stats.blocks} blocks per game.`;
    } else if (lowerQuery.includes('steals')) {
      const topStealer = thunderPlayers.reduce((prev, current) => 
        prev.stats.steals > current.stats.steals ? prev : current
      );
      result = `${topStealer.name} leads the team with ${topStealer.stats.steals} steals per game.`;
    } else if (lowerQuery.includes('record') || lowerQuery.includes('wins')) {
      result = `The Thunder have a ${teamStats.wins}-${teamStats.losses} record (${teamStats.winPercentage}% win rate) and are ranked #${teamStats.conferenceRank} in the Western Conference.`;
    } else if (lowerQuery.includes('efficiency') || lowerQuery.includes('per')) {
      const topPER = thunderPlayers.reduce((prev, current) => 
        prev.stats.playerEfficiencyRating > current.stats.playerEfficiencyRating ? prev : current
      );
      result = `${topPER.name} has the highest Player Efficiency Rating at ${topPER.stats.playerEfficiencyRating}.`;
    } else if (lowerQuery.includes('shooting') || lowerQuery.includes('percentage')) {
      const bestShooter = thunderPlayers.reduce((prev, current) => 
        prev.stats.fieldGoalPercentage > current.stats.fieldGoalPercentage ? prev : current
      );
      result = `${bestShooter.name} has the best field goal percentage at ${bestShooter.stats.fieldGoalPercentage}%.`;
    } else {
      result = `Try asking about specific stats like "points", "rebounds", "assists", "team record", or player names!`;
    }

    setSearchResult(result);
  };

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-4 rounded-lg text-white">
      <h3 className="text-sm font-medium opacity-90">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-xs opacity-75">{subtitle}</p>}
    </div>
  );

  const PlayerCard = ({ player, onClick }) => (
    <div 
      className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow border border-gray-200"
      onClick={() => onClick(player)}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={player.image} 
          alt={player.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{player.name}</h3>
          <p className="text-blue-600 font-medium">#{player.jersey} • {player.position}</p>
          <div className="flex space-x-4 text-sm text-gray-600 mt-1">
            <span>{player.stats.points} PPG</span>
            <span>{player.stats.rebounds} RPG</span>
            <span>{player.stats.assists} APG</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            OKLAHOMA CITY THUNDER
          </h1>
          <p className="text-xl text-blue-200 mb-6">STAT TRACKER</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about any stat... (e.g., 'Who leads in points?', 'Team record', 'Shai assists')"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-orange-400 focus:outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ask
              </button>
            </div>
            {searchResult && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
                <p className="text-gray-800 text-lg">{searchResult}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {['overview', 'players', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Team Record" value={`${teamStats.wins}-${teamStats.losses}`} subtitle={`${teamStats.winPercentage}% Win Rate`} />
            <StatCard title="Conference Rank" value={`#${teamStats.conferenceRank}`} subtitle="Western Conference" />
            <StatCard title="Points Per Game" value={teamStats.pointsPerGame} subtitle="Team Average" />
            <StatCard title="Top Scorer" value="31.1 PPG" subtitle="Shai Gilgeous-Alexander" />
          </div>
        )}

        {activeTab === 'players' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thunderPlayers.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onClick={setSelectedPlayer}
              />
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Statistics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-blue-600 mb-3">Offense</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Points Per Game: <span className="font-semibold">{teamStats.pointsPerGame}</span></p>
                  <p>Assists Per Game: <span className="font-semibold">{teamStats.assistsPerGame}</span></p>
                  <p>Field Goal %: <span className="font-semibold">{teamStats.fieldGoalPercentage}%</span></p>
                  <p>3-Point %: <span className="font-semibold">{teamStats.threePointPercentage}%</span></p>
                  <p>Free Throw %: <span className="font-semibold">{teamStats.freeThrowPercentage}%</span></p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-3">Defense</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Rebounds Per Game: <span className="font-semibold">{teamStats.reboundsPerGame}</span></p>
                  <p>Steals Per Game: <span className="font-semibold">{teamStats.stealsPerGame}</span></p>
                  <p>Blocks Per Game: <span className="font-semibold">{teamStats.blocksPerGame}</span></p>
                  <p>Turnovers Per Game: <span className="font-semibold">{teamStats.turnoverPerGame}</span></p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-3">Season Record</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Wins: <span className="font-semibold">{teamStats.wins}</span></p>
                  <p>Losses: <span className="font-semibold">{teamStats.losses}</span></p>
                  <p>Win %: <span className="font-semibold">{teamStats.winPercentage}%</span></p>
                  <p>Conference: <span className="font-semibold">{teamStats.conference}</span></p>
                  <p>Division: <span className="font-semibold">{teamStats.division}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Player Detail Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedPlayer.image} 
                      alt={selectedPlayer.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPlayer.name}</h2>
                      <p className="text-blue-600 font-medium">#{selectedPlayer.jersey} • {selectedPlayer.position}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlayer(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-600 mb-3">Basic Stats</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>Games Played: <span className="font-semibold">{selectedPlayer.stats.gamesPlayed}</span></p>
                      <p>Minutes Per Game: <span className="font-semibold">{selectedPlayer.stats.minutesPerGame}</span></p>
                      <p>Points Per Game: <span className="font-semibold">{selectedPlayer.stats.points}</span></p>
                      <p>Rebounds Per Game: <span className="font-semibold">{selectedPlayer.stats.rebounds}</span></p>
                      <p>Assists Per Game: <span className="font-semibold">{selectedPlayer.stats.assists}</span></p>
                      <p>Steals Per Game: <span className="font-semibold">{selectedPlayer.stats.steals}</span></p>
                      <p>Blocks Per Game: <span className="font-semibold">{selectedPlayer.stats.blocks}</span></p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600 mb-3">Shooting & Advanced</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>Field Goal %: <span className="font-semibold">{selectedPlayer.stats.fieldGoalPercentage}%</span></p>
                      <p>3-Point %: <span className="font-semibold">{selectedPlayer.stats.threePointPercentage}%</span></p>
                      <p>Free Throw %: <span className="font-semibold">{selectedPlayer.stats.freeThrowPercentage}%</span></p>
                      <p>True Shooting %: <span className="font-semibold">{selectedPlayer.stats.trueShootingPercentage}%</span></p>
                      <p>Usage Rate: <span className="font-semibold">{selectedPlayer.stats.usageRate}%</span></p>
                      <p>PER: <span className="font-semibold">{selectedPlayer.stats.playerEfficiencyRating}</span></p>
                      <p>+/-: <span className="font-semibold">{selectedPlayer.stats.plusMinus}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;