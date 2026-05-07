import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

const Overview = () => {
  const { driverTrips, markStopAsCompleted } = useAppData();
  const currentTrip = driverTrips.find((trip) => trip.status !== 'completed');
  const completedStops = currentTrip ? currentTrip.stops.filter((stop) => stop.completed) : [];
  const nextStop = currentTrip ? currentTrip.stops.find((stop) => !stop.completed) : null;
  const completedTripCount = driverTrips.filter((trip) => trip.status === 'completed').length;
  const upcomingTripCount = driverTrips.filter((trip) => trip.status !== 'completed').length;
  const currentMonth = new Date().toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  });
  const currentPassenger = currentTrip?.passengerName || 'Driver User';

  const kpiCards = [
    { label: 'Total Trips', value: driverTrips.length },
    { label: 'Current Trip', value: currentTrip ? 1 : 0 },
    { label: 'Completed Trips', value: completedTripCount },
    { label: 'Remaining Stops', value: nextStop ? currentTrip.stops.filter((stop) => !stop.completed).length : 0 },
    { label: 'Upcoming Pickups', value: upcomingTripCount }
  ];

  const featuredRoutes = (driverTrips || []).slice(0, 5).map((trip, index) => ({
    id: trip.id,
    name: trip.stops[trip.stops.length - 1]?.name || `Destination ${index + 1}`,
    route: trip.stops.map((stop) => stop.name).join(' -> ')
  }));

  const monthlyActivityBars = [42, 58, 49, 63, 75, 67, 81, 72];

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
        <div className="overview-heading">
          <p className="overview-kicker">Dashboard</p>
          <h2>Driver Overview</h2>
        </div>
        <div className="overview-actions">
          <div className="dashboard-search">
            <Search size={14} />
            <input type="text" placeholder="Search" />
          </div>
          <button className="dashboard-icon-btn" type="button" aria-label="Notifications">
            <Bell size={14} />
          </button>
          <div className="dashboard-user-chip">
            <div className="avatar-dot">D</div>
            <div>
              <strong>{currentPassenger}</strong>
              <p>{currentMonth}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={cardVariants} className="kpi-strip">
        {kpiCards.map((kpi) => (
          <article key={kpi.label} className="kpi-card">
            <p>{kpi.label}</p>
            <h3>{kpi.value}</h3>
          </article>
        ))}
      </motion.div>

      <motion.div variants={cardVariants} className="featured-routes">
        <div className="section-heading-row">
          <h3>Trending Routes</h3>
          <span>See all</span>
        </div>
        <div className="featured-routes-grid">
          {featuredRoutes.map((route) => (
            <article key={route.id} className="featured-route-card">
              <div className="featured-route-banner" />
              <h4>{route.name}</h4>
              <p>{route.route}</p>
            </article>
          ))}
        </div>
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

      <motion.div variants={cardVariants} className="dashboard-bottom-grid">
        <section className="card analytics-card">
          <div className="section-heading-row">
            <h3>Monthly Activity</h3>
            <span>Trips completed</span>
          </div>
          <div className="activity-bars">
            {monthlyActivityBars.map((bar, index) => (
              <div key={index} className="activity-bar-wrap">
                <div className="activity-bar" style={{ height: `${bar}%` }} />
              </div>
            ))}
          </div>
        </section>

        <section className="card visitors-card">
          <div className="section-heading-row">
            <h3>Upcoming Visitors</h3>
            <span>Today</span>
          </div>
          <div className="visitors-list">
            {(driverTrips || []).slice(0, 4).map((trip) => (
              <article key={trip.id} className="visitor-item">
                <div className="avatar-dot visitor-avatar">{trip.passengerName?.charAt(0) || 'P'}</div>
                <div>
                  <h4>{trip.passengerName}</h4>
                  <p>{trip.pickupTime}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </motion.div>

      <motion.h3 variants={cardVariants} className="schedule-title">Today's Schedule</motion.h3>
      <motion.div variants={cardVariants} className="schedule-list">
        {(currentTrip?.stops || []).map((stop) => {
          const stopIndex = currentTrip.stops.findIndex((item) => item.name === stop.name);
          return (
            <div key={stop.name} className={`card schedule-item ${stop.completed ? 'completed' : ''}`}>
              <div className="schedule-time-box">
                <div className="schedule-time">{currentTrip.pickupTime}</div>
                <div className="schedule-status">
                  {stop.completed ? 'Completed' : 'Next'}
                </div>
              </div>
              <div className="schedule-item-content">
                <h4>{stop.name}</h4>
                <p>Passenger: {currentTrip.passengerName}</p>
              </div>
              {!stop.completed && (
                <button
                  className="btn-secondary schedule-complete-btn"
                  onClick={() => markStopAsCompleted(currentTrip.id, stopIndex)}
                >
                  Mark done
                </button>
              )}
            </div>
          );
        })}
        {!currentTrip && (
          <div className="card schedule-empty">No active trip for today.</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Overview;
