import { useState, useEffect, useCallback } from 'react';
import levels from './data/levels';
import players from './data/players';
import editors from './data/editors';
import dpllLevels from './data/levels-dpll';
import dpllPlayers from './data/players-dpll';
import { Level, Player, Editor, score, localize } from './lib/types';
import { supabase } from './lib/supabase';
import { Sun, Moon, Smartphone, Trophy, List, Crown, Dices, Star, MessageSquare, Send } from 'lucide-react';

type Tab = 'list' | 'leaderboard' | 'roulette';
type ListType = 'dll' | 'dpll';

export default function App() {
  const [tab, setTab] = useState<Tab>('list');
  const [listType, setListType] = useState<ListType>('dll');
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

  const handleListTypeChange = (type: ListType) => {
    setListType(type);
    setSelectedIdx(null);
  };

  const currentLevels = listType === 'dll' ? levels : dpllLevels;
  const currentPlayers = listType === 'dll' ? players : dpllPlayers;

  return (
    <div className={dark ? 'dark' : ''}>
      {/* List Toggle */}
      <div className="list-toggle-bar">
        <div className="list-toggle">
          <button
            className={`toggle-btn ${listType === 'dll' ? 'active' : ''}`}
            onClick={() => handleListTypeChange('dll')}
          >
            DLL
          </button>
          <button
            className={`toggle-btn ${listType === 'dpll' ? 'active' : ''}`}
            onClick={() => handleListTypeChange('dpll')}
          >
            DPLL
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="logo">
          <h2>{listType === 'dll' ? 'David Levels List' : 'David Platformer Levels List'}</h2>
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
          <button
            className={tab === 'roulette' ? 'active' : ''}
            onClick={() => { setTab('roulette'); setSelectedIdx(null); }}
          >
            <Dices className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            Roulette
          </button>
          <button onClick={toggleDark} title="Toggle dark mode">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Pages */}
      {tab === 'list' ? (
        <ListPage levels={currentLevels} selectedIdx={selectedIdx} onSelect={handleSelectLevel} editors={editors} dark={dark} listType={listType} />
      ) : tab === 'leaderboard' ? (
        <LeaderboardPage players={currentPlayers} levels={currentLevels} dark={dark} />
      ) : (
        <RoulettePage levels={levels} dark={dark} />
      )}
    </div>
  );
}

// ========== ROULETTE PAGE ==========

function RoulettePage({ levels, dark }: { levels: Level[]; dark: boolean }) {
  const eligible = levels.filter((l) => l.name !== 'david got pranked');
  const [spinCount, setSpinCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [inputPercent, setInputPercent] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [completedSpins, setCompletedSpins] = useState<{ level: Level; percent: number; minPercent: number }[]>([]);
  // The actual enforced minimum for the current spin (may be higher than the scheduled baseline)
  const [minPercent, setMinPercent] = useState(10);

  const spin = () => {
    const random = eligible[Math.floor(Math.random() * eligible.length)];
    setCurrentLevel(random);
    setInputPercent('');
    setMessage({ type: 'info', text: `Minimum percent: ${minPercent}%. Get above this to advance!` });
  };

  const submitPercent = () => {
    const val = parseInt(inputPercent, 10);
    if (isNaN(val)) {
      setMessage({ type: 'error', text: 'Enter a valid number.' });
      return;
    }
    if (val < 0 || val > 100) {
      setMessage({ type: 'error', text: 'Percent must be between 0 and 100.' });
      return;
    }
    if (val <= minPercent) {
      setMessage({ type: 'error', text: `You need above ${minPercent}%. You got ${val}%. Try again!` });
      return;
    }
    if (!currentLevel) return;

    const nextSpinCount = spinCount + 1;
    const scheduledNext = 10 + nextSpinCount * 5;
    // If the score beats the *next* scheduled minimum, carry it forward as the new floor
    const nextMin = val > scheduledNext ? val : scheduledNext;

    setCompletedSpins([{ level: currentLevel, percent: val, minPercent }, ...completedSpins]);
    setSpinCount(nextSpinCount);
    setMinPercent(nextMin);
    setCurrentLevel(null);
    setInputPercent('');
    setMessage({ type: 'success', text: `Cleared with ${val}%! Next minimum: ${nextMin}%` });
  };

  const reset = () => {
    setSpinCount(0);
    setMinPercent(10);
    setCurrentLevel(null);
    setInputPercent('');
    setMessage(null);
    setCompletedSpins([]);
  };

  return (
    <main className="page-roulette">
      <div className="roulette-container">
        <div className="roulette-header">
          <Dices className="w-7 h-7 text-yellow-500" />
          <h1>David Roulette</h1>
        </div>
        <p className="roulette-subtitle">
          Spin to get a random level. Each clear raises the minimum by 5%. Don't get "david got pranked" — it's excluded!
        </p>

        <div className="roulette-controls">
          <button className="spin-btn" onClick={spin} disabled={!!currentLevel}>
            <Dices className="w-4 h-4 inline-block mr-1 -mt-0.5" />
            Spin
          </button>
          <span className="min-percent-badge">Min: {minPercent}%</span>
          <span className="spin-count-badge">Spins: {spinCount}</span>
          {spinCount > 0 && (
            <button className="reset-btn" onClick={reset}>
              Reset
            </button>
          )}
        </div>

        {currentLevel && (
          <div className="roulette-level-card">
            <div className="roulette-level-rank">#{currentLevel.id}</div>
            <div className="roulette-level-name">{currentLevel.name}</div>
            <div className="roulette-level-meta">
              Verified by <span className="verifier-name">{currentLevel.verifier}</span>
              {currentLevel.method === 'S' && <span className="method-badge">Spam</span>}
            </div>
            {currentLevel.gdLevelId ? (
              <a
                className="roulette-gd-link"
                href={`https://gdbrowser.com/${currentLevel.gdLevelId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GDBrowser (ID: {currentLevel.gdLevelId})
              </a>
            ) : null}

            <div className="roulette-input-row">
              <input
                type="number"
                min={0}
                max={100}
                placeholder={`Your % (must be > ${minPercent})`}
                value={inputPercent}
                onChange={(e) => setInputPercent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitPercent()}
              />
              <button className="submit-btn" onClick={submitPercent}>
                Submit
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`roulette-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {completedSpins.length > 0 && (
          <div className="roulette-history">
            <h3>History</h3>
            <ul>
              {completedSpins.map((s, i) => (
                <li key={i}>
                  <span className="hist-rank">#{s.level.id}</span>
                  <span className="hist-name">{s.level.name}</span>
                  <span className="hist-percent">{s.percent}%</span>
                  <span className="hist-min">min {s.minPercent}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

// ========== LEVEL REVIEWS ==========

interface Review {
  id: string;
  author: string;
  comment: string;
  difficulty: number;
  enjoyment: number;
  created_at: string;
}

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="star-rating-group">
      <span className="star-rating-label">{label}</span>
      <div className="star-row">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn ${n <= value ? 'filled' : ''}`}
            onClick={() => onChange(n)}
            aria-label={`${n}/10`}
          >
            <Star className="w-3.5 h-3.5" />
          </button>
        ))}
        <span className="star-value">{value}/10</span>
      </div>
    </div>
  );
}

function LevelReviews({ levelKey }: { levelKey: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [difficulty, setDifficulty] = useState(5);
  const [enjoyment, setEnjoyment] = useState(5);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('level_reviews')
      .select('*')
      .eq('level_key', levelKey)
      .order('created_at', { ascending: false });
    if (error) {
      setError('Failed to load reviews.');
    } else {
      setReviews(data ?? []);
      setError(null);
    }
    setLoading(false);
  }, [levelKey]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) { setSubmitMsg('Please enter your name.'); return; }
    if (!comment.trim()) { setSubmitMsg('Please write a comment.'); return; }
    setSubmitting(true);
    setSubmitMsg(null);
    const { error } = await supabase.from('level_reviews').insert({
      level_key: levelKey,
      author: author.trim(),
      comment: comment.trim(),
      difficulty,
      enjoyment,
    });
    if (error) {
      setSubmitMsg('Failed to post review. Please try again.');
    } else {
      setAuthor('');
      setComment('');
      setDifficulty(5);
      setEnjoyment(5);
      setShowForm(false);
      setSubmitMsg(null);
      fetchReviews();
    }
    setSubmitting(false);
  };

  const avgDiff = reviews.length ? (reviews.reduce((s, r) => s + r.difficulty, 0) / reviews.length).toFixed(1) : null;
  const avgEnj = reviews.length ? (reviews.reduce((s, r) => s + r.enjoyment, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <div className="reviews-title-row">
          <MessageSquare className="w-4 h-4" />
          <h2>Reviews</h2>
          {reviews.length > 0 && (
            <span className="reviews-count">{reviews.length}</span>
          )}
        </div>
        {avgDiff && (
          <div className="reviews-averages">
            <span className="avg-pill diff">Difficulty: {avgDiff}/10</span>
            <span className="avg-pill enj">Enjoyment: {avgEnj}/10</span>
          </div>
        )}
      </div>

      {!showForm ? (
        <button className="write-review-btn" onClick={() => setShowForm(true)}>
          <Send className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
          Write a Review
        </button>
      ) : (
        <form className="review-form" onSubmit={submit}>
          <input
            className="review-input"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={40}
          />
          <StarRating value={difficulty} onChange={setDifficulty} label="Difficulty" />
          <StarRating value={enjoyment} onChange={setEnjoyment} label="Enjoyment" />
          <textarea
            className="review-textarea"
            placeholder="Share your thoughts on this level..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={500}
          />
          {submitMsg && <p className="review-form-error">{submitMsg}</p>}
          <div className="review-form-actions">
            <button type="submit" className="submit-review-btn" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Review'}
            </button>
            <button type="button" className="cancel-review-btn" onClick={() => { setShowForm(false); setSubmitMsg(null); }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="reviews-loading">Loading reviews...</p>
      ) : error ? (
        <p className="reviews-error">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="reviews-empty">No reviews yet. Be the first!</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((r) => (
            <li key={r.id} className="review-item">
              <div className="review-meta">
                <span className="review-author">{r.author}</span>
                <span className="review-date">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <div className="review-ratings">
                <span className="review-rating diff">Diff: {r.difficulty}/10</span>
                <span className="review-rating enj">Enjoy: {r.enjoyment}/10</span>
              </div>
              <p className="review-comment">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ========== LIST PAGE ==========

function ListPage({ levels, selectedIdx, onSelect, editors, dark, listType }: {
  levels: Level[];
  selectedIdx: number | null;
  onSelect: (idx: number) => void;
  editors: Editor[];
  dark: boolean;
  listType: string;
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
                      <th className="hz">FPS</th>
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
                          {rec.hz === 'CBF' ? 'CBF' : `${rec.hz}FPS`}
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
            <LevelReviews levelKey={`${listType}:${selectedLevel.id}`} />
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
            <li>FPS is within 0 - CBF</li>
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
