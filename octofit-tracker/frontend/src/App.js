import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-logo.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    🏃 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🤝 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    🏋️ Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        <footer className="bg-dark text-white text-center py-4 mt-5">
          <p>&copy; 2026 OctoFit Tracker. Track your fitness. Dominate the leaderboard. 💪</p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body text-center py-5">
            <img
              src="/octofitapp-logo.png"
              alt="OctoFit Logo"
              style={{
                width: '120px',
                height: 'auto',
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 4px 8px rgba(0, 102, 204, 0.2))'
              }}
            />
            <h1 className="card-title display-4">Welcome to OctoFit Tracker 💪</h1>
            <p className="card-text lead">
              Track your fitness journey, compete with teams, and reach your goals!
            </p>
            <div className="mt-4">
              <Link to="/users" className="btn btn-primary btn-lg me-2">
                View Users
              </Link>
              <Link to="/activities" className="btn btn-success btn-lg me-2">
                View Activities
              </Link>
              <Link to="/leaderboard" className="btn btn-info btn-lg">
                Check Leaderboard
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">👥 User Management</h5>
              </div>
              <div className="card-body">
                <p className="card-text">Manage and view all users in the system. Track user profiles and achievements.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">🏃 Activity Tracking</h5>
              </div>
              <div className="card-body">
                <p className="card-text">Log and track all your fitness activities with detailed metrics and progress.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">🏆 Leaderboard</h5>
              </div>
              <div className="card-body">
                <p className="card-text">Compete with friends and see who's leading the pack in the fitness challenge!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
