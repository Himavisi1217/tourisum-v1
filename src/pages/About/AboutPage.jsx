import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container section" style={{ maxWidth: 920 }}>
      <h2>About Us</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
        Sri Lanka Travels helps local and international guests explore the island safely with curated journeys,
        trusted drivers, and flexible vehicle options.
      </p>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
        We focus on comfortable travel, transparent pricing, and personalized routes covering heritage cities,
        beaches, hill country, and wildlife experiences.
      </p>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Whether you need a full holiday plan, airport transfer, or private rental with driver support, our team
        is ready to assist throughout your trip.
      </p>

      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <Link to="/book-now" className="btn-primary">
          Book your journey
        </Link>
        <Link to="/contact" className="btn-secondary">
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
