import { useEffect, useState } from 'react';
import { createApiEndpoint, normalizeApiCollection, requestOptions } from '../utils/api';

const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
const endpoint = createApiEndpoint('leaderboard', codespaceEndpoint);

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      console.log('Leaderboard endpoint:', endpoint);

      try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
          throw new Error(`Leaderboard request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalizedEntries = normalizeApiCollection(data);

        console.log('Leaderboard fetched data:', data);
        setEntries(normalizedEntries);
      } catch (fetchError) {
        console.error('Leaderboard fetch failed:', fetchError);
        setError('Unable to load leaderboard data from the REST API.');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section className="card resource-card">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">Leaderboard</h1>
        <p className="text-muted mb-4">Data source: {endpoint}</p>
        {loading && <p className="mb-0">Loading leaderboard...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <ol className="list-group list-group-numbered">
            {entries.map((entry) => (
              <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{entry.user || 'Unknown user'}</span>
                <span className="badge text-bg-primary rounded-pill">{entry.points ?? 0} pts</span>
              </li>
            ))}
            {entries.length === 0 && (
              <li className="list-group-item text-muted">No leaderboard entries returned from the API.</li>
            )}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;