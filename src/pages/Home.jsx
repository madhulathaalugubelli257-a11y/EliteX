// Home.jsx — Landing page showcasing all 3 modules
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Home.css';

const stats = [
  { icon: '🍱', label: 'Food Orders', value: '12,400+' },
  { icon: '🛵', label: 'Rides Completed', value: '8,200+' },
  { icon: '🛒', label: 'Grocery Deliveries', value: '5,800+' },
  { icon: '🎓', label: 'Students Served', value: '4,500+' },
];

const modules = [
  {
    id: 'eats',
    icon: '🍱',
    color: '#FF6584',
    title: 'EliteEats',
    subtitle: 'Food at your door',
    desc: 'Order from nearby dhabas, canteens & tiffin centres. Flat ₹15 delivery. Group orders available.',
    features: ['Flat ₹15 delivery', 'Group orders', 'Live tracking'],
    link: '/eats',
    tag: '12+ restaurants',
  },
  {
    id: 'ride',
    icon: '🛵',
    color: '#6C63FF',
    title: 'EliteRide',
    subtitle: 'Peer-to-peer rides',
    desc: 'Book rides from verified student drivers. Pool, split fare, and get there safely.',
    features: ['Verified drivers', 'Ride pooling', 'SOS button'],
    link: '/ride',
    tag: '8 routes',
  },
  {
    id: 'mart',
    icon: '🛒',
    color: '#43D9AD',
    title: 'EliteMart',
    subtitle: 'Weekly groceries',
    desc: 'Weekly pooled grocery orders. Bulk savings up to 30%. Volunteer delivery by your batchmates.',
    features: ['Bulk savings', 'Weekly pools', 'Volunteer delivery'],
    link: '/mart',
    tag: '20+ items',
  },
];

const howItWorks = [
  { step: '01', icon: '📱', title: 'Sign Up Free', desc: 'Create your account in under 30 seconds with your college email.' },
  { step: '02', icon: '🔍', title: 'Choose a Module', desc: 'Pick EliteEats, EliteRide, or EliteMart based on your need.' },
  { step: '03', icon: '🛒', title: 'Order / Book', desc: 'Browse, select, and place your order or book your ride.' },
  { step: '04', icon: '🚀', title: 'Track & Enjoy', desc: 'Get your food, ride, or groceries delivered quickly and reliably.' },
];

const testimonials = [
  { name: 'Aarav S.', college: 'RNS IT', avatar: '🧑‍💻', text: 'EliteEats saved me from skipping lunch so many times! The dhabas here are amazing.' },
  { name: 'Priya P.', college: 'DSI College', avatar: '👩‍🎓', text: 'EliteRide is a lifesaver. No more waiting for autos at 6 AM for early classes!' },
  { name: 'Rishi K.', college: 'RVCE', avatar: '🧑‍🔬', text: 'EliteMart bulk orders save us at least ₹500 a month on groceries. Absolute win!' },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-blob blob-1" />
          <div className="hero-blob blob-2" />
          <div className="hero-blob blob-3" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🎓 Built for Campus Life</div>
            <h1 className="hero-title">
              {t('home.heroTitle')}<br />
              <span className="hero-gradient">{t('home.heroHighlight')}</span>
            </h1>
            <p className="hero-desc">
              {t('home.heroSubtitle')}
            </p>
            <div className="hero-ctas">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  🚀 {t('common.dashboard')}
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    {t('home.getStarted')} 🎉
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg">
                    {t('common.login')}
                  </Link>
                </>
              )}
            </div>
            <div className="hero-trust">
              <span>✅ No hidden charges</span>
              <span>✅ Student-verified drivers</span>
              <span>✅ Free to join</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODULES ===== */}
      <section className="section modules-section">
        <div className="container">
          <div className="section-header">
            <span className="label">What We Offer</span>
            <h2>Three Modules, One App</h2>
            <p>Everything a campus student needs — food, rides, and groceries — all in one place.</p>
          </div>
          <div className="modules-grid">
            {modules.map((mod) => (
              <div key={mod.id} className="module-card" style={{ '--mod-color': mod.color }}>
                <div className="module-icon">{mod.icon}</div>
                <div className="module-tag">{mod.tag}</div>
                <h3 className="module-title">{mod.title}</h3>
                <p className="module-subtitle">{mod.subtitle}</p>
                <p className="module-desc">{mod.desc}</p>
                <ul className="module-features">
                  {mod.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <Link to={isAuthenticated ? mod.link : '/login'} className="module-cta btn btn-primary">
                  Explore {mod.title} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section how-section">
        <div className="container">
          <div className="section-header">
            <span className="label">How It Works</span>
            <h2>Super Simple to Get Started</h2>
          </div>
          <div className="how-grid">
            {howItWorks.map((step, i) => (
              <div key={i} className="how-card">
                <div className="how-step">{step.step}</div>
                <div className="how-icon">{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="label">Student Reviews</span>
            <h2>Loved by Campus Students</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{t.avatar}</span>
                  <div>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-college">{t.college}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to upgrade your campus life?</h2>
            <p>Join 4,500+ students who already use EliteX every day.</p>
            <div className="cta-btns">
              <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn btn-primary btn-lg">
                {isAuthenticated ? 'Go to Dashboard' : 'Join Free Today'} 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
