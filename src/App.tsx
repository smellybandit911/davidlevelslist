import { useState } from 'react';
import levels from './data/levels';
import players from './data/players';
import editors from './data/editors';
import { Level, Player, Editor, score, localize } from './lib/types';
import { Sun, Moon, Smartphone, Trophy, List, Crown } from 'lucide-react';

type Tab = 'list' | 'leaderboard';

export default function App() {
  const [tab, setTab] = useState<Tab>('list');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [dark, setDark] = useState(() => JSON.parse(localStorage.getItem('dark') || 'false'));

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('dark', JSON.stringify(next));
  };

  const handleSelectLevel = (idx: number) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      setSelectedIdx(idx);
    }
  };

  return (
    <div className={dark ? 'dark' : ''}>
      {/* Header */}
      <header className="site-header">
        <div className="logo">
          <h2>David List</h2>
          <p>v1.0.0</p>
        </div>
        <nav>
          <button
            className={tab === 'list' ? 'active' : ''}
            onClick={() => { setTab('list'); setSelectedIdx(null); }}
          >
            <List className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            List
          </button>
          <button
            className={tab === 'leaderboard' ? 'active' : ''}
            onClick={() => { setTab('leaderboard'); setSelectedIdx(null); }}
          >
            <Trophy className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            Leaderboard
          </button>
          <button onClick={toggleDark} title="Toggle dark mode">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Pages */}
      {tab === 'list' ? (
        <ListPage levels={levels} selectedIdx={selectedIdx} onSelect={handleSelectLevel} editors={editors} dark={dark} />
      ) : (
        <LeaderboardPage players={players} levels={levels} dark={dark} />
      )}
    </div>
  );
}

// ========== LIST PAGE ==========

function ListPage({ levels, selectedIdx, onSelect, editors, dark }: {
  levels: Level[];
  selectedIdx: number | null;
  onSelect: (idx: number) => void;
  editors: Editor[];
  dark: boolean;
}) {
  const selectedLevel = selectedIdx !== null ? levels[selectedIdx] : null;
  const records = selectedLevel?.records || [];
  const videoUrl = selectedLevel?.videoUrl || '';

  return (
    <main className="page-list">
      {/* Left column */}
      <div className="list-container">
        {levels.length === 0 ? (
          <div className="no-levels">No levels added yet</div>
        ) : (
          levels.map((level, i) => (
            <div
              key={level.id}
              className={`level-entry ${selectedIdx === i ? 'active' : ''}`}
            >
              <div className="rank">
                <span>#{i + 1}</span>
              </div>
              <button onClick={() => onSelect(i)}>
                {level.name}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Middle column */}
      <div className="level-container">
        {selectedLevel ? (
          <div className="level-detail">
            <h1>#{selectedLevel.id}. {selectedLevel.name}</h1>

            <p className="authors">
              Verified by <span className="verifier-name">{selectedLevel.verifier}</span>
              {selectedLevel.method === 'S' && <span className="method-badge">Spam</span>}
            </p>

            {/* YouTube embed */}
            {videoUrl ? (
              <div className="video-wrapper">
                <iframe
                  className="video"
                  src={videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${selectedLevel.name} verification`}
                />
                <a
                  className="video-link"
                  href={videoUrl.replace('/embed/', '/watch?v=')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in YouTube
                </a>
              </div>
            ) : (
              <div className="video video-placeholder">
                <span>No video available</span>
              </div>
            )}

            {/* Stats */}
            <ul className="stats">
              <li>
                <div className="stat-label">Points</div>
                <div className="stat-value">{localize(score(selectedLevel.id, 100))}</div>
              </li>
              <li>
                <div className="stat-label">Level ID</div>
                <div className="stat-value">
                  <a href={`https://gdbrowser.com/${selectedLevel.gdLevelId}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
                    {selectedLevel.gdLevelId}
                  </a>
                </div>
              </li>
            </ul>

            {/* Records */}
            <div>
              <div className="records-header">
                <h2>Records</h2>
                <span className="qualify">
                  <strong>100%</strong> to qualify
                </span>
              </div>

              {records.length > 0 ? (
                <table className="records-table">
                  <thead>
                    <tr>
                      <th className="percent">%</th>
                      <th className="player">Player</th>
                      <th className="hz">Hz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec, i) => (
                      <tr key={i}>
                        <td className="percent">{rec.percent}%</td>
                        <td className="player">
                          {rec.link ? (
                            <a href={rec.link} target="_blank" rel="noopener noreferrer">
                              {rec.player}
                            </a>
                          ) : (
                            rec.player
                          )}
                        </td>
                        <td className="hz">
                          {rec.hz}Hz
                          {rec.mobile && <Smartphone className="inline w-3 h-3 ml-1 opacity-60" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-records">No records yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>Select a level from the list</p>
            <p style={{ fontSize: '0.75rem' }}>Click on any level to view details</p>
          </div>
        )}
      </div>

      {/* Right column */}
      <div className="meta-container">
        <h3>List Editors</h3>
        <ul className="editors-list">
          {editors.map((editor, i) => (
            <li key={i}>
              <span className={`role-badge ${editor.role}`}>{editor.role}</span>
              {editor.link ? (
                <a href={editor.link} target="_blank" rel="noopener noreferrer">{editor.name}</a>
              ) : (
                <span className="editor-name">{editor.name}</span>
              )}
            </li>
          ))}
        </ul>

        <h3>Submission Requirements</h3>
        <div className="requirements">
          <ul>
            <li>Solid video evidence of legitimate completion</li>
            <li>Full attempt of your death AND your completion shown</li>
            <li>Proper unedited audio</li>
            <li>Click sounds OR CPS counter (preferably both)</li>
            <li>The level must match the ID listed on the website</li>
            <li>Level must not be edited in any way</li>
            <li>FPS is within 60 - 360</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

// ========== LEADERBOARD PAGE ==========

function LeaderboardPage({ players, levels, dark }: { players: Player[]; levels: Level[]; dark: boolean }) {
  return (
    <main className="page-leaderboard">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h1>Leaderboard</h1>
        </div>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="lb-rank">Rank</th>
              <th className="lb-name">Player</th>
              <th className="lb-points">Points</th>
              <th className="lb-hardest">Hardest Level</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.rank}>
                <td className="lb-rank">
                  {player.rank <= 3 ? (
                    <span className={`medal medal-${player.rank}`}>
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span className="rank-number">#{player.rank}</span>
                  )}
                </td>
                <td className="lb-name">{player.name}</td>
                <td className="lb-points">
                  <span className="points-value">{player.points}</span>
                </td>
                <td className="lb-hardest">
                  {player.hardestLevel || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
