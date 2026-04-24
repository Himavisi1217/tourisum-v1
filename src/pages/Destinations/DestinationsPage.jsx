import React from 'react';

const destinations = [
  {
    name: 'Kandy',
    description: 'Cultural heartland with temples and scenic hills.',
    imageUrl: 'https://images.unsplash.com/photo-1606293926075-69a8d89d74b8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Mirissa',
    description: 'Beach destination known for sunsets and whale watching.',
    imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Nuwara Eliya',
    description: 'Tea country with cool weather and waterfalls.',
    imageUrl: 'https://images.unsplash.com/photo-1581679862204-3e53e608f31c?auto=format&fit=crop&w=1200&q=80'
  }
];

const DestinationsPage = () => {
  return (
    <div className="container section">
      <h2>Destinations</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Plan your route across the island with our driver team.</p>
      <div className="grid-3">
        {destinations.map((destination) => (
          <article key={destination.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={destination.imageUrl} alt={destination.name} style={{ width: '100%', height: '210px', objectFit: 'cover' }} />
            <div style={{ padding: '1.2rem' }}>
              <h3>{destination.name}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{destination.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
