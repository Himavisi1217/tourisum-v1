import React, { useMemo, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

const TINYMCE_API_KEY = 'vv5oujdq57rgayml40szit35kn2lsjdzj57a4bhf0yevhnq0';

const initialAnnouncement = {
  title: '',
  message: '',
  type: 'banner',
  imageUrl: ''
};

const initialBlog = {
  title: '',
  excerpt: '',
  type: 'travel_guide',
  coverImageUrl: '',
  content: '<p>Write your blog content here.</p>'
};

const initialDestination = {
  id: '',
  name: '',
  shortDescription: '',
  imageUrl: '',
  popularity: '',
  details: ''
};

const editorConfig = {
  height: 320,
  menubar: true,
  plugins: 'link lists image table code fullscreen',
  toolbar:
    'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | code fullscreen'
};

const AdminDashboard = () => {
  const {
    announcements,
    blogs,
    destinations,
    adminInvites,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addBlog,
    updateBlog,
    deleteBlog,
    addDestination,
    updateDestination,
    deleteDestination,
    createAdminInvite
  } = useAppData();
  const { userData } = useAuth();
  const [announcementForm, setAnnouncementForm] = useState(initialAnnouncement);
  const [blogForm, setBlogForm] = useState(initialBlog);
  const [destinationForm, setDestinationForm] = useState(initialDestination);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [errorFeedback, setErrorFeedback] = useState('');
  const [generatedInviteLink, setGeneratedInviteLink] = useState('');
  const isSuperAdmin = userData?.role === 'super_admin';

  const selectedAnnouncement = useMemo(
    () => announcements.find((item) => item.id === selectedAnnouncementId),
    [announcements, selectedAnnouncementId]
  );

  const selectedBlog = useMemo(() => blogs.find((item) => item.id === selectedBlogId), [blogs, selectedBlogId]);
  const selectedDestination = useMemo(
    () => destinations.find((item) => item.id === selectedDestinationId),
    [destinations, selectedDestinationId]
  );

  const submitAnnouncement = async (event) => {
    event.preventDefault();
    if (selectedAnnouncementId) {
      await updateAnnouncement(selectedAnnouncementId, announcementForm);
      setFeedback('Announcement updated.');
    } else {
      await addAnnouncement(announcementForm);
      setFeedback('Announcement added.');
    }
    setAnnouncementForm(initialAnnouncement);
    setSelectedAnnouncementId('');
  };

  const submitBlog = async (event) => {
    event.preventDefault();
    if (selectedBlogId) {
      await updateBlog(selectedBlogId, blogForm);
      setFeedback('Blog updated.');
    } else {
      await addBlog(blogForm);
      setFeedback('Blog published.');
    }
    setBlogForm(initialBlog);
    setSelectedBlogId('');
  };

  const editAnnouncement = () => {
    if (!selectedAnnouncement) {
      return;
    }
    setAnnouncementForm({
      title: selectedAnnouncement.title || '',
      message: selectedAnnouncement.message || '',
      type: selectedAnnouncement.type || 'banner',
      imageUrl: selectedAnnouncement.imageUrl || ''
    });
  };

  const editBlog = () => {
    if (!selectedBlog) {
      return;
    }
    setBlogForm({
      title: selectedBlog.title || '',
      excerpt: selectedBlog.excerpt || '',
      type: selectedBlog.type || 'travel_guide',
      coverImageUrl: selectedBlog.coverImageUrl || '',
      content: selectedBlog.content || '<p></p>'
    });
  };

  const submitDestination = async (event) => {
    event.preventDefault();
    if (selectedDestinationId) {
      await updateDestination(selectedDestinationId, destinationForm);
      setFeedback('Destination updated.');
    } else {
      await addDestination(destinationForm);
      setFeedback('Destination added.');
    }
    setDestinationForm(initialDestination);
    setSelectedDestinationId('');
  };

  const editDestination = () => {
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

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 4rem 1.5rem' }}>
      <h2>Super Admin Dashboard</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Publish announcements/blogs and create temporary admin signup links.
      </p>
      {feedback ? <p style={{ color: '#166534', marginBottom: '1rem' }}>{feedback}</p> : null}
      {errorFeedback ? <p style={{ color: '#b91c1c', marginBottom: '1rem' }}>{errorFeedback}</p> : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {isSuperAdmin ? (
          <section className="card">
            <h3>Create Admin Signup Link</h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
              Generate a temporary invite URL and share it with the new admin.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={async () => {
                try {
                  setErrorFeedback('');
                  const link = await createAdminInvite({ hoursValid: 24 });
                  setGeneratedInviteLink(link);
                  setFeedback('Temporary admin signup link created.');
                } catch (error) {
                  setErrorFeedback(error.message || 'Failed to generate invite link.');
                }
              }}
            >
              Generate 24h Invite Link
            </button>
            {generatedInviteLink ? (
              <div style={{ marginTop: '1rem' }}>
                <label>Share this link</label>
                <input readOnly value={generatedInviteLink} />
              </div>
            ) : null}
            {adminInvites.length > 0 ? (
              <div style={{ marginTop: '1rem' }}>
                <h4>Recent Invites</h4>
                {adminInvites.slice(0, 5).map((invite) => (
                  <p key={invite.id} style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                    {invite.id} - {invite.used ? 'used' : 'active'}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        ) : (
          <section className="card">
            <h3>Create Admin Signup Link</h3>
            <p style={{ color: 'var(--color-muted)' }}>
              Invite link generation is available only for super admin accounts.
            </p>
          </section>
        )}

        {isSuperAdmin ? (
          <section className="card">
            <h3>Destinations</h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
              Add more destinations that will appear on the public destination pages.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <select value={selectedDestinationId} onChange={(event) => setSelectedDestinationId(event.target.value)}>
                <option value="">Select destination</option>
                {destinations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="button" className="btn-secondary" onClick={editDestination}>
                Load
              </button>
              {selectedDestinationId ? (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={async () => {
                    await deleteDestination(selectedDestinationId);
                    setSelectedDestinationId('');
                    setDestinationForm(initialDestination);
                    setFeedback('Destination deleted.');
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
            <form onSubmit={submitDestination}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Destination ID (slug)</label>
                <input
                  placeholder="example: polonnaruwa"
                  value={destinationForm.id}
                  onChange={(event) =>
                    setDestinationForm((previous) => ({ ...previous, id: event.target.value }))
                  }
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

        <section className="card">
          <h3>Announcements</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <select
              value={selectedAnnouncementId}
              onChange={(event) => setSelectedAnnouncementId(event.target.value)}
            >
              <option value="">Select announcement</option>
              {announcements.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button type="button" className="btn-secondary" onClick={editAnnouncement}>
              Load
            </button>
            {selectedAnnouncementId ? (
              <button
                type="button"
                className="btn-secondary"
                onClick={async () => {
                  await deleteAnnouncement(selectedAnnouncementId);
                  setSelectedAnnouncementId('');
                  setAnnouncementForm(initialAnnouncement);
                  setFeedback('Announcement deleted.');
                }}
              >
                Delete
              </button>
            ) : null}
          </div>
          <form onSubmit={submitAnnouncement}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Title</label>
              <input
                value={announcementForm.title}
                onChange={(event) =>
                  setAnnouncementForm((previous) => ({ ...previous, title: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Message</label>
              <textarea
                rows={4}
                value={announcementForm.message}
                onChange={(event) =>
                  setAnnouncementForm((previous) => ({ ...previous, message: event.target.value }))
                }
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Announcement Type</label>
              <select
                value={announcementForm.type}
                onChange={(event) =>
                  setAnnouncementForm((previous) => ({ ...previous, type: event.target.value }))
                }
              >
                <option value="banner">Banner Announcement</option>
                <option value="popup">Popup Message</option>
                <option value="notice">Notice</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/banner.jpg"
                value={announcementForm.imageUrl}
                onChange={(event) =>
                  setAnnouncementForm((previous) => ({ ...previous, imageUrl: event.target.value }))
                }
              />
            </div>
            <button className="btn-primary">{selectedAnnouncementId ? 'Update' : 'Add'} Announcement</button>
          </form>
        </section>

        <section className="card">
          <h3>Blogs</h3>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <select value={selectedBlogId} onChange={(event) => setSelectedBlogId(event.target.value)}>
              <option value="">Select blog</option>
              {blogs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button type="button" className="btn-secondary" onClick={editBlog}>
              Load
            </button>
            {selectedBlogId ? (
              <button
                type="button"
                className="btn-secondary"
                onClick={async () => {
                  await deleteBlog(selectedBlogId);
                  setSelectedBlogId('');
                  setBlogForm(initialBlog);
                  setFeedback('Blog deleted.');
                }}
              >
                Delete
              </button>
            ) : null}
          </div>
          <form onSubmit={submitBlog}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Title</label>
              <input
                value={blogForm.title}
                onChange={(event) => setBlogForm((previous) => ({ ...previous, title: event.target.value }))}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Excerpt</label>
              <textarea
                rows={3}
                value={blogForm.excerpt}
                onChange={(event) => setBlogForm((previous) => ({ ...previous, excerpt: event.target.value }))}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Blog Type</label>
              <select
                value={blogForm.type}
                onChange={(event) => setBlogForm((previous) => ({ ...previous, type: event.target.value }))}
              >
                <option value="travel_guide">Travel Guide</option>
                <option value="destination_spotlight">Destination Spotlight</option>
                <option value="travel_tips">Travel Tips</option>
                <option value="company_update">Company Update</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Cover Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/cover.jpg"
                value={blogForm.coverImageUrl}
                onChange={(event) =>
                  setBlogForm((previous) => ({ ...previous, coverImageUrl: event.target.value }))
                }
              />
            </div>
            <label style={{ marginBottom: '0.75rem' }}>Blog Content (TinyMCE)</label>
            <Editor
              apiKey={TINYMCE_API_KEY}
              value={blogForm.content}
              init={editorConfig}
              onEditorChange={(content) => setBlogForm((previous) => ({ ...previous, content }))}
            />
            <button className="btn-primary" style={{ marginTop: '1rem' }}>
              {selectedBlogId ? 'Update' : 'Publish'} Blog
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
