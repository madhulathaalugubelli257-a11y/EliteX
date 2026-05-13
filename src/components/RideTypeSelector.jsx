// RideTypeSelector.jsx — Steps 2+3: vehicle selection with inline sharing toggle
import { useState } from 'react';
import { vehicleTypes, getDistance, calculateFare } from '../data/rideData';

export default function RideTypeSelector({ pickup, destination, onConfirm, onBack }) {
  const distance = getDistance(pickup.id, destination.id);

  // selectedVehicleId: which vehicle card is active
  const [selectedId, setSelectedId] = useState(null);

  // sharingMap: { vehicleId → sharingOptionId }
  // Default each vehicle to its first option
  const [sharingMap, setSharingMap] = useState(() =>
    vehicleTypes.reduce((acc, v) => ({ ...acc, [v.id]: v.sharingOptions[0].id }), {})
  );

  const selectedVehicle = vehicleTypes.find((v) => v.id === selectedId);
  const currentSharingId = selectedId ? sharingMap[selectedId] : null;
  const currentSharing = selectedVehicle?.sharingOptions.find((s) => s.id === currentSharingId);
  const fare = selectedVehicle && currentSharing
    ? calculateFare(selectedVehicle, currentSharing, distance)
    : null;

  const handleVehicleClick = (vehicle) => {
    setSelectedId(vehicle.id);
    // Reset to first sharing option each time user switches vehicle
    setSharingMap((prev) => ({ ...prev, [vehicle.id]: vehicle.sharingOptions[0].id }));
  };

  const handleSharingClick = (vehicleId, sharingId, e) => {
    e.stopPropagation(); // prevent triggering vehicle-card click
    setSharingMap((prev) => ({ ...prev, [vehicleId]: sharingId }));
  };

  const handleContinue = () => {
    onConfirm(selectedVehicle, currentSharing, fare, distance);
  };

  const eta = selectedVehicle
    ? selectedVehicle.baseEta + Math.round(distance / 5)
    : null;

  return (
    <div>
      {/* Route header */}
      <div className="route-header-bar">
        <div className="route-from-to">
          <span>{pickup.icon} {pickup.shortName}</span>
          <span className="route-arrow">→</span>
          <span>{destination.icon} {destination.shortName}</span>
        </div>
        <span className="route-dist">{distance.toFixed(1)} km</span>
      </div>

      {/* Vehicle cards */}
      <div className="vehicle-cards-list">
        {vehicleTypes.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;
          const activeSharingId = sharingMap[vehicle.id];
          const activeSharing = vehicle.sharingOptions.find((s) => s.id === activeSharingId);
          const displayFare = calculateFare(vehicle, activeSharing, distance);
          const displayEta = vehicle.baseEta + Math.round(distance / 5);

          return (
            <div
              key={vehicle.id}
              id={`vehicle-${vehicle.id}`}
              className={`vehicle-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleVehicleClick(vehicle)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleVehicleClick(vehicle)}
            >
              {/* Main info row */}
              <div className="vehicle-main-row">
                <div className="vehicle-big-icon">{vehicle.icon}</div>

                <div className="vehicle-info">
                  <h4>{vehicle.name}</h4>
                  <p>{vehicle.description}</p>
                </div>

                <div className="vehicle-right">
                  <span className="vehicle-fare">₹{displayFare}</span>
                  <span className="vehicle-eta">~{displayEta} min</span>
                </div>

                <div className="vehicle-select-indicator">✓</div>
              </div>

              {/* Sharing options — only visible when this card is selected */}
              {isSelected && vehicle.sharingOptions.length > 1 && (
                <div className="sharing-options-row">
                  {vehicle.sharingOptions.map((opt) => {
                    const optFare = calculateFare(vehicle, opt, distance);
                    const isActive = activeSharingId === opt.id;
                    const savePct = Math.round((1 - opt.multiplier) * 100);

                    return (
                      <button
                        key={opt.id}
                        id={`sharing-${vehicle.id}-${opt.id}`}
                        className={`sharing-btn ${isActive ? 'sharing-active' : ''}`}
                        onClick={(e) => handleSharingClick(vehicle.id, opt.id, e)}
                      >
                        <span className="sharing-btn-label">{opt.label}</span>
                        <span className="sharing-btn-fare">₹{optFare}</span>
                        {savePct > 0 && (
                          <span className="sharing-save-badge">Save {savePct}%</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flow-footer">
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button
          id="vehicle-continue-btn"
          className="btn btn-primary"
          disabled={!selectedVehicle}
          onClick={handleContinue}
        >
          Continue — {selectedVehicle ? `₹${fare}` : 'Select a ride'}
        </button>
      </div>
    </div>
  );
}
