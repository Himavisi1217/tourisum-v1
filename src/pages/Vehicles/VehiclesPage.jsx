import React from 'react';

const vehicles = [
  {
    title: 'Standard Car',
    details: 'Toyota Prius, Honda Fit or similar',
    price: 'From $45/day',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Premium SUV',
    details: 'Toyota Fortuner or similar',
    price: 'From $85/day',
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Passenger Van',
    details: 'Mercedes Sprinter or similar',
    price: 'From $120/day',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'
  }
];

const VehiclesPage = () => {
  return (
    <div className="container section">
      <h2>Vehicles</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Choose your preferred vehicle category.</p>
      <div className="grid-3">
        {vehicles.map((vehicle) => (
          <article key={vehicle.title} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={vehicle.imageUrl} alt={vehicle.title} style={{ width: '100%', height: '210px', objectFit: 'cover' }} />
            <div style={{ padding: '1.2rem' }}>
              <h3>{vehicle.title}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{vehicle.details}</p>
              <p style={{ fontWeight: 700, marginTop: '1rem' }}>{vehicle.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;
