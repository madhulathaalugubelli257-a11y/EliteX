import React from 'react';
import '../styles/Emergency.css';

export default function AmbulanceTracker({ trackingStep }) {
  // Mock map styling
  const mapStyle = {
    position: 'relative',
    height: '180px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '20px',
    border: '1px solid rgba(255, 71, 87, 0.2)',
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0'
  };

  // Mock route line
  const routeStyle = {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    zIndex: 1
  };

  // Ambulance moving pin
  // Calculate percentage based on trackingStep (0 to 4)
  // trackingStep 0: 0%
  // trackingStep 1: 0%
  // trackingStep 2: 0%
  // trackingStep 3: 50%
  // trackingStep 4: 90%
  let movePct = '0%';
  if (trackingStep === 3) movePct = '50%';
  if (trackingStep >= 4) movePct = '90%';

  const ambulanceStyle = {
    position: 'absolute',
    top: 'calc(40% - 12px)',
    left: movePct,
    fontSize: '1.5rem',
    zIndex: 3,
    transition: 'left 2s ease-in-out',
    filter: 'drop-shadow(0 0 10px rgba(255, 71, 87, 0.8))'
  };

  // Destination Pin
  const destStyle = {
    position: 'absolute',
    top: 'calc(40% - 12px)',
    right: '5%',
    fontSize: '1.5rem',
    zIndex: 2,
    filter: 'drop-shadow(0 0 10px rgba(46, 213, 115, 0.8))'
  };

  // Source Hospital Pin
  const sourceStyle = {
    position: 'absolute',
    top: 'calc(40% - 12px)',
    left: '5%',
    fontSize: '1.5rem',
    zIndex: 2,
    opacity: 0.5
  };

  return (
    <div style={mapStyle}>
      <div style={routeStyle} />
      <div style={sourceStyle}>🏥</div>
      <div style={ambulanceStyle}>🚑</div>
      <div style={destStyle}>📍</div>
      
      {/* Radar sweeping effect */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '200px', height: '200px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,71,87,0.2) 100%)',
        animation: 'spin 4s linear infinite',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '8px', right: '8px',
        background: 'rgba(0,0,0,0.6)',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.7rem',
        color: '#aaa',
        zIndex: 5
      }}>
        LIVE GPS MOCK
      </div>

      <style>
        {`
          @keyframes spin {
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
