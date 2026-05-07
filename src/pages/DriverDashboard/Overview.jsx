import React from 'react';
import { motion } from 'framer-motion';
import { useAppData } from '../../context/AppDataContext';

const Overview = () => {
  const { driverTrips, markStopAsCompleted } = useAppData();
  const currentTrip = driverTrips.find((trip) => trip.status !== 'completed');
  const completedStops = currentTrip ? currentTrip.stops.filter((stop) => stop.completed) : [];
  const nextStop = currentTrip ? currentTrip.stops.find((stop) => !stop.completed) : null;
  const completedTripCount = driverTrips.filter((trip) => trip.status === 'completed').length;
  const upcomingTripCount = driverTrips.filter((trip) => trip.status !== 'completed').length;

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
      <motion.div variants={cardVariants} className="overview-topbar">
        <div>
          <p className="overview-kicker">Dashboard</p>
          <h2>Driver Overview</h2>
        </div>
        <p className="overview-date">{new Date().toLocaleDateString()}</p>
      </motion.div>

      <div className="dashboard-grid">
        <motion.div variants={cardVariants} className="card current-trip-card">
          <div className="card-header-row">
            <h3>Current Trip</h3>
            <span className="status-pill">
              {currentTrip ? 'In Progress' : 'No Active Trip'}
            </span>
          </div>

          <div className="trip-details">
            <div className="detail-row">
              <span className="label">Passenger:</span>
              <span className="value">{currentTrip?.passengerName || 'Not assigned'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Next Destination:</span>
              <span className="value value-highlight">
                {nextStop ? `${nextStop.name} (ETA: ${currentTrip.pickupTime})` : 'Route completed'}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Completed Destinations:</span>
              <span className="value value-completed">
                {completedStops.length ? completedStops.map((stop) => stop.name).join(', ') : 'None yet'}
              </span>
            </div>
          </div>

          {currentTrip && nextStop ? (
            <button
              className="btn-primary mark-complete-btn"
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

        <motion.div variants={cardVariants} className="card stat-card">
          <h4>Completed Trips</h4>
          <p className="stat-value">{completedTripCount}</p>
          <p className="stat-caption">This month</p>
        </motion.div>

        <motion.div variants={cardVariants} className="card stat-card stat-card-dark">
          <h4>Upcoming Pickups</h4>
          <p className="stat-value">{upcomingTripCount}</p>
          <p className="stat-caption">Next 48 hours</p>
        </motion.div>
      </div>

      <motion.h3 variants={cardVariants} className="schedule-title">
        Today's Schedule
      </motion.h3>

      <motion.div variants={cardVariants} className="schedule-list">
        {(currentTrip?.stops || []).map((stop) => (
          <div
            key={stop.name}
            className={`card schedule-item ${stop.completed ? 'completed' : ''}`}
          >
            <div className="schedule-time-box">
              <div className="schedule-time">{currentTrip.pickupTime}</div>
              <div className="schedule-status">
                {stop.completed ? 'Completed' : 'Next'}
              </div>
            </div>
            <div className="schedule-item-content">
              <h4>{stop.name}</h4>
              <p>
                Passenger: {currentTrip.passengerName}
              </p>
            </div>
          </div>
        ))}
        {!currentTrip && (
          <div className="card schedule-empty">No active trip for today.</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Overview;
