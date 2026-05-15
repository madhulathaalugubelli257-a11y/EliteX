import React from 'react';
import '../styles/Emergency.css';

export default function DriverDetailsCard({ driverName, driverRating, ambulancePlate, hospitalName, eta, isTrackingMode }) {
  return (
    <div className="driver-details-card" style={isTrackingMode ? { marginTop: 0, marginBottom: '24px' } : {}}>
      {isTrackingMode && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0 }}>Ambulance En Route</h3>
            <p style={{ margin: 0, color: '#aaa' }}>{hospitalName}</p>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ff4757' }}>
            {eta}m
          </div>
        </div>
      )}

      <div className="driver-profile" style={isTrackingMode ? { marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' } : {}}>
        <img src="https://i.pravatar.cc/150?img=11" alt="Driver" className="driver-avatar" />
        <div className="driver-info">
          <h3>{driverName}</h3>
          <p>★ {driverRating} · Paramedic Certified</p>
          <div className="ambulance-plate">{ambulancePlate}</div>
        </div>
      </div>
      
      {!isTrackingMode && (
        <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#aaa' }}>Hospital:</span>
            <span style={{ fontWeight: 'bold' }}>{hospitalName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#aaa' }}>ETA:</span>
            <span style={{ fontWeight: 'bold', color: '#ff4757' }}>~{eta} mins</span>
          </div>
        </div>
      )}

      {isTrackingMode && (
        <div className="contact-actions" style={{ marginTop: '0' }}>
          <button className="btn-contact btn-call">📞 Call</button>
          <button className="btn-contact btn-msg">💬 Message</button>
        </div>
      )}
    </div>
  );
}
