import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MapPicker from '../../components/Maps/MapPicker';

const BookNowPage = () => {
  const [pickup, setPickup] = useState('Colombo City');
  const [customPickup, setCustomPickup] = useState('');
  const [mapLocation, setMapLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { userData } = useAuth();

  const handleLocationSelect = (location) => {
    setMapLocation(location);
    setPickup('map');
    setCustomPickup(`Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(6)}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    let pickupValue = pickup;
    if (pickup === 'custom') {
      pickupValue = customPickup;
    } else if (pickup === 'map' && mapLocation) {
      pickupValue = `Map Pin: ${mapLocation.lat.toFixed(6)}, ${mapLocation.lng.toFixed(6)}`;
    }

    const formData = new FormData();
    formData.append('Name', event.target.bookNowName.value);
    formData.append('Email', userData?.email || 'N/A');
    formData.append('StartDate', event.target.bookNowFrom.value);
    formData.append('EndDate', event.target.bookNowTo.value);
    formData.append('PickupLocation', pickupValue);
    if (mapLocation) {
      formData.append('PickupLat', mapLocation.lat);
      formData.append('PickupLng', mapLocation.lng);
    }
    formData.append('Notes', event.target.bookNowNotes.value);
    formData.append('Timestamp', new Date().toISOString());

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
      } else {
        console.warn('VITE_GOOGLE_SCRIPT_URL is not set in .env');
      }
      setShowPopup(true);
      event.target.reset();
      setPickup('Colombo City');
      setCustomPickup('');
      setMapLocation(null);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit your booking. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 860, position: 'relative' }}>
      {showPopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'grid', placeItems: 'center', zIndex: 2000, padding: '1rem' }}>
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem', fontSize: '1.5rem' }}>Booking Request Sent! 🎉</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-muted)' }}>
              We have successfully received your booking details. Our team will review your request and get back to you shortly to confirm your trip!
            </p>
            <button onClick={() => setShowPopup(false)} className="btn-primary" style={{ width: '100%' }}>Great, thanks!</button>
          </div>
        </div>
      )}

      <h2>Book Now</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Choose a route and dates, then send us your booking details.
      </p>

      <form className="card" style={{ display: 'grid', gap: '1rem' }} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bookNowName">Full name</label>
          <input id="bookNowName" type="text" required />
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label htmlFor="bookNowFrom">Start date</label>
            <input id="bookNowFrom" type="date" required />
          </div>
          <div>
            <label htmlFor="bookNowTo">End date</label>
            <input id="bookNowTo" type="date" required />
          </div>
        </div>

        <div>
          <label htmlFor="bookNowPickup">Pickup location</label>
          <select id="bookNowPickup" value={pickup} onChange={(e) => { setPickup(e.target.value); setMapLocation(null); }}>
            <option value="Colombo City">Colombo City</option>
            <option value="Bandaranaike International Airport">Bandaranaike International Airport</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
            <option value="Ella">Ella</option>
            <option value="custom">Type a custom location</option>
            <option value="map">📍 Pick on map</option>
          </select>
        </div>

        {pickup === 'custom' ? (
          <div>
            <label htmlFor="bookNowCustomPickup">Custom pickup location</label>
            <input
              id="bookNowCustomPickup"
              type="text"
              required
              value={customPickup}
              onChange={(e) => setCustomPickup(e.target.value)}
            />
          </div>
        ) : null}

        {pickup === 'map' && (
          <div>
            <label>Click on the map to select your pickup point</label>
            <MapPicker
              onLocationSelect={handleLocationSelect}
              selectedLocation={mapLocation}
              zoom={8}
              height="350px"
            />
            {mapLocation && (
              <p style={{ color: 'var(--color-success)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                📍 Selected: {mapLocation.lat.toFixed(6)}, {mapLocation.lng.toFixed(6)}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="bookNowNotes">Additional notes</label>
          <textarea id="bookNowNotes" rows={3} placeholder="Trip preferences, destination list, hotel plans..." />
        </div>

        <button type="submit" className="btn-primary" style={{ width: 'fit-content' }} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit booking'}
        </button>
      </form>
    </div>
  );
};

export default BookNowPage;
