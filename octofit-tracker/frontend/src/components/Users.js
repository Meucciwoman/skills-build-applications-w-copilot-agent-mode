import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';

        const apiUrl = `${codespaceUrl}/api/users/`;
        console.log('Fetching Users from API:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Users API Response:', data);

        // Handle both paginated (.results) and plain array responses
        const usersList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Users:', usersList);

        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            <div className="loading-spinner">⏳</div> Loading users...
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
          <h2>👥 Users</h2>
          <span className="badge bg-primary">{users.length} users</span>
        </div>

        {users.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="empty-state-icon">📭</div>
              <p className="empty-state-text">No users found.</p>
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
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>
                          <span className="badge bg-primary">{user.id}</span>
                        </td>
                        <td>
                          <strong>{user.username || user.name || 'N/A'}</strong>
                        </td>
                        <td>{user.email || 'N/A'}</td>
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

export default Users;
