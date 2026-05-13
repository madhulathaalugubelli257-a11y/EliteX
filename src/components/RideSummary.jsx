// RideSummary.jsx — Step 4: booking summary before confirmation
import { useMemo } from 'react';
import { getRandomDriver } from '../data/rideData';

export default function RideSummary({ pickup, destination, vehicle, sharing, fare, distance, onConfirm, onBack }) {
  // Assign a mock driver once (useMemo so it doesn't re-randomise on re-render)
  const driver = useMemo(() => getRandomDriver(), []);
  const eta = vehicle.baseEta + Math.round(distance / 5);
  const baseFare = Math.ceil(vehicle.baseFare * sharing.multiplier);
  const distanceFare = fare - baseFare;

  return (
    <div>
      {/* ── Route card ── */}
      <div className="ride-summary-card">
        <p className="summary-section-title">Your Route</p>
        <div className="summary-route">
          <div className="summary-route-point">
            <span className="sr-dot sr-dot-from" />
            <div>
              <span className="sr-tag">Pickup</span>
              <span className="sr-location">{pickup.name}</span>
            </div>
          </div>
          <div className="sr-line" />
          <div className="summary-route-point">
            <span className="sr-dot sr-dot-to" />
            <div>
              <span className="sr-tag">Destination</span>
              <span className="sr-location">{destination.name}</span>
            </div>
          </div>
        </div>

        {/* ── Vehicle row ── */}
        <div className="summary-vehicle-row">
          <div className="sv-icon">{vehicle.icon}</div>
          <div className="sv-info">
            <span className="sv-name">{vehicle.name} · {sharing.label}</span>
            <span className="sv-meta">{distance.toFixed(1)} km · ~{eta} min</span>
          </div>
          <span className="sv-fare">₹{fare}</span>
        </div>

        {/* ── Fare breakdown ── */}
        <div className="fare-breakdown">
          <div className="fare-row">
            <span>Base fare</span>
            <span>₹{baseFare}</span>
          </div>
          <div className="fare-row">
            <span>Distance ({distance.toFixed(1)} km)</span>
            <span>₹{distanceFare}</span>
          </div>
          {sharing.id === 'shared' && (
            <div className="fare-row" style={{ color: 'var(--accent)' }}>
              <span>Sharing discount</span>
              <span>Applied ✓</span>
            </div>
          )}
          <div className="fare-row total">
            <span>Total</span>
            <span>₹{fare}</span>
          </div>
        </div>
      </div>

      {/* ── Assigned driver ── */}
      <div className="driver-card">
        <div className="driver-big-avi">{driver.avatar}</div>
        <div className="driver-details">
          <span className="driver-nm">{driver.name}</span>
          <span className="driver-sub">★ {driver.rating} · {driver.trips} trips</span>
          <span className="driver-plate">🚗 {driver.plate}</span>
        </div>
        <span className="badge badge-success">Verified ✓</span>
      </div>

      {/* ── Payment note ── */}
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '16px' }}>
        💵 Pay ₹{fare} directly to driver · EliteX is a platform connector
      </p>

      {/* ── Action buttons ── */}
      <div className="flow-footer">
        <button className="btn btn-secondary" onClick={onBack}>← Change</button>
        <button
          id="confirm-booking-btn"
          className="btn btn-primary"
          onClick={() => onConfirm(driver)}
        >
          ✅ Confirm Booking
        </button>
      </div>
    </div>
  );
}
