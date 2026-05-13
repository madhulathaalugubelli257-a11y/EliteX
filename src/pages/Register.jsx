// Register.jsx — Mock registration page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Auth.css';

const colleges = [
  'RNS Institute of Technology',
  'Dayananda Sagar College of Engineering',
  'RVCE',
  'BMS College of Engineering',
  'PESIT',
  'New Horizon College',
  'East West College',
  'Other',
];

export default function Register() {
  const { register, loading, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setAuthError('');
    setLocalError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.';
    if (!form.email.includes('@')) return 'Please enter a valid email.';
    if (!form.college) return 'Please select your college.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setLocalError(err); return; }
    try {
      await register(form.name, form.email, form.password, form.college);
      navigate('/dashboard');
    } catch {
      // Error in AuthContext
    }
  };

  const error = localError || authError;

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo-icon">🚀</span>
          <span className="auth-logo-text">EliteX</span>
        </div>
        <h2 className="auth-left-title">Join the campus revolution.</h2>
        <p className="auth-left-desc">4,500+ students are already on EliteX. Be part of the community.</p>
        <div className="auth-features">
          <div className="auth-feature">✅ 100% free to sign up</div>
          <div className="auth-feature">✅ No subscription fees</div>
          <div className="auth-feature">✅ Student-first design</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">{t('auth.registerTitle')} 🎓</h1>
            <p className="auth-subtitle">Join EliteX — it's free!</p>
          </div>

          {error && <div className="auth-error" role="alert">❌ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="input-group">
              <label htmlFor="reg-name">{t('auth.name')}</label>
              <input
                id="reg-name"
                type="text"
                name="name"
                className="input-field"
                placeholder="Aarav Sharma"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">{t('auth.email')}</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                className="input-field"
                placeholder="you@campus.edu"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-college">College / Institution</label>
              <select
                id="reg-college"
                name="college"
                className="input-field sort-select"
                value={form.college}
                onChange={handleChange}
                required
              >
                <option value="">Select your college</option>
                {colleges.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="reg-password">{t('auth.password')}</label>
              <div className="password-wrap">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input-field"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label="Toggle password"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <input
                id="reg-confirm"
                type="password"
                name="confirmPassword"
                className="input-field"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              id="register-submit"
              type="submit"
              className="btn btn-primary w-full auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating account...' : `${t('auth.registerBtn')} 🚀`}
            </button>
          </form>

          <p className="auth-switch">
            {t('auth.haveAccount')}{' '}
            <Link to="/login">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
