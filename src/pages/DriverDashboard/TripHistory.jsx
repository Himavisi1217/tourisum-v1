import React from 'react';
import { useAppData } from '../../context/AppDataContext';

const TripHistory = () => {
  const { driverTrips } = useAppData();
  const historyTrips = driverTrips.filter((trip) => trip.status === 'completed');

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Trip History</h2>
      {historyTrips.length === 0 ? (
        <div className="card">No completed trips yet.</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {historyTrips.map((trip) => (
            <article key={trip.id} className="card">
              <h3>{trip.passengerName}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{trip.date}</p>
              <p style={{ marginTop: '0.75rem' }}>Completed route: {trip.stops.map((stop) => stop.name).join(' -> ')}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripHistory;
