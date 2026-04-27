import React from 'react';
import { useAppData } from '../../context/AppDataContext';

const labelByType = {
  banner: 'Banner',
  popup: 'Popup Message',
  notice: 'Notice'
};

const AnnouncementsPage = () => {
  const { announcements } = useAppData();

  return (
    <div className="container section">
      <h2>Announcements</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Latest updates from Serendib Travels.
      </p>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {announcements.map((announcement) => (
          <article key={announcement.id} className="card">
            <p
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-very-light)',
                color: 'var(--color-dark)',
                borderRadius: '999px',
                padding: '0.2rem 0.7rem',
                fontSize: '0.8rem',
                marginBottom: '0.7rem'
              }}
            >
              {labelByType[announcement.type] || 'Announcement'}
            </p>
            {announcement.imageUrl ? (
              <img
                src={announcement.imageUrl}
                alt={announcement.title}
                style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '10px' }}
              />
            ) : null}
            <h3 style={{ marginTop: announcement.imageUrl ? '1rem' : 0 }}>{announcement.title}</h3>
            <p>{announcement.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
