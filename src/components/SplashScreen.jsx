// SplashScreen.jsx — Premium animated intro screen for EliteX
import { useState, useEffect } from 'react';
import '../styles/SplashScreen.css';

const LOGO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTo9U4w2XPgkpypJ0IpfI-_6ETZJK3LWQkA&s';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit'

  // Animate the progress bar from 0 → 100 over ~3s
  useEffect(() => {
    const duration = 3000; // ms
    const interval = 30;   // tick every 30ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Trigger exit animation when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      // small delay so user sees 100% bar before fade-out
      const exitTimer = setTimeout(() => setPhase('exit'), 300);
      return () => clearTimeout(exitTimer);
    }
  }, [progress]);

  // Unmount after exit animation completes
  useEffect(() => {
    if (phase === 'exit') {
      const unmountTimer = setTimeout(onFinish, 700); // matches CSS transition
      return () => clearTimeout(unmountTimer);
    }
  }, [phase, onFinish]);

  return (
    <div className={`splash-root ${phase === 'exit' ? 'splash-exit' : ''}`}>
      {/* Animated background orbs */}
      <div className="splash-orb splash-orb-1" />
      <div className="splash-orb splash-orb-2" />
      <div className="splash-orb splash-orb-3" />

      {/* Floating neon particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`splash-particle splash-p${i + 1}`} />
      ))}

      {/* Main content */}
      <div className="splash-content">

        {/* Logo block */}
        <div className="splash-logo-wrap">
          <div className="splash-logo-ring" />
          <div className="splash-logo-ring splash-logo-ring-2" />
          <div className="splash-logo-img-box">
            <img src={LOGO_URL} alt="EliteX" className="splash-logo-img" />
          </div>
        </div>

        {/* Brand name */}
        <div className="splash-brand">
          <span className="splash-brand-elite">Elite</span>
          <span className="splash-brand-x">X</span>
        </div>

        {/* Tagline — letter-by-letter reveal */}
        <p className="splash-tagline">The Ultimate Student Super App</p>

        {/* Sub-tags */}
        <div className="splash-subtags">
          <span className="splash-subtag">🍱 Food</span>
          <span className="splash-dot">•</span>
          <span className="splash-subtag">🛵 Rides</span>
          <span className="splash-dot">•</span>
          <span className="splash-subtag">🛒 Groceries</span>
        </div>

        {/* Progress section */}
        <div className="splash-loader-wrap">
          {/* Spinning futuristic ring */}
          <div className="splash-spinner">
            <div className="splash-spinner-inner" />
          </div>

          {/* Progress bar */}
          <div className="splash-progress-track">
            <div
              className="splash-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Glowing dots */}
          <div className="splash-dots">
            <span className="splash-dot-pulse" style={{ animationDelay: '0s' }} />
            <span className="splash-dot-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="splash-dot-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        <p className="splash-loading-text">Initializing EliteX…</p>
      </div>

      {/* Light streak effect */}
      <div className="splash-streak splash-streak-1" />
      <div className="splash-streak splash-streak-2" />
    </div>
  );
}
