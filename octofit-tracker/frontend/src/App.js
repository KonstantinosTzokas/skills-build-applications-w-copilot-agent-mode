import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg octofit-navbar shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold d-flex align-items-center gap-3" to="/users">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit logo"
              className="brand-logo"
            />
            <span>
              <span className="brand-title d-block">OctoFit Tracker</span>
              <span className="brand-subtitle d-block">Fitness data dashboard</span>
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <div className="navbar-nav ms-auto gap-lg-2">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
              <NavLink className="nav-link" to="/activities">
                Activities
              </NavLink>
              <NavLink className="nav-link" to="/leaderboard">
                Leaderboard
              </NavLink>
              <NavLink className="nav-link" to="/workouts">
                Workouts
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <section className="hero-panel mb-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <p className="eyebrow mb-2">Live team fitness tracking</p>
              <h1 className="display-title mb-3">Monitor users, teams, workouts, and leaderboard activity in one place.</h1>
              <p className="hero-copy mb-0">
                The OctoFit frontend pulls data from the Django REST API and presents it in a cleaner, brighter dashboard.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
                <NavLink className="btn btn-octofit-primary" to="/users">
                  View Users
                </NavLink>
                <NavLink className="btn btn-octofit-secondary" to="/workouts">
                  Explore Workouts
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
