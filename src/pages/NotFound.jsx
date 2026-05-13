// NotFound.jsx — 404 error page
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-number">404</div>
        <div className="notfound-emoji">😵</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          Looks like this page went on an unauthorized campus trip without booking an EliteRide!
        </p>
        <div className="notfound-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            🏠 Go Home
          </Link>
        </div>
        <div className="notfound-links">
          <p>Or try one of these:</p>
          <div className="notfound-quick-links">
            <Link to="/eats">🍱 EliteEats</Link>
            <Link to="/ride">🛵 EliteRide</Link>
            <Link to="/mart">🛒 EliteMart</Link>
            <Link to="/dashboard">📊 Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
