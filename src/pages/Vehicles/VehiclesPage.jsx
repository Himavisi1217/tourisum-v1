import React, { useMemo, useState } from 'react';

const vehicles = [
  {
    title: 'Standard Car',
    details: 'Toyota Prius, Honda Fit or similar',
    dailyRate: 45,
    price: 'From $45/day',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Premium SUV',
    details: 'Toyota Fortuner or similar',
    dailyRate: 85,
    price: 'From $85/day',
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Passenger Van',
    details: 'Mercedes Sprinter or similar',
    dailyRate: 120,
    price: 'From $120/day',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'
  }
];

const VehiclesPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVehicleTitle, setSelectedVehicleTitle] = useState(vehicles[0].title);
  const [rentalDays, setRentalDays] = useState(1);
  const TAX_RATE = 0.12;

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.title === selectedVehicleTitle) || vehicles[0],
    [selectedVehicleTitle]
  );
  const subTotal = selectedVehicle.dailyRate * rentalDays;
  const taxAmount = subTotal * TAX_RATE;
  const totalCost = subTotal + taxAmount;

  const openRentalPopup = (vehicleTitle) => {
    setSelectedVehicleTitle(vehicleTitle);
    setShowPopup(true);
  };

  const handleRentalSubmit = (event) => {
    event.preventDefault();
    alert(`Vehicle booking submitted.\nVehicle: ${selectedVehicleTitle}\nTotal cost: $${totalCost.toFixed(2)}`);
    setShowPopup(false);
  };

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
              <button
                type="button"
                className="btn-primary"
                style={{ marginTop: '0.8rem' }}
                onClick={() => openRentalPopup(vehicle.title)}
              >
                Book vehicle
              </button>
            </div>
          </article>
        ))}
      </div>

      {showPopup ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 1200,
            padding: '1rem'
          }}
        >
          <div className="card" style={{ width: 'min(760px, 100%)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: 0 }}>Vehicle Rental Booking</h3>
              <button className="btn-secondary" type="button" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>

            <form onSubmit={handleRentalSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label htmlFor="rentalName">Full name</label>
                <input id="rentalName" type="text" required />
              </div>

              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                <div>
                  <label htmlFor="rentalDuration">Rental duration (days)</label>
                  <input
                    id="rentalDuration"
                    type="number"
                    min="1"
                    value={rentalDays}
                    onChange={(event) => setRentalDays(Number(event.target.value) || 1)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <input id="country" type="text" required />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                <div>
                  <label htmlFor="idDoc">ID documentation</label>
                  <input id="idDoc" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
                <div>
                  <label htmlFor="passportDoc">Passport copy</label>
                  <input id="passportDoc" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                </div>
              </div>

              <div>
                <label htmlFor="vehicleSelect">Vehicle selection</label>
                <select
                  id="vehicleSelect"
                  value={selectedVehicleTitle}
                  onChange={(event) => setSelectedVehicleTitle(event.target.value)}
                >
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.title} value={vehicle.title}>
                      {vehicle.title}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-very-light)',
                  borderRadius: '10px',
                  padding: '1rem',
                  border: '1px solid var(--color-input-border)'
                }}
              >
                <p style={{ marginBottom: '0.35rem' }}>Price per day: <strong>${selectedVehicle.dailyRate.toFixed(2)}</strong></p>
                <p style={{ marginBottom: '0.35rem' }}>Subtotal ({rentalDays} days): <strong>${subTotal.toFixed(2)}</strong></p>
                <p style={{ marginBottom: '0.35rem' }}>Tax ({(TAX_RATE * 100).toFixed(0)}%): <strong>${taxAmount.toFixed(2)}</strong></p>
                <p style={{ marginBottom: 0 }}>Total cost: <strong>${totalCost.toFixed(2)}</strong></p>
              </div>

              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                Confirm booking
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default VehiclesPage;
