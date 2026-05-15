import React from 'react';
import '../styles/Emergency.css';

export default function HospitalCard({ hospital, onSelect }) {
  return (
    <div className="hospital-card" onClick={() => onSelect(hospital)}>
      <div className="hosp-info">
        <h4>{hospital.name}</h4>
        <div className="hosp-meta">
          <span>★ {hospital.rating}</span>
          <span>{hospital.distance} km</span>
        </div>
        <div className="hosp-contact" style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
          📞 {hospital.contact}
        </div>
      </div>
      <div className="hosp-eta">
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#fff', textAlign: 'center' }}>
          ETA
        </div>
        {hospital.eta} min
      </div>
    </div>
  );
}
