// LocationPicker.jsx — Step 1: pickup & destination selection
// Uses campusLocations mock data, searchable dropdown, and a decorative map background.
import { useState, useRef, useEffect } from 'react';
import { campusLocations } from '../data/rideData';
import { useLanguage } from '../context/LanguageContext';
import '../styles/RideFlow.css';

// ── Reusable single location input with searchable dropdown ──────────────────
function LocationInput({ label, dotClass, value, onChange, excludeId }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = campusLocations.filter(
    (loc) =>
      loc.id !== excludeId &&
      loc.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (loc) => {
    onChange(loc);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Clickable row showing current value */}
      <div
        className="location-input-row"
        onClick={() => setOpen((p) => !p)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((p) => !p)}
      >
        <span className={`loc-dot ${dotClass}`} />
        <div className="loc-text">
          <span className="loc-tag">{label}</span>
          <span className="loc-value">
            {value ? value.name : <span className="loc-placeholder">Choose {label.toLowerCase()}…</span>}
          </span>
        </div>
        {value && (
          <button
            className="loc-clear"
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            aria-label="Clear location"
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="loc-dropdown">
          <input
            autoFocus
            type="text"
            className="loc-search-input"
            placeholder={`Search ${label.toLowerCase()}…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="loc-options">
            {filtered.length === 0 ? (
              <p className="loc-opt-empty">No locations found</p>
            ) : (
              filtered.map((loc) => (
                <button
                  key={loc.id}
                  className="loc-option"
                  onClick={() => handleSelect(loc)}
                >
                  <span className="loc-option-icon">{loc.icon}</span>
                  <div>
                    <span className="loc-opt-name">{loc.name}</span>
                    <span className="loc-opt-area">{loc.area}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main LocationPicker component ────────────────────────────────────────────
export default function LocationPicker({ pickup, destination, onPickupChange, onDestChange, onConfirm }) {
  const { t } = useLanguage();
  // Quick-select: tap a chip to fill pickup first, then destination
  const handleChipClick = (loc) => {
    if (!pickup) {
      onPickupChange(loc);
    } else if (!destination && loc.id !== pickup.id) {
      onDestChange(loc);
    }
  };

  const handleSwap = () => {
    const tmp = pickup;
    onPickupChange(destination);
    onDestChange(tmp);
  };

  const popularLocs = campusLocations.slice(0, 8);

  return (
    <div>
      {/* Mock map visual */}
      <div className="mock-map">
        <div className="map-grid" />
        {/* Animated SVG route line when both pins set */}
        {pickup && destination && (
          <svg className="map-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line
              x1="30" y1="35" x2="70" y2="70"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          </svg>
        )}
        {/* Pickup pin */}
        {pickup && (
          <div className="map-pin map-pin-from" title={pickup.name}>
            {pickup.icon}
          </div>
        )}
        {/* Destination pin */}
        {destination && (
          <div className="map-pin map-pin-to" title={destination.name}>
            {destination.icon}
          </div>
        )}
        <span className="map-label">📍 EliteX Zone · Bangalore</span>
      </div>

      {/* Location input card (sits below map, no top border) */}
      <div className="location-inputs-card" style={{ position: 'relative' }}>
        <LocationInput
          label={t('ride.pickup')}
          dotClass="loc-dot-from"
          value={pickup}
          onChange={onPickupChange}
          excludeId={destination?.id}
        />
        {/* Connector line & swap button */}
        <div className="loc-connector" />
        <button className="swap-btn" onClick={handleSwap} title="Swap locations" aria-label="Swap pickup and destination">
          ⇅
        </button>
        <LocationInput
          label={t('ride.dropoff')}
          dotClass="loc-dot-to"
          value={destination}
          onChange={onDestChange}
          excludeId={pickup?.id}
        />
      </div>

      {/* Popular quick-select chips */}
      <div className="quick-locations" style={{ marginTop: '20px' }}>
        <p className="quick-title">Popular Locations — tap to select</p>
        <div className="quick-chips">
          {popularLocs.map((loc) => (
            <button
              key={loc.id}
              className="quick-chip"
              onClick={() => handleChipClick(loc)}
              disabled={
                (pickup?.id === loc.id) || (destination?.id === loc.id)
              }
            >
              {loc.icon} {loc.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        id="find-rides-btn"
        className="btn btn-primary w-full"
        style={{ marginTop: '24px', padding: '15px' }}
        onClick={onConfirm}
        disabled={!pickup || !destination || pickup.id === destination.id}
      >
        🔍 {t('ride.findRide')} →
      </button>

      {pickup?.id === destination?.id && pickup && (
        <p style={{ textAlign: 'center', color: 'var(--secondary)', fontSize: '0.82rem', marginTop: '8px' }}>
          Pickup and destination cannot be the same.
        </p>
      )}
    </div>
  );
}
