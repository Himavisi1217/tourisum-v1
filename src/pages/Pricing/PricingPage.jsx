import React from 'react';

const plans = [
  { name: 'City Ride', price: '$45/day', points: ['8 hours included', 'Fuel included', 'Driver included'] },
  { name: 'Day Tour', price: '$85/day', points: ['12 hours included', 'Flexible route', 'Photo stop support'] },
  { name: 'Multi-Day', price: 'Custom', points: ['Dedicated driver', 'Route planning', 'Hotel pickup/drop'] }
];

const PricingPage = () => {
  return (
    <div className="container section">
      <h2>Pricing</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Transparent packages with no hidden fees.</p>
      <div className="grid-3">
        {plans.map((plan) => (
          <article key={plan.name} className="card">
            <h3>{plan.name}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{plan.price}</p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.1rem' }}>
              {plan.points.map((point) => (
                <li key={point} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
