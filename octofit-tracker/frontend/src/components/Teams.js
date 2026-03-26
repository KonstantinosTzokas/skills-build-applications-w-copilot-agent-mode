import { useEffect, useState } from 'react';
import { createApiEndpoint, normalizeApiCollection, requestOptions } from '../utils/api';

const endpoint = createApiEndpoint('teams');

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      console.log('Teams endpoint:', endpoint);

      try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
          throw new Error(`Teams request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalizedTeams = normalizeApiCollection(data);

        console.log('Teams fetched data:', data);
        setTeams(normalizedTeams);
      } catch (fetchError) {
        console.error('Teams fetch failed:', fetchError);
        setError('Unable to load teams from the REST API.');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section className="card resource-card">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">Teams</h1>
        <p className="text-muted mb-4">Data source: {endpoint}</p>
        {loading && <p className="mb-0">Loading teams...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {teams.map((team) => (
              <li key={team.id} className="list-group-item px-0 d-flex justify-content-between">
                <span>{team.name || 'Unnamed team'}</span>
                <span className="text-muted">ID {team.id}</span>
              </li>
            ))}
            {teams.length === 0 && (
              <li className="list-group-item px-0 text-muted">No teams returned from the API.</li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Teams;