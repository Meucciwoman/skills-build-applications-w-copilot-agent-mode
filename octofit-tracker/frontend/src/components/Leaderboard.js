import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';

        const apiUrl = `${codespaceUrl}/api/leaderboard/`;
        console.log('Fetching Leaderboard from API:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Leaderboard API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const leaderboardList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Leaderboard:', leaderboardList);

        setLeaderboard(leaderboardList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🔹';
  };

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="loading-spinner">⏳</div> Loading leaderboard...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🏆 Leaderboard</h2>
          <span className="badge bg-warning text-dark">{leaderboard.length} entries</span>
        </div>

        {leaderboard.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="empty-state-icon">📭</div>
              <p className="empty-state-text">No leaderboard data found.</p>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">User</th>
                      <th scope="col">Score</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id || index} className={index < 3 ? 'table-success' : ''}>
                        <td>
                          <strong className="fs-5">
                            {getRankMedal(index + 1)} #{index + 1}
                          </strong>
                        </td>
                        <td>
                          <strong>{entry.user || entry.username || entry.name || 'N/A'}</strong>
                        </td>
                        <td>
                          <span className="badge bg-primary fs-6">
                            {entry.score || entry.points || '0'} pts
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info">
                            Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
