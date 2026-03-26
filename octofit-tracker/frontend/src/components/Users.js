import { useEffect, useState } from 'react';
import { createApiEndpoint, normalizeApiCollection, requestOptions } from '../utils/api';

const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
const endpoint = createApiEndpoint('users', codespaceEndpoint);

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      console.log('Users endpoint:', endpoint);

      try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
          throw new Error(`Users request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalizedUsers = normalizeApiCollection(data);

        console.log('Users fetched data:', data);
        setUsers(normalizedUsers);
      } catch (fetchError) {
        console.error('Users fetch failed:', fetchError);
        setError('Unable to load users from the REST API.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section className="card resource-card">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">Users</h1>
        <p className="text-muted mb-4">Data source: {endpoint}</p>
        {loading && <p className="mb-0">Loading users...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table align-middle resource-table mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No users returned from the API.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;