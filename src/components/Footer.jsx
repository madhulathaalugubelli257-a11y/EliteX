// Footer.jsx — App-wide footer
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🚀</span>
              <span className="footer-logo-text">Elite<span>X</span></span>
            </div>
            <p className="footer-tagline">
              Your all-in-one campus super app for food, rides, and groceries — built for students, by students.
            </p>
            <div className="footer-socials">
              <a href="#!" aria-label="Instagram" className="social-btn">📸</a>
              <a href="#!" aria-label="Twitter" className="social-btn">🐦</a>
              <a href="#!" aria-label="LinkedIn" className="social-btn">💼</a>
              <a href="#!" aria-label="GitHub" className="social-btn">🐙</a>
            </div>
          </div>

          {/* Modules */}
          <div className="footer-col">
            <h4 className="footer-heading">Modules</h4>
            <ul className="footer-links">
              <li><Link to="/eats">🍱 EliteEats</Link></li>
              <li><Link to="/ride">🛵 EliteRide</Link></li>
              <li><Link to="/mart">🛒 EliteMart</Link></li>
              <li><Link to="/cart">🛍️ My Cart</Link></li>
              <li><Link to="/orders">📦 My Orders</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">ℹ️ About Us</Link></li>
              <li><Link to="/contact">📬 Contact</Link></li>
              <li><a href="#!">📜 Privacy Policy</a></li>
              <li><a href="#!">📋 Terms of Service</a></li>
              <li><a href="#!">🤝 Partner with Us</a></li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact">
              <p>📍 RNS Institute of Technology, Bangalore</p>
              <p>📧 hello@elitex.app</p>
              <p>📞 +91 98765 43210</p>
              <div className="footer-delivery-note">
                <span>🏍️</span>
                <span>Flat <strong>₹15</strong> delivery on all food orders!</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} EliteX. Made with ❤️ for campus students.</p>
          <div className="footer-bottom-links">
            <a href="#!">Privacy</a>
            <a href="#!">Terms</a>
            <a href="#!">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
