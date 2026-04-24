import React from 'react';
import { motion } from 'framer-motion';

const Overview = () => {
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
            <span className="badge" style={{ backgroundColor: 'var(--color-very-light)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '500' }}>In Progress</span>
          </div>
          
          <div className="trip-details" style={{ flex: 1 }}>
            <div className="detail-row">
              <span className="label">Passenger:</span>
              <span className="value">John Doe</span>
            </div>
            <div className="detail-row">
              <span className="label">Next Destination:</span>
              <span className="value" style={{ color: 'var(--color-dark)' }}>Sigiriya Rock Fortress (ETA: 14:30)</span>
            </div>
            <div className="detail-row">
              <span className="label">Completed Destination:</span>
              <span className="value" style={{ color: 'var(--color-muted)', textDecoration: 'line-through' }}>Dambulla Cave Temple</span>
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>Navigate to Next Stop</button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={cardVariants} className="card stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-medium)', fontWeight: '500', marginBottom: '0.5rem' }}>Completed Trips</h4>
          <p className="stat-value" style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--color-darkest)', lineHeight: '1' }}>24</p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>This Month</p>
        </motion.div>
        
        <motion.div variants={cardVariants} className="card stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'var(--color-darkest)', color: 'var(--color-cream)' }}>
          <h4 style={{ color: 'var(--color-light)', fontWeight: '500', marginBottom: '0.5rem' }}>Upcoming Pickups</h4>
          <p className="stat-value" style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--color-cream)', lineHeight: '1' }}>2</p>
          <p style={{ color: 'var(--color-light-medium)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Next 48 Hours</p>
        </motion.div>
      </div>

      <motion.h3 variants={cardVariants} style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--color-darkest)' }}>
        Today's Schedule
      </motion.h3>

      <motion.div variants={cardVariants} className="schedule-list">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderLeft: '4px solid var(--color-medium)' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-very-light)', borderRadius: 'var(--border-radius-md)', textAlign: 'center', minWidth: '80px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>14:30</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-medium)' }}>Pickup</div>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: '0.25rem' }}>Sigiriya Rock Fortress</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>Passenger: John Doe (2 pax)</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderLeft: '4px solid var(--color-light-medium)' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-cream)', borderRadius: 'var(--border-radius-md)', textAlign: 'center', minWidth: '80px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-muted)' }}>18:00</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Drop-off</div>
          </div>
          <div style={{ flex: 1, opacity: 0.7 }}>
            <h4 style={{ marginBottom: '0.25rem' }}>Kandy City Hotel</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>End of day trip</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
