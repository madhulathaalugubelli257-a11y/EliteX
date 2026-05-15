import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Emergency.css';
import HospitalCard from './HospitalCard';
import DriverDetailsCard from './DriverDetailsCard';
import EmergencyStatusTracker from './EmergencyStatusTracker';
import AmbulanceTracker from './AmbulanceTracker';

// Mock Data
const EMERGENCY_TYPES = [
  'Accident',
  'Medical Emergency',
  'Injury',
  'Breathing Problem',
  'Heart Emergency',
  'Other'
];

const MOCK_HOSPITALS = [
  { id: 'h1', name: 'City Care Hospital', eta: '5', distance: '1.2', rating: '4.8', contact: '102-111' },
  { id: 'h2', name: 'Apollo Clinic', eta: '8', distance: '2.5', rating: '4.6', contact: '102-222' },
  { id: 'h3', name: 'Elite Emergency Center', eta: '10', distance: '3.1', rating: '4.9', contact: '102-333' },
  { id: 'h4', name: 'Sunrise Hospital', eta: '12', distance: '4.0', rating: '4.5', contact: '102-444' },
  { id: 'h5', name: 'Medico Care', eta: '15', distance: '5.2', rating: '4.3', contact: '102-555' }
];

const STEPS = {
  LOCATION: 'LOCATION',
  HOSPITALS: 'HOSPITALS',
  SEARCHING: 'SEARCHING',
  CONFIRMATION: 'CONFIRMATION',
  TRACKING: 'TRACKING'
};

export default function EmergencyModal({ isOpen, onClose }) {
  const { addSosBooking } = useCart();
  
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState('Campus Main Gate'); // default mock location
  const [emergencyType, setEmergencyType] = useState(EMERGENCY_TYPES[0]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  // Tracking timeline
  const [trackingStep, setTrackingStep] = useState(0); // 0 to 4

  // Reset modal on open/close
  useEffect(() => {
    if (isOpen) {
      setStep(STEPS.LOCATION);
      setSelectedHospital(null);
      setTrackingStep(0);
    }
  }, [isOpen]);

  // Handle flow
  const handleFindHospitals = () => setStep(STEPS.HOSPITALS);
  
  const handleSelectHospital = (hosp) => {
    setSelectedHospital(hosp);
    setStep(STEPS.SEARCHING);
  };

  useEffect(() => {
    if (step === STEPS.SEARCHING) {
      const timer = setTimeout(() => {
        setStep(STEPS.CONFIRMATION);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleConfirmBooking = () => {
    const booking = {
      id: `SOS-${Date.now()}`,
      hospital: selectedHospital.name,
      eta: selectedHospital.eta,
      type: emergencyType,
      location,
      driverName: 'Ramesh Singh',
      driverPlate: 'MH 12 ER 9901',
      date: new Date().toLocaleString('en-IN'),
      status: 'Active'
    };
    addSosBooking(booking);
    setStep(STEPS.TRACKING);
  };

  // Tracking animation
  useEffect(() => {
    if (step === STEPS.TRACKING && trackingStep < 4) {
      const timer = setTimeout(() => {
        setTrackingStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, trackingStep]);

  if (!isOpen) return null;

  return (
    <div className="emergency-overlay">
      <div className="emergency-modal">
        <div className="emergency-header">
          <h2>🚨 Emergency SOS</h2>
          <button className="emergency-close-btn" onClick={onClose}>×</button>
        </div>

        {step === STEPS.LOCATION && (
          <div className="step-location">
            <div className="emergency-form-group">
              <label>Current Location</label>
              <input 
                type="text" 
                className="emergency-input" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter exact location"
              />
            </div>
            <div className="emergency-form-group">
              <label>Emergency Type</label>
              <select 
                className="emergency-input"
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
              >
                {EMERGENCY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <button className="emergency-btn-primary" onClick={handleFindHospitals}>
              Find Nearby Hospitals
            </button>
          </div>
        )}

        {step === STEPS.HOSPITALS && (
          <div className="step-hospitals">
            <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Select Destination Hospital</h3>
            <div className="hospital-list">
              {MOCK_HOSPITALS.map(hosp => (
                <HospitalCard key={hosp.id} hospital={hosp} onSelect={handleSelectHospital} />
              ))}
            </div>
          </div>
        )}

        {step === STEPS.SEARCHING && (
          <div className="emergency-searching">
            <div className="radar-pulse">🚑</div>
            <h3 style={{ color: '#ff4757' }}>Dispatching Ambulance...</h3>
            <p style={{ color: '#aaa' }}>Contacting {selectedHospital?.name}</p>
          </div>
        )}

        {step === STEPS.CONFIRMATION && (
          <div className="step-confirmation">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✅</div>
              <h3 style={{ margin: 0, color: '#2ed573' }}>Ambulance Assigned</h3>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '8px' }}>
                Driver and hospital details have been successfully shared.
              </p>
            </div>

            <DriverDetailsCard 
              driverName="Ramesh Singh"
              driverRating="4.9"
              ambulancePlate="MH 12 ER 9901"
              hospitalName={selectedHospital?.name}
              eta={selectedHospital?.eta}
              isTrackingMode={false}
            />
            
            <div style={{ textAlign: 'center' }}>
              
              <button className="emergency-btn-primary" onClick={handleConfirmBooking}>
                Track Ambulance
              </button>
            </div>
          </div>
        )}

        {step === STEPS.TRACKING && (
          <div className="step-tracking">
            <AmbulanceTracker trackingStep={trackingStep} />

            <DriverDetailsCard 
              driverName="Ramesh Singh"
              driverRating="4.9"
              ambulancePlate="MH 12 ER 9901"
              hospitalName={selectedHospital?.name}
              eta={selectedHospital?.eta}
              isTrackingMode={true}
            />

            <EmergencyStatusTracker 
              trackingStep={trackingStep}
              hospitalName={selectedHospital?.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
