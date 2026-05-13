// RideBooking.jsx — Ride booking detail page with split fare calculator
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rides } from '../data/rideData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // for per-user ride booking history
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/RideBooking.css';

export default function RideBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addRideBooking } = useCart(); // persists booking to this user's localStorage

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [splitPeople, setSplitPeople] = useState(1);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ pickup: '', note: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = rides.find((r) => r.id === id);
      setRide(found || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading ride details..." />;

  if (!ride) {
    return (
      <div className="empty-state" style={{ paddingTop: '80px' }}>
        <span className="empty-icon">🛵</span>
        <h3>Ride not found</h3>
        <Link to="/ride" className="btn btn-primary">Back to EliteRide</Link>
      </div>
    );
  }

  const splitFare = Math.ceil(ride.farePerSeat / splitPeople);

  const handleBook = (e) => {
    e.preventDefault();
    if (!form.pickup.trim()) {
      setToast({ message: 'Please enter your pickup point.', type: 'error' });
      return;
    }
    // Save booking to per-user ride history in localStorage
    const booking = {
      id: `RIDE-${Date.now()}`,
      rideId: ride.id,
      driverName: ride.driverName,
      from: ride.from,
      to: ride.to,
      date: ride.date,
      time: ride.time,
      fare: splitFare,
      pickup: form.pickup,
      note: form.note,
      bookedAt: new Date().toLocaleString('en-IN'),
      status: 'Confirmed',
    };
    addRideBooking(booking);
    setBooked(true);
    setToast({ message: `Ride booked! Driver ${ride.driverName} will be notified.`, type: 'success' });
  };

  if (booked) {
    return (
      <div className="booking-success container">
        <div className="booking-success-card">
          <div className="success-icon">🎉</div>
          <h2>Ride Booked!</h2>
          <p>Your ride with <strong>{ride.driverName}</strong> is confirmed.</p>
          <div className="booking-summary">
            <div className="booking-row"><span>From</span><strong>{ride.from}</strong></div>
            <div className="booking-row"><span>To</span><strong>{ride.to}</strong></div>
            <div className="booking-row"><span>Time</span><strong>{ride.time}</strong></div>
            <div className="booking-row"><span>Fare</span><strong>₹{splitFare}</strong></div>
          </div>
          <div className="success-actions">
            <Link to="/ride" className="btn btn-secondary">Find More Rides</Link>
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ride-booking-page">
        <div className="breadcrumb container">
          <Link to="/ride">EliteRide</Link>
          <span>›</span>
          <span>Book Ride</span>
        </div>

        <div className="container">
          <div className="ride-booking-grid">
            {/* Ride summary */}
            <div className="ride-summary-card card">
              <h3 className="ride-sum-title">Ride Details</h3>

              <div className="driver-profile">
                <span className="driver-big-avatar">{ride.driverAvatar}</span>
                <div>
                  <h4>{ride.driverName}</h4>
                  <div className="driver-badges">
                    <span>★ {ride.driverRating}</span>
                    <span>🚗 {ride.driverTrips} trips</span>
                    {ride.isVerified && <span className="badge badge-success">Verified</span>}
                  </div>
                </div>
              </div>

              <div className="divider" />

              <div className="ride-route" style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px' }}>
                <div className="route-point">
                  <span className="route-dot from-dot" />
                  <div>
                    <span className="route-label">From</span>
                    <span className="route-location">{ride.from}</span>
                  </div>
                </div>
                <div className="route-line" />
                <div className="route-point">
                  <span className="route-dot to-dot" />
                  <div>
                    <span className="route-label">To</span>
                    <span className="route-location">{ride.to}</span>
                  </div>
                </div>
              </div>

              <div className="ride-info-grid">
                <div className="ride-info-item"><span>📅</span><div><span className="rinfo-label">Date</span><strong>{ride.date}</strong></div></div>
                <div className="ride-info-item"><span>⏰</span><div><span className="rinfo-label">Time</span><strong>{ride.time}</strong></div></div>
                <div className="ride-info-item"><span>📍</span><div><span className="rinfo-label">Distance</span><strong>{ride.distance}</strong></div></div>
                <div className="ride-info-item"><span>🏍️</span><div><span className="rinfo-label">Vehicle</span><strong>{ride.vehicle}</strong></div></div>
              </div>

              {/* Split fare calculator */}
              <div className="split-calc">
                <h4 className="split-title">💰 Split Fare Calculator</h4>
                <div className="input-group">
                  <label htmlFor="split-people">Splitting with how many?</label>
                  <input
                    id="split-people"
                    type="range"
                    min={1}
                    max={4}
                    value={splitPeople}
                    onChange={(e) => setSplitPeople(Number(e.target.value))}
                    className="split-slider"
                  />
                  <div className="split-labels">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className={splitPeople === n ? 'split-active' : ''}>{n}</span>
                    ))}
                  </div>
                </div>
                <div className="split-result">
                  <div>
                    <span>Total fare: <strong>₹{ride.farePerSeat}</strong></span>
                  </div>
                  <div className="split-per-person">
                    Each pays: <strong>₹{splitFare}</strong>
                    {splitPeople > 1 && <span className="split-saving"> (You save ₹{ride.farePerSeat - splitFare}!)</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking form */}
            <div className="booking-form-card card">
              <h3 className="ride-sum-title">Book This Ride</h3>
              <div className="booking-passenger">
                <span className="booking-avatar">{user?.avatar || '👤'}</span>
                <div>
                  <strong>{user?.name}</strong>
                  <span className="booking-seat">Seat confirmed</span>
                </div>
                <span className={`badge ${ride.availableSeats > 0 ? 'badge-success' : 'badge-danger'}`}>
                  {ride.availableSeats} seat{ride.availableSeats !== 1 ? 's' : ''} left
                </span>
              </div>

              <form onSubmit={handleBook} className="auth-form">
                <div className="input-group">
                  <label htmlFor="pickup-point">Pickup Point *</label>
                  <input
                    id="pickup-point"
                    type="text"
                    className="input-field"
                    placeholder="e.g., Main gate, Block B entrance..."
                    value={form.pickup}
                    onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="booking-note">Note to Driver (optional)</label>
                  <textarea
                    id="booking-note"
                    className="input-field"
                    rows={3}
                    placeholder="Any special instructions..."
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="booking-fare-summary">
                  <span>Fare to pay:</span>
                  <strong className="booking-fare">₹{splitFare}</strong>
                </div>

                <button
                  id="confirm-ride-booking"
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={ride.availableSeats === 0}
                >
                  {ride.availableSeats === 0 ? 'This Ride is Full' : '✅ Confirm Booking'}
                </button>

                <p className="booking-note-text">
                  🛡️ Payment is collected directly from the driver. EliteX is a platform connector.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
