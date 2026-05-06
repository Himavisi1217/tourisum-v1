import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

const initialAnnouncementRequest = {
  title: '',
  message: '',
  type: 'banner',
  imageUrl: ''
};

const initialBlogRequest = {
  title: '',
  excerpt: '',
  type: 'travel_guide',
  coverImageUrl: '',
  content: ''
};

const AdminPanel = () => {
  const { currentUser, userData } = useAuth();
  const { contentRequests, submitContentRequest } = useAppData();
  const [announcementRequest, setAnnouncementRequest] = useState(initialAnnouncementRequest);
  const [blogRequest, setBlogRequest] = useState(initialBlogRequest);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [submittingAnnouncement, setSubmittingAnnouncement] = useState(false);
  const [submittingBlog, setSubmittingBlog] = useState(false);
  const myRequests = useMemo(
    () => contentRequests.filter((item) => item.submittedByUid === currentUser?.uid || item.submittedByEmail === userData?.email),
    [contentRequests, currentUser?.uid, userData?.email]
  );

  const submitAnnouncementRequest = async (event) => {
    event.preventDefault();
    try {
      setSubmittingAnnouncement(true);
      setError('');
      await submitContentRequest({
        type: 'announcement',
        payload: announcementRequest
      });
      setAnnouncementRequest(initialAnnouncementRequest);
      setFeedback('Announcement request submitted for super admin approval.');
    } catch (submissionError) {
      setError(submissionError.message || 'Failed to submit announcement request.');
    } finally {
      setSubmittingAnnouncement(false);
    }
  };

  const submitBlogRequest = async (event) => {
    event.preventDefault();
    try {
      setSubmittingBlog(true);
      setError('');
      await submitContentRequest({
        type: 'blog',
        payload: blogRequest
      });
      setBlogRequest(initialBlogRequest);
      setFeedback('Blog request submitted for super admin approval.');
    } catch (submissionError) {
      setError(submissionError.message || 'Failed to submit blog request.');
    } finally {
      setSubmittingBlog(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: '900px' }}>
      <h2>Admin Panel</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Submit content requests here. A super admin must approve before anything is published.
      </p>
      {feedback ? <p style={{ color: '#166534', marginBottom: '1rem' }}>{feedback}</p> : null}
      {error ? <p style={{ color: '#b91c1c', marginBottom: '1rem' }}>{error}</p> : null}

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div className="card">
          <h3>Request Announcement</h3>
          <form onSubmit={submitAnnouncementRequest}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Title</label>
              <input
                value={announcementRequest.title}
                onChange={(event) =>
                  setAnnouncementRequest((previous) => ({ ...previous, title: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Message</label>
              <textarea
                rows={4}
                value={announcementRequest.message}
                onChange={(event) =>
                  setAnnouncementRequest((previous) => ({ ...previous, message: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Type</label>
              <select
                value={announcementRequest.type}
                onChange={(event) =>
                  setAnnouncementRequest((previous) => ({ ...previous, type: event.target.value }))
                }
              >
                <option value="banner">Banner</option>
                <option value="popup">Popup</option>
                <option value="notice">Notice</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Image URL (optional)</label>
              <input
                type="url"
                value={announcementRequest.imageUrl}
                onChange={(event) =>
                  setAnnouncementRequest((previous) => ({ ...previous, imageUrl: event.target.value }))
                }
              />
            </div>
            <button className="btn-primary" disabled={submittingAnnouncement}>
              {submittingAnnouncement ? 'Submitting...' : 'Submit Announcement Request'}
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Request Blog Post</h3>
          <form onSubmit={submitBlogRequest}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Title</label>
              <input
                value={blogRequest.title}
                onChange={(event) => setBlogRequest((previous) => ({ ...previous, title: event.target.value }))}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Excerpt</label>
              <textarea
                rows={3}
                value={blogRequest.excerpt}
                onChange={(event) => setBlogRequest((previous) => ({ ...previous, excerpt: event.target.value }))}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Blog Type</label>
              <select
                value={blogRequest.type}
                onChange={(event) => setBlogRequest((previous) => ({ ...previous, type: event.target.value }))}
              >
                <option value="travel_guide">Travel Guide</option>
                <option value="destination_spotlight">Destination Spotlight</option>
                <option value="travel_tips">Travel Tips</option>
                <option value="company_update">Company Update</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Cover Image URL (optional)</label>
              <input
                type="url"
                value={blogRequest.coverImageUrl}
                onChange={(event) =>
                  setBlogRequest((previous) => ({ ...previous, coverImageUrl: event.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Blog Content</label>
              <textarea
                rows={6}
                value={blogRequest.content}
                onChange={(event) => setBlogRequest((previous) => ({ ...previous, content: event.target.value }))}
                required
              />
            </div>
            <button className="btn-primary" disabled={submittingBlog}>
              {submittingBlog ? 'Submitting...' : 'Submit Blog Request'}
            </button>
          </form>
        </div>

        <div className="card">
          <h3>Your Recent Requests</h3>
          {myRequests.length === 0 ? (
            <p style={{ color: 'var(--color-muted)' }}>No requests submitted yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {myRequests.slice(0, 8).map((request) => (
                <div
                  key={request.id}
                  style={{
                    border: '1px solid var(--color-card-border)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--color-cream)'
                  }}
                >
                  <strong style={{ textTransform: 'capitalize' }}>{request.type}</strong> - {request.payload?.title || 'Untitled'}
                  <span style={{ marginLeft: '0.5rem', color: 'var(--color-muted)' }}>
                    ({request.status || 'pending'})
                  </span>
                  {request.status === 'rejected' && request.rejectionReason ? (
                    <p style={{ marginTop: '0.5rem', color: 'var(--color-error)', fontSize: '0.9rem' }}>
                      Reason: {request.rejectionReason}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Access Level</h3>
        <p>For content publishing and invite link generation, contact a super admin.</p>
        <Link to="/" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
