import React from 'react';
import '../styles/Emergency.css';

export default function EmergencyStatusTracker({ trackingStep, hospitalName }) {
  const steps = [
    { label: 'Request Sent', desc: 'Emergency signal broadcasted' },
    { label: 'Hospital Confirmed', desc: `${hospitalName || 'Hospital'} acknowledged` },
    { label: 'Ambulance Assigned', desc: 'Vehicle MH 12 ER 9901 dispatched' },
    { label: 'Driver On The Way', desc: 'Paramedic is en route to pickup' },
    { label: 'Arriving Soon', desc: 'Ambulance is nearby' }
  ];

  return (
    <>
      <h4 style={{ color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Status</h4>
      <div className="status-timeline">
        {steps.map((tStep, idx) => (
          <div key={idx} className={`timeline-step ${idx <= trackingStep ? 'active' : ''}`}>
            <div className="step-indicator">{idx < trackingStep ? '✓' : idx + 1}</div>
            <div className="step-content">
              <h4>{tStep.label}</h4>
              <p>{tStep.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
