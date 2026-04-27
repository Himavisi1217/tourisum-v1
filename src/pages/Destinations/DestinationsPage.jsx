import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

const initialDestination = {
  id: '',
  name: '',
  shortDescription: '',
  imageUrl: '',
  popularity: '',
  details: ''
};

const DestinationsPage = () => {
  const { destinations, addDestination, updateDestination, deleteDestination } = useAppData();
  const { userData } = useAuth();
  const isSuperAdmin = userData?.role === 'super_admin';
  const [destinationForm, setDestinationForm] = useState(initialDestination);
  const [selectedDestinationId, setSelectedDestinationId] = useState('');
  const [feedback, setFeedback] = useState('');

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.id === selectedDestinationId),
    [destinations, selectedDestinationId]
  );

  const handleLoad = () => {
    if (!selectedDestination) {
      return;
    }
    setDestinationForm({
      id: selectedDestination.id || '',
      name: selectedDestination.name || '',
      shortDescription: selectedDestination.shortDescription || '',
      imageUrl: selectedDestination.imageUrl || '',
      popularity: selectedDestination.popularity || '',
      details: selectedDestination.details || ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const destinationId = destinationForm.id.trim().toLowerCase().replace(/\s+/g, '-');
    const payload = {
      ...destinationForm,
      id: destinationId
    };

    if (selectedDestinationId) {
      await updateDestination(selectedDestinationId, payload);
      setFeedback('Destination updated.');
    } else {
      await addDestination(payload);
      setFeedback('Destination added.');
    }
    setDestinationForm(initialDestination);
    setSelectedDestinationId('');
  };

  const handleDelete = async () => {
    if (!selectedDestinationId) {
      return;
    }
    await deleteDestination(selectedDestinationId);
    setFeedback('Destination deleted.');
    setDestinationForm(initialDestination);
    setSelectedDestinationId('');
  };

  return (
    <div className="container section">
      <h2>Destinations</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Explore Sri Lankan attractions and click any destination to read more.
      </p>
      <div className="grid-3">
        {destinations.map((destination) => (
          <article key={destination.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={destination.imageUrl} alt={destination.name} style={{ width: '100%', height: '210px', objectFit: 'cover' }} />
            <div style={{ padding: '1.2rem' }}>
              <h3>{destination.name}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{destination.shortDescription}</p>
              <p style={{ color: 'var(--color-medium)', fontSize: '0.9rem', marginTop: '0.7rem' }}>
                Popular for: {destination.popularity}
              </p>
              <Link to={`/destinations/${destination.id}`} className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                Read about this place
              </Link>
            </div>
          </article>
        ))}
      </div>

      {isSuperAdmin ? (
        <section className="card" style={{ marginTop: '2rem' }}>
          <h3>Manage Destinations (Super Admin)</h3>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
            Add new destinations or edit/delete existing destinations from this page.
          </p>
          {feedback ? <p style={{ color: '#166534', marginBottom: '1rem' }}>{feedback}</p> : null}

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <select value={selectedDestinationId} onChange={(event) => setSelectedDestinationId(event.target.value)}>
              <option value="">Select destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>
            <button type="button" className="btn-secondary" onClick={handleLoad}>
              Load
            </button>
            {selectedDestinationId ? (
              <button type="button" className="btn-secondary" onClick={handleDelete}>
                Delete
              </button>
            ) : null}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Destination ID (slug)</label>
              <input
                value={destinationForm.id}
                onChange={(event) =>
                  setDestinationForm((previous) => ({ ...previous, id: event.target.value }))
                }
                placeholder="example: yala-national-park"
                required
                disabled={Boolean(selectedDestinationId)}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Name</label>
              <input
                value={destinationForm.name}
                onChange={(event) =>
                  setDestinationForm((previous) => ({ ...previous, name: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Short Description</label>
              <input
                value={destinationForm.shortDescription}
                onChange={(event) =>
                  setDestinationForm((previous) => ({ ...previous, shortDescription: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Image URL</label>
              <input
                type="url"
                value={destinationForm.imageUrl}
                onChange={(event) =>
                  setDestinationForm((previous) => ({ ...previous, imageUrl: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Popularity</label>
              <input
                value={destinationForm.popularity}
                onChange={(event) =>
                  setDestinationForm((previous) => ({ ...previous, popularity: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Details</label>
              <textarea
                rows={4}
                value={destinationForm.details}
                onChange={(event) =>
                  setDestinationForm((previous) => ({ ...previous, details: event.target.value }))
                }
                required
              />
            </div>
            <button className="btn-primary">{selectedDestinationId ? 'Update' : 'Add'} Destination</button>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default DestinationsPage;
