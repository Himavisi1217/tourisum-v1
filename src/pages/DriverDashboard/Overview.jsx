import React from 'react';
import { motion } from 'framer-motion';
import { useAppData } from '../../context/AppDataContext';

const Overview = () => {
  const { driverTrips, markStopAsCompleted } = useAppData();
  const currentTrip = driverTrips.find((trip) => trip.status !== 'completed');
  const completedStops = currentTrip ? currentTrip.stops.filter((stop) => stop.completed) : [];
  const nextStop = currentTrip ? currentTrip.stops.find((stop) => !stop.completed) : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <motion.div 
      className="dashboard-overview"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={cardVariants} style={{ marginBottom: '2rem', color: 'var(--color-darkest)' }}>
        Dashboard Overview
      </motion.h2>
      
      <div className="dashboard-grid">
        {/* Current Trip Card */}
        <motion.div variants={cardVariants} className="card current-trip-card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-very-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Current Trip</h3>
            <span className="badge" style={{ backgroundColor: 'var(--color-very-light)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>
              {currentTrip ? 'In Progress' : 'No Active Trip'}
            </span>
          </div>
          
          <div className="trip-details" style={{ flex: 1 }}>
            <div className="detail-row">
              <span className="label">Passenger:</span>
              <span className="value">{currentTrip?.passengerName || 'Not assigned'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Next Destination:</span>
              <span className="value" style={{ color: 'var(--color-dark)' }}>
                {nextStop ? `${nextStop.name} (ETA: ${currentTrip.pickupTime})` : 'Route completed'}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Completed Destinations:</span>
              <span className="value" style={{ color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                {completedStops.length ? completedStops.map((stop) => stop.name).join(', ') : 'None yet'}
              </span>
            </div>
          </div>
          {currentTrip && nextStop ? (
            <button
              className="btn-primary"
              style={{ marginTop: '1.5rem', width: '100%' }}
              onClick={() => {
                const stopIndex = currentTrip.stops.findIndex((stop) => !stop.completed);
                if (stopIndex >= 0) {
                  markStopAsCompleted(currentTrip.id, stopIndex);
                }
              }}
            >
              Mark "{nextStop.name}" as Completed
            </button>
          ) : null}
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={cardVariants} className="card stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-medium)', fontWeight: '500', marginBottom: '0.5rem' }}>Completed Trips</h4>
          <p className="stat-value" style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--color-darkest)', lineHeight: '1' }}>
            {driverTrips.filter((trip) => trip.status === 'completed').length}
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>This Month</p>
        </motion.div>
        
        <motion.div variants={cardVariants} className="card stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'var(--color-darkest)', color: 'var(--color-cream)' }}>
          <h4 style={{ color: 'var(--color-light)', fontWeight: '500', marginBottom: '0.5rem' }}>Upcoming Pickups</h4>
          <p className="stat-value" style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--color-cream)', lineHeight: '1' }}>
            {driverTrips.filter((trip) => trip.status !== 'completed').length}
          </p>
          <p style={{ color: 'var(--color-light-medium)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Next 48 Hours</p>
        </motion.div>
      </div>

      <motion.h3 variants={cardVariants} style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--color-darkest)' }}>
        Today's Schedule
      </motion.h3>

      <motion.div variants={cardVariants} className="schedule-list">
        {(currentTrip?.stops || []).map((stop) => (
          <div key={stop.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderLeft: `4px solid ${stop.completed ? 'var(--color-light-medium)' : 'var(--color-medium)'}` }}>
            <div style={{ padding: '1rem', backgroundColor: stop.completed ? 'var(--color-cream)' : 'var(--color-very-light)', borderRadius: 'var(--border-radius-md)', textAlign: 'center', minWidth: '80px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{currentTrip.pickupTime}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-medium)' }}>
                {stop.completed ? 'Completed' : 'Next'}
              </div>
            </div>
            <div style={{ flex: 1, opacity: stop.completed ? 0.7 : 1 }}>
              <h4 style={{ marginBottom: '0.25rem', textDecoration: stop.completed ? 'line-through' : 'none' }}>{stop.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                Passenger: {currentTrip.passengerName}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Overview;
