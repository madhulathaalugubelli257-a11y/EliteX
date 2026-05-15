// CampusRide.jsx — Multi-step ride booking flow (Uber/Ola style, college-level React)
//
// STEP FLOW:
//   LOCATION → SEARCHING (2s animation) → VEHICLE → SUMMARY → SUCCESS
//
// State lives here; child components receive only what they need as props.
// Ride history is persisted per-user via CartContext.addRideBooking().

import { useState, useEffect } from 'react';
import { Link }                from 'react-router-dom';

import LocationPicker   from '../components/LocationPicker';
import RideTypeSelector from '../components/RideTypeSelector';
import RideSummary      from '../components/RideSummary';
import EmergencyModal   from '../components/EmergencyModal';
import SOSButton        from '../components/SOSButton';

import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/RideFlow.css';
import '../styles/CampusRide.css'; // keep SOS banner styles

// ── Step constants ─────────────────────────────────────────────────────────
const STEP = {
  LOCATION:  'LOCATION',
  SEARCHING: 'SEARCHING',
  VEHICLE:   'VEHICLE',
  SUMMARY:   'SUMMARY',
  SUCCESS:   'SUCCESS',
};

// ── Step progress config ───────────────────────────────────────────────────
const STEPS_CONFIG = [
  { key: STEP.LOCATION,  label: 'Route'    },
  { key: STEP.VEHICLE,   label: 'Vehicle'  },
  { key: STEP.SUMMARY,   label: 'Summary'  },
  { key: STEP.SUCCESS,   label: 'Confirm'  },
];

const STEP_ORDER = [STEP.LOCATION, STEP.VEHICLE, STEP.SUMMARY, STEP.SUCCESS];

// ── Step Progress Bar ──────────────────────────────────────────────────────
function StepBar({ currentStep }) {
  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="ride-steps">
      {STEPS_CONFIG.map((s, i) => {
        const idx    = STEP_ORDER.indexOf(s.key);
        const done   = idx < currentIdx;
        const active = idx === currentIdx;

        return (
          <div key={s.key} className="step-item">
            {i > 0 && <div className={`step-connector ${done || active ? 'done' : ''}`} />}
            <div className={`step-circle ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              {done ? '✓' : i + 1}
            </div>
            <span className={`step-label ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Searching animation screen ─────────────────────────────────────────────
function SearchingScreen() {
  return (
    <div className="searching-overlay">
      <div className="searching-pulse">🛵</div>
      <p className="searching-text">Finding rides near you…</p>
      <p className="searching-sub">Checking availability from student drivers</p>
    </div>
  );
}

// ── Success screen ─────────────────────────────────────────────────────────
function SuccessScreen({ booking, onBookAgain }) {
  return (
    <div className="booking-success-page">
      <div className="success-anim">🎉</div>
      <h2 className="success-title">Ride Booked!</h2>
      <p className="success-sub">
        <strong>{booking.driverName}</strong> will reach your pickup in ~{booking.eta} min
      </p>

      <div className="success-detail-card">
        <div className="sdc-header">
          <span className="sdc-id">Booking ID: {booking.id}</span>
          <span className="sdc-status">Confirmed ✓</span>
        </div>
        <div className="sdc-rows">
          <div className="sdc-row">
            <span>Pickup</span>
            <span>{booking.pickupName}</span>
          </div>
          <div className="sdc-row">
            <span>Destination</span>
            <span>{booking.destName}</span>
          </div>
          <div className="sdc-row">
            <span>Vehicle</span>
            <span>{booking.vehicleName} · {booking.sharingLabel}</span>
          </div>
          <div className="sdc-row">
            <span>Driver</span>
            <span>{booking.driverName}</span>
          </div>
          <div className="sdc-row">
            <span>Fare</span>
            <span style={{ color: 'var(--primary)', fontWeight: 900 }}>₹{booking.fare}</span>
          </div>
          <div className="sdc-row">
            <span>ETA</span>
            <span>~{booking.eta} min</span>
          </div>
        </div>
      </div>

      <div className="success-actions">
        <button className="btn btn-secondary" onClick={onBookAgain}>+ Book Another</button>
        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard →</Link>
      </div>
    </div>
  );
}

// ── Main CampusRide page ───────────────────────────────────────────────────
export default function CampusRide() {
  const { addRideBooking } = useCart();
  const { t } = useLanguage();

  // ---- step state ----
  const [step, setStep] = useState(STEP.LOCATION);

  // ---- location state ----
  const [pickup,      setPickup]      = useState(null);
  const [destination, setDestination] = useState(null);

  // ---- vehicle + sharing state ----
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSharing, setSelectedSharing] = useState(null);
  const [fare,             setFare]            = useState(null);
  const [distance,         setDistance]        = useState(null);

  // ---- final booking object ----
  const [booking, setBooking] = useState(null);

  // ---- SOS ----
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  // Step 1 → 2 (SEARCHING transition)
  const handleFindRides = () => {
    setStep(STEP.SEARCHING);
  };

  // Searching → VEHICLE (after 2 s delay)
  useEffect(() => {
    if (step !== STEP.SEARCHING) return;
    const t = setTimeout(() => setStep(STEP.VEHICLE), 2000);
    return () => clearTimeout(t);
  }, [step]);

  // Step 2 (vehicle selected) → Step 3 (summary)
  const handleVehicleConfirm = (vehicle, sharing, calculatedFare, dist) => {
    setSelectedVehicle(vehicle);
    setSelectedSharing(sharing);
    setFare(calculatedFare);
    setDistance(dist);
    setStep(STEP.SUMMARY);
  };

  // Step 3 (summary) → Step 4 (success): create booking record
  const handleConfirmBooking = (driver) => {
    const eta = selectedVehicle.baseEta + Math.round(distance / 5);
    const bookingRecord = {
      id:           `RIDE-${Date.now()}`,
      pickupId:     pickup.id,
      pickupName:   pickup.name,
      destId:       destination.id,
      destName:     destination.name,
      vehicleId:    selectedVehicle.id,
      vehicleName:  selectedVehicle.name,
      sharingId:    selectedSharing.id,
      sharingLabel: selectedSharing.label,
      fare,
      distance:     distance.toFixed(1),
      eta,
      driverName:   driver.name,
      driverAvatar: driver.avatar,
      driverRating: driver.rating,
      driverPlate:  driver.plate,
      bookedAt:     new Date().toLocaleString('en-IN'),
      status:       'Confirmed',
    };
    addRideBooking(bookingRecord); // persist to user-specific localStorage
    setBooking(bookingRecord);
    setStep(STEP.SUCCESS);
  };

  // Reset entire flow
  const handleBookAgain = () => {
    setPickup(null);
    setDestination(null);
    setSelectedVehicle(null);
    setSelectedSharing(null);
    setFare(null);
    setDistance(null);
    setBooking(null);
    setStep(STEP.LOCATION);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="ride-flow-page">
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <h1>🛵 {t('ride.title')}</h1>
          <p>{t('ride.subtitle')}</p>
        </div>
      </div>

      <div className="container ride-flow-body">
        {/* SOS safety banner — visible on all steps except SUCCESS */}
        {step !== STEP.SUCCESS && (
          <div className="sos-banner" style={{ marginBottom: '24px' }}>
            <div className="sos-info">
              <span>🛡️</span>
              <div>
                <strong>Safety First!</strong>
                <span> All drivers are student-verified. Emergency?</span>
              </div>
            </div>
            <SOSButton onClick={() => setIsEmergencyOpen(true)} />
          </div>
        )}

        {/* Step progress bar — hidden during SEARCHING and SUCCESS */}
        {step !== STEP.SEARCHING && step !== STEP.SUCCESS && (
          <StepBar currentStep={step} />
        )}

        {/* ── Step screens ── */}
        {step === STEP.LOCATION && (
          <LocationPicker
            pickup={pickup}
            destination={destination}
            onPickupChange={setPickup}
            onDestChange={setDestination}
            onConfirm={handleFindRides}
          />
        )}

        {step === STEP.SEARCHING && <SearchingScreen />}

        {step === STEP.VEHICLE && (
          <RideTypeSelector
            pickup={pickup}
            destination={destination}
            onConfirm={handleVehicleConfirm}
            onBack={() => setStep(STEP.LOCATION)}
          />
        )}

        {step === STEP.SUMMARY && (
          <RideSummary
            pickup={pickup}
            destination={destination}
            vehicle={selectedVehicle}
            sharing={selectedSharing}
            fare={fare}
            distance={distance}
            onConfirm={handleConfirmBooking}
            onBack={() => setStep(STEP.VEHICLE)}
          />
        )}

        {step === STEP.SUCCESS && booking && (
          <SuccessScreen booking={booking} onBookAgain={handleBookAgain} />
        )}
      </div>

      <EmergencyModal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
      />
    </div>
  );
}
