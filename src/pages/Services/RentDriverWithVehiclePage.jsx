import React from 'react';
import './Services.css';

const RentDriverWithVehiclePage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Rental request submitted. Our team will contact you shortly.');
  };

  return (
    <div className="container section services-page">
      <h2>Rent Driver with Vehicle</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Request a private driver and selected vehicle for your full rental duration.
      </p>

      <form className="card services-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="driverRentalName">Full name</label>
          <input id="driverRentalName" type="text" required />
        </div>

        <div className="grid">
          <div>
            <label htmlFor="rentalFrom">Rental start date</label>
            <input id="rentalFrom" type="date" required />
          </div>
          <div>
            <label htmlFor="rentalTo">Rental end date</label>
            <input id="rentalTo" type="date" required />
          </div>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input id="country" type="text" required />
        </div>

        <div className="grid">
          <div>
            <label htmlFor="driverRentalId">ID documentation</label>
            <input id="driverRentalId" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
          </div>
          <div>
            <label htmlFor="driverRentalPassport">Passport copy</label>
            <input id="driverRentalPassport" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ justifySelf: 'start' }}>
          Submit rental request
        </button>
      </form>
    </div>
  );
};

export default RentDriverWithVehiclePage;
