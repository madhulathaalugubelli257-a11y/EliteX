// Login.jsx — Mock authentication login page
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Auth.css';

export default function Login() {
  const { login, loading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Redirect to the page they were trying to visit, or dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setAuthError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setAuthError('Please fill in all fields.');
      return;
    }
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch {
      // Error is already set in AuthContext
    }
  };

  const fillDemo = () => {
    setForm({ email: 'demo@elitex.app', password: 'demo123' });
    setAuthError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo-icon">🚀</span>
          <span className="auth-logo-text">EliteX</span>
        </div>
        <h2 className="auth-left-title">Your campus,<br />Your way.</h2>
        <p className="auth-left-desc">Food · Rides · Groceries — all in one student super app.</p>
        <div className="auth-features">
          <div className="auth-feature">🍱 Order from nearby dhabas</div>
          <div className="auth-feature">🛵 Book verified student rides</div>
          <div className="auth-feature">🛒 Pool weekly groceries</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">{t('auth.loginTitle')} 👋</h1>
            <p className="auth-subtitle">Sign in to your EliteX account</p>
          </div>

          <button className="demo-btn" onClick={fillDemo} type="button">
            ⚡ Fill Demo Credentials
          </button>

          {authError && (
            <div className="auth-error" role="alert">❌ {authError}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="input-group">
              <label htmlFor="login-email">{t('auth.email')}</label>
              <input
                id="login-email"
                type="email"
                name="email"
                className="input-field"
                placeholder="you@campus.edu"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">{t('auth.password')}</label>
              <div className="password-wrap">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input-field"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary w-full auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : `${t('auth.loginBtn')} 🚀`}
            </button>
          </form>

          <div className="auth-divider"><span>OR</span></div>

          <div className="auth-demo-hint">
            <p><strong>Demo accounts:</strong></p>
            <p>📧 demo@elitex.app / demo123</p>
            <p>📧 aarav@campus.edu / student123</p>
          </div>

          <p className="auth-switch">
            {t('auth.noAccount')}{' '}
            <Link to="/register">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
