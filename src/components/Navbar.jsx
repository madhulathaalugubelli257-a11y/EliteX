// Navbar.jsx — Responsive navbar with dark mode, cart, user menu
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalCartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <div className="nav-logo-icon">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTo9U4w2XPgkpypJ0IpfI-_6ETZJK3LWQkA&s" alt="EliteX Logo" className="nav-logo-img" />
            </div>
            <span className="nav-logo-text">Elite<span>X</span></span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            <li><NavLink to="/">🏠 {t('navbar.home')}</NavLink></li>
            {isAuthenticated && (
              <>
                <li><NavLink to="/eats">🍱 {t('navbar.eats')}</NavLink></li>
                <li><NavLink to="/ride">🛵 {t('navbar.ride')}</NavLink></li>
                <li><NavLink to="/mart">🛒 {t('navbar.mart')}</NavLink></li>
                <li><NavLink to="/dashboard">📊 {t('common.dashboard')}</NavLink></li>
              </>
            )}
            <li><NavLink to="/about">ℹ️ {t('common.about')}</NavLink></li>
          </ul>

          {/* Right controls */}
          <div className="nav-controls">
            {/* Language Switcher */}
            <div className="lang-switcher" ref={langRef}>
              <button 
                className="lang-btn" 
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                title="Change Language"
              >
                {language === 'en' ? '🇬🇧 EN' : language === 'hi' ? '🇮🇳 HI' : '🇮🇳 TE'}
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  <button onClick={() => { changeLanguage('en'); setLangOpen(false); }}>🇬🇧 English</button>
                  <button onClick={() => { changeLanguage('hi'); setLangOpen(false); }}>🇮🇳 हिन्दी</button>
                  <button onClick={() => { changeLanguage('te'); setLangOpen(false); }}>🇮🇳 తెలుగు</button>
                </div>
              )}
            </div>
            {/* Theme toggle */}
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Cart */}
            {isAuthenticated && (
              <Link to="/cart" className="cart-btn" aria-label={`Cart (${totalCartItems} items)`}>
                🛒
                {totalCartItems > 0 && (
                  <span className="cart-badge">{totalCartItems > 9 ? '9+' : totalCartItems}</span>
                )}
              </Link>
            )}

            {/* Auth buttons or user menu */}
            {isAuthenticated ? (
              <div className="user-menu" ref={dropdownRef}>
                <button
                  className="user-btn"
                  onClick={() => setDropdownOpen((p) => !p)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="avatar">{user?.avatar || '👤'}</span>
                  <span className="user-name">{user?.name?.split(' ')[0]}</span>
                  <span>▾</span>
                </button>
                {dropdownOpen && (
                  <div className="user-dropdown" role="menu">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>📊 {t('common.dashboard')}</Link>
                    <Link to="/orders" onClick={() => setDropdownOpen(false)}>📦 {t('common.orders')}</Link>
                    <Link to="/profile" onClick={() => setDropdownOpen(false)}>👤 {t('common.profile')}</Link>
                    <div className="divider-line" />
                    <button className="logout-btn" onClick={handleLogout}>🚪 {t('common.logout')}</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-sm">{t('common.login')}</Link>
                <Link to="/register" className="btn btn-primary btn-sm">{t('common.signUp')}</Link>
              </>
            )}

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <Link to="/" onClick={closeMenu}>🏠 {t('navbar.home')}</Link>
        {isAuthenticated ? (
          <>
            <Link to="/eats" onClick={closeMenu}>🍱 {t('navbar.eats')}</Link>
            <Link to="/ride" onClick={closeMenu}>🛵 {t('navbar.ride')}</Link>
            <Link to="/mart" onClick={closeMenu}>🛒 {t('navbar.mart')}</Link>
            <Link to="/dashboard" onClick={closeMenu}>📊 {t('common.dashboard')}</Link>
            <Link to="/cart" onClick={closeMenu}>🛒 {t('common.cart')} {totalCartItems > 0 && `(${totalCartItems})`}</Link>
            <Link to="/orders" onClick={closeMenu}>📦 {t('common.orders')}</Link>
            <Link to="/profile" onClick={closeMenu}>👤 {t('common.profile')}</Link>
            <Link to="/about" onClick={closeMenu}>ℹ️ {t('common.about')}</Link>
            <Link to="/contact" onClick={closeMenu}>📬 {t('common.contact')}</Link>
            <a href="#!" onClick={handleLogout}>🚪 {t('common.logout')}</a>
          </>
        ) : (
          <>
            <Link to="/about" onClick={closeMenu}>ℹ️ {t('common.about')}</Link>
            <Link to="/contact" onClick={closeMenu}>📬 {t('common.contact')}</Link>
            <Link to="/login" onClick={closeMenu}>🔑 {t('common.login')}</Link>
            <Link to="/register" onClick={closeMenu}>📝 {t('common.signUp')}</Link>
          </>
        )}
      </div>
    </>
  );
}
