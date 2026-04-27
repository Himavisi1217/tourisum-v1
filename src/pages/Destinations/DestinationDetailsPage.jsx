import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';

const DestinationDetailsPage = () => {
  const { id } = useParams();
  const { destinations } = useAppData();
  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    return (
      <div className="container section">
        <h2>Destination not found</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
          The selected destination could not be found.
        </p>
        <Link className="btn-secondary" to="/destinations">
          Back to destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: 920 }}>
      <img
        src={destination.imageUrl}
        alt={destination.name}
        style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
      />
      <h2>{destination.name}</h2>
      <p style={{ color: 'var(--color-dark)', fontWeight: 600, marginBottom: '0.75rem' }}>
        Popular for: {destination.popularity}
      </p>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{destination.details}</p>

      <Link className="btn-primary" to="/book-now">
        Book now for this place
      </Link>
    </div>
  );
};

export default DestinationDetailsPage;
