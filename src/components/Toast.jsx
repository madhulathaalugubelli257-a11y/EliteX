// Toast.jsx — Auto-dismissing toast notification component
import { useState, useEffect } from 'react';
import '../styles/Toast.css';

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade-out animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  return (
    <div className={`toast toast-${type} ${visible ? 'show' : 'hide'}`} role="alert">
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => { setVisible(false); setTimeout(onClose, 300); }}>×</button>
    </div>
  );
}
