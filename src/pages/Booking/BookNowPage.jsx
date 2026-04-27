import React, { useState } from 'react';

const BookNowPage = () => {
  const [pickup, setPickup] = useState('Colombo City');
  const [customPickup, setCustomPickup] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Booking details submitted. We will confirm your trip soon.');
  };

  return (
    <div className="container section" style={{ maxWidth: 860 }}>
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
          <select id="bookNowPickup" value={pickup} onChange={(e) => setPickup(e.target.value)}>
            <option value="Colombo City">Colombo City</option>
            <option value="Bandaranaike International Airport">Bandaranaike International Airport</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
            <option value="Ella">Ella</option>
            <option value="custom">Custom location</option>
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

        <div>
          <label htmlFor="bookNowNotes">Additional notes</label>
          <textarea id="bookNowNotes" rows={3} placeholder="Trip preferences, destination list, hotel plans..." />
        </div>

        <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
          Submit booking
        </button>
      </form>
    </div>
  );
};

export default BookNowPage;
