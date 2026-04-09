import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';

        const apiUrl = `${codespaceUrl}/api/teams/`;
        console.log('Fetching Teams from API:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Teams API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const teamsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Teams:', teamsList);

        setTeams(teamsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="loading-spinner">⏳</div> Loading teams...
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
          <h2>🤝 Teams</h2>
          <span className="badge bg-info">{teams.length} teams</span>
        </div>

        {teams.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="empty-state-icon">📭</div>
              <p className="empty-state-text">No teams found.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {teams.map((team) => (
              <div key={team.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">{team.name || 'N/A'}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{team.description || 'No description available.'}</p>
                    <span className="badge bg-info me-2">ID: {team.id}</span>
                  </div>
                  <div className="card-footer bg-light">
                    <button className="btn btn-sm btn-primary w-100">
                      View Team
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
