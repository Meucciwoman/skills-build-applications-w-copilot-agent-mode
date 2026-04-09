import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';

        const apiUrl = `${codespaceUrl}/api/workouts/`;
        console.log('Fetching Workouts from API:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Workouts API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const workoutsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Workouts:', workoutsList);

        setWorkouts(workoutsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="loading-spinner">⏳</div> Loading workouts...
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
          <h2>🏋️ Workouts</h2>
          <span className="badge bg-warning text-dark">{workouts.length} workouts</span>
        </div>

        {workouts.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="empty-state-icon">📭</div>
              <p className="empty-state-text">No workouts found.</p>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id}>
                        <td>
                          <span className="badge bg-warning text-dark">{workout.id}</span>
                        </td>
                        <td>
                          <strong>{workout.name || workout.title || 'N/A'}</strong>
                        </td>
                        <td>{workout.description || 'No description available.'}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger">
                            Delete
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

export default Workouts;
