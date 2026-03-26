import { useEffect, useState } from 'react';
import { createApiEndpoint, normalizeApiCollection, requestOptions } from '../utils/api';

const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
const endpoint = createApiEndpoint('activities', codespaceEndpoint);

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      console.log('Activities endpoint:', endpoint);

      try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
          throw new Error(`Activities request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalizedActivities = normalizeApiCollection(data);

        console.log('Activities fetched data:', data);
        setActivities(normalizedActivities);
      } catch (fetchError) {
        console.error('Activities fetch failed:', fetchError);
        setError('Unable to load activities from the REST API.');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section className="card resource-card">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">Activities</h1>
        <p className="text-muted mb-4">Data source: {endpoint}</p>
        {loading && <p className="mb-0">Loading activities...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table align-middle resource-table mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.user || 'N/A'}</td>
                    <td>{activity.activity_type || 'N/A'}</td>
                    <td>{activity.duration ?? 'N/A'} min</td>
                  </tr>
                ))}
                {activities.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No activities returned from the API.
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

export default Activities;