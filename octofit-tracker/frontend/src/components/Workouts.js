import { useEffect, useState } from 'react';
import { createApiEndpoint, normalizeApiCollection, requestOptions } from '../utils/api';

const codespaceEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
const endpoint = createApiEndpoint('workouts', codespaceEndpoint);

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      console.log('Workouts endpoint:', endpoint);

      try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
          throw new Error(`Workouts request failed with status ${response.status}`);
        }
        const data = await response.json();
        const normalizedWorkouts = normalizeApiCollection(data);

        console.log('Workouts fetched data:', data);
        setWorkouts(normalizedWorkouts);
      } catch (fetchError) {
        console.error('Workouts fetch failed:', fetchError);
        setError('Unable to load workouts from the REST API.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section className="card resource-card">
      <div className="card-body p-4">
        <h1 className="h3 mb-2">Workouts</h1>
        <p className="text-muted mb-4">Data source: {endpoint}</p>
        {loading && <p className="mb-0">Loading workouts...</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}
        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-12" key={workout.id}>
                <div className="border rounded-4 p-3 h-100 bg-white">
                  <h2 className="h5 mb-2">{workout.name || 'Unnamed workout'}</h2>
                  <p className="text-muted mb-0">{workout.description || 'No description available.'}</p>
                </div>
              </div>
            ))}
            {workouts.length === 0 && (
              <div className="col-12 text-muted">No workouts returned from the API.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;