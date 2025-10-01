import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import './styles/App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>capitalmind<span className="premium">premium</span></h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>
              Portfolios
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

