import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for trips
  const trips = [
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1).toISOString().split('T')[0], title: 'Airport Transfer', type: 'pickup', time: '14:30' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3).toISOString().split('T')[0], title: 'Sigiriya Day Tour', type: 'tour', time: '07:00' },
    { date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5).toISOString().split('T')[0], title: 'Galle Drop-off', type: 'dropoff', time: '10:00' },
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendarDays = () => {
    let days = [];
    
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toISOString().split('T')[0];
      const todayString = new Date().toISOString().split('T')[0];
      const isToday = dateString === todayString;
      
      const dayTrips = trips.filter(trip => trip.date === dateString);

      days.push(
        <div key={i} className={`calendar-day ${isToday ? 'today' : ''} ${dayTrips.length > 0 ? 'has-trip' : ''}`}>
          <div className="day-number">{i}</div>
          <div className="day-events">
            {dayTrips.map((trip, idx) => (
              <div key={idx} className="event-badge" title={`${trip.time} - ${trip.title}`}>
                {trip.time}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="schedule-calendar-container"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-darkest)' }}>Schedule Calendar</h2>
        <div className="calendar-controls">
          <button onClick={prevMonth} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>&larr; Prev</button>
          <span style={{ margin: '0 1.5rem', fontWeight: '600', fontSize: '1.2rem' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={nextMonth} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Next &rarr;</button>
        </div>
      </div>

      <div className="card calendar-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="calendar-header-row">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-header-day">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {renderCalendarDays()}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Upcoming This Month</h3>
        <div className="upcoming-list" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {trips.map((trip, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: '600', color: 'var(--color-darkest)' }}>{trip.date}</span> at <span style={{ color: 'var(--color-medium)' }}>{trip.time}</span>
                <h4 style={{ margin: '0.5rem 0 0 0' }}>{trip.title}</h4>
              </div>
              <button className="btn-secondary">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleCalendar;
