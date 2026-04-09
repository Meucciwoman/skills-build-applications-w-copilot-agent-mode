import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';

        const apiUrl = `${codespaceUrl}/api/activities/`;
        console.log('Fetching Activities from API:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Activities API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const activitiesList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Activities:', activitiesList);

        setActivities(activitiesList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="loading-spinner">⏳</div> Loading activities...
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
          <h2>🏃 Activities</h2>
          <span className="badge bg-success">{activities.length} activities</span>
        </div>

        {activities.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="empty-state-icon">📭</div>
              <p className="empty-state-text">No activities found.</p>
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
                      <th scope="col">Type</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td>
                          <span className="badge bg-success">{activity.id}</span>
                        </td>
                        <td>
                          <strong>{activity.activity_type || activity.type || 'N/A'}</strong>
                        </td>
                        <td>{activity.duration || 'N/A'}</td>
                        <td>
                          <small>{activity.date || activity.created_at || 'N/A'}</small>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info">
                            View
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

export default Activities;
