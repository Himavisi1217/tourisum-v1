import React from 'react';
import { useAppData } from '../../context/AppDataContext';

const UpcomingTrips = () => {
  const { driverTrips } = useAppData();
  const upcomingTrips = driverTrips.filter((trip) => trip.status !== 'completed');

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Upcoming Trips</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {upcomingTrips.map((trip) => (
          <article key={trip.id} className="card">
            <h3>{trip.passengerName}</h3>
            <p style={{ color: 'var(--color-muted)' }}>
              {trip.date} at {trip.pickupTime}
            </p>
            <p style={{ marginTop: '0.75rem' }}>Route: {trip.stops.map((stop) => stop.name).join(' -> ')}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;
