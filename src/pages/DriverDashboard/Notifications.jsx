import React, { useMemo } from 'react';
import { useAppData } from '../../context/AppDataContext';

const Notifications = () => {
  const { driverTrips } = useAppData();

  const notifications = useMemo(() => {
    const items = [];
    driverTrips.forEach((trip) => {
      items.push({
        id: `${trip.id}-trip`,
        title: `Trip scheduled for ${trip.passengerName || 'Passenger'}`,
        detail: `${trip.date} at ${trip.pickupTime}`,
        type: 'trip'
      });
      (trip.stops || []).forEach((stop, index) => {
        items.push({
          id: `${trip.id}-stop-${index}`,
          title: stop.completed ? `Completed: ${stop.name}` : `Upcoming stop: ${stop.name}`,
          detail: `${trip.date} at ${trip.pickupTime}`,
          type: stop.completed ? 'done' : 'pending'
        });
      });
    });
    return items.slice(0, 20);
  }, [driverTrips]);

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Notifications</h2>
      {notifications.length === 0 ? (
        <div className="card">No notifications available right now.</div>
      ) : (
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {notifications.map((item) => (
            <article key={item.id} className="card">
              <h4 style={{ marginBottom: '0.35rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--color-muted)', margin: 0 }}>{item.detail}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
