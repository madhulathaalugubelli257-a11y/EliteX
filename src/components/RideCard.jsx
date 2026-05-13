// RideCard.jsx — Reusable ride listing card for CampusRide
import { Link } from 'react-router-dom';
import '../styles/Cards.css';

export default function RideCard({ ride }) {
  const seatsLeft = ride.availableSeats;
  const seatColor = seatsLeft === 0 ? 'danger' : seatsLeft === 1 ? 'orange' : 'success';

  return (
    <div className="ride-card card">
      <div className="ride-card-header">
        <div className="ride-driver">
          <span className="ride-avatar">{ride.driverAvatar}</span>
          <div>
            <span className="ride-driver-name">{ride.driverName}</span>
            <div className="ride-driver-stats">
              <span className="stars">★</span>
              <span>{ride.driverRating}</span>
              <span className="text-muted">·</span>
              <span>{ride.driverTrips} trips</span>
              {ride.isVerified && <span className="badge badge-success">✓ Verified</span>}
            </div>
          </div>
        </div>
        <div className="ride-fare">
          <span className="ride-price">₹{ride.farePerSeat}</span>
          <span className="ride-price-label">/ seat</span>
        </div>
      </div>

      <div className="ride-route">
        <div className="route-point from">
          <span className="route-dot from-dot" />
          <div>
            <span className="route-label">From</span>
            <span className="route-location">{ride.from}</span>
          </div>
        </div>
        <div className="route-line" />
        <div className="route-point to">
          <span className="route-dot to-dot" />
          <div>
            <span className="route-label">To</span>
            <span className="route-location">{ride.to}</span>
          </div>
        </div>
      </div>

      <div className="ride-meta-row">
        <span className="ride-meta-item">📅 {ride.date}</span>
        <span className="ride-meta-item">⏰ {ride.time}</span>
        <span className="ride-meta-item">📍 {ride.distance}</span>
        <span className="ride-meta-item">⏱ {ride.duration}</span>
      </div>

      <div className="ride-card-footer">
        <div className="ride-tags">
          <span className={`badge badge-${seatColor}`}>
            {seatsLeft === 0 ? 'Full' : `${seatsLeft} seat${seatsLeft > 1 ? 's' : ''} left`}
          </span>
          {ride.pooling && <span className="badge badge-primary">🚗 Pool</span>}
          {ride.tags.slice(0, 2).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <Link
          to={`/ride/${ride.id}`}
          className={`btn btn-sm ${seatsLeft === 0 ? 'btn-secondary' : 'btn-primary'}`}
          id={`book-ride-${ride.id}`}
        >
          {seatsLeft === 0 ? 'Full' : 'Book Now'}
        </Link>
      </div>
    </div>
  );
}
