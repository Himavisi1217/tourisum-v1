import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';

const Settings = () => {
  const { userData } = useAuth();
  const { updateCurrentUserProfile } = useAppData();
  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    vehicleType: ''
  });
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: userData?.name || '',
      mobileNumber: userData?.mobileNumber || '',
      vehicleType: userData?.vehicleType || ''
    });
  }, [userData]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError('');
      await updateCurrentUserProfile({
        name: form.name.trim(),
        mobileNumber: form.mobileNumber.trim(),
        vehicleType: form.vehicleType.trim()
      });
      setFeedback('Driver settings saved successfully.');
    } catch (submitError) {
      setError(submitError.message || 'Failed to save settings.');
      setFeedback('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Driver Settings</h2>
      <form className="card" onSubmit={onSubmit} style={{ maxWidth: '560px' }}>
        {feedback ? <p style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>{feedback}</p> : null}
        {error ? <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{error}</p> : null}
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Mobile Number</label>
          <input
            value={form.mobileNumber}
            onChange={(event) => setForm((previous) => ({ ...previous, mobileNumber: event.target.value }))}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Vehicle Type</label>
          <input
            value={form.vehicleType}
            onChange={(event) => setForm((previous) => ({ ...previous, vehicleType: event.target.value }))}
          />
        </div>
        <button className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
