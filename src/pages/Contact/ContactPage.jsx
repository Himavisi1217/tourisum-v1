import React, { useState } from 'react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h2>Contact Us</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>Share your route and travel dates; we will get back to you.</p>
      {submitted ? <p style={{ color: '#166534' }}>Message submitted successfully.</p> : null}
      <form className="card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input type="email" required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Message</label>
          <textarea rows={5} required />
        </div>
        <button className="btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
