import React from 'react';
import '../styles/Emergency.css';

export default function SOSButton({ onClick }) {
  return (
    <button
      className="sos-trigger-btn"
      onClick={onClick}
    >
      <span className="pulse-red">🚨</span> Emergency SOS - Book Ambulance
    </button>
  );
}
