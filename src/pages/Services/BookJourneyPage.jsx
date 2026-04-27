import React, { useMemo, useState } from 'react';
import './Services.css';

const pickupOptions = ['Bandaranaike International Airport', 'Colombo City', 'Kandy', 'Galle', 'Ella'];

const BookJourneyPage = () => {
  const [pickup, setPickup] = useState(pickupOptions[0]);
  const [customPickup, setCustomPickup] = useState('');
  const [withDriver, setWithDriver] = useState(true);

  const pickupValue = useMemo(
    () => (pickup === 'custom' ? customPickup.trim() : pickup),
    [pickup, customPickup]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Journey request submitted.\nPickup: ${pickupValue || 'Not provided'}\nMode: ${
        withDriver ? 'Vehicle with driver' : 'Only vehicle'
      }`
    );
  };

  return (
    <div className="container section services-page">
      <h2>Book a Journey</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Fill this form to request your trip plan with required travel documents.
      </p>

      <form className="card services-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="journeyName">Full name</label>
          <input id="journeyName" type="text" required placeholder="Your full name" />
        </div>

        <div className="grid">
          <div>
            <label htmlFor="startDate">Start date</label>
            <input id="startDate" type="date" required />
          </div>
          <div>
            <label htmlFor="endDate">End date</label>
            <input id="endDate" type="date" required />
          </div>
        </div>

        <div>
          <label htmlFor="travelFeeling">What are you feeling for this travel?</label>
          <textarea
            id="travelFeeling"
            rows={3}
            placeholder="Adventure, relaxing beach trip, cultural tour, wildlife safari..."
            required
          />
        </div>

        <div className="grid">
          <div>
            <label htmlFor="pickupLocation">Pickup location</label>
            <select id="pickupLocation" value={pickup} onChange={(e) => setPickup(e.target.value)}>
              {pickupOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="custom">Custom location</option>
            </select>
          </div>
          {pickup === 'custom' ? (
            <div>
              <label htmlFor="customPickup">Custom pickup location</label>
              <input
                id="customPickup"
                type="text"
                required
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder="Type your location"
              />
            </div>
          ) : null}
        </div>

        <div className="checkbox-row">
          <input
            id="withDriver"
            type="checkbox"
            checked={withDriver}
            onChange={(e) => setWithDriver(e.target.checked)}
          />
          <label htmlFor="withDriver" style={{ margin: 0 }}>
            Rent vehicle with driver
          </label>
        </div>
        <p className="services-note">
          If unchecked, this request is processed as journey booking with only vehicle.
        </p>

        <div className="grid">
          <div>
            <label htmlFor="idDocument">ID documentation</label>
            <input id="idDocument" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
          </div>
          <div>
            <label htmlFor="passportCopy">Passport copy</label>
            <input id="passportCopy" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
          Submit journey request
        </button>
      </form>
    </div>
  );
};

export default BookJourneyPage;
