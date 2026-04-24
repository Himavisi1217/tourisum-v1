import React, { useMemo, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAppData } from '../../context/AppDataContext';

const TINYMCE_API_KEY = 'vv5oujdq57rgayml40szit35kn2lsjdzj57a4bhf0yevhnq0';

const initialAnnouncement = {
  title: '',
  message: '',
  imageUrl: ''
};

const initialBlog = {
  title: '',
  excerpt: '',
  coverImageUrl: '',
  content: '<p>Write your blog content here.</p>'
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
    adminInvites,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addBlog,
    updateBlog,
    deleteBlog,
    createAdminInvite
  } = useAppData();
  const [announcementForm, setAnnouncementForm] = useState(initialAnnouncement);
  const [blogForm, setBlogForm] = useState(initialBlog);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [generatedInviteLink, setGeneratedInviteLink] = useState('');

  const selectedAnnouncement = useMemo(
    () => announcements.find((item) => item.id === selectedAnnouncementId),
    [announcements, selectedAnnouncementId]
  );

  const selectedBlog = useMemo(() => blogs.find((item) => item.id === selectedBlogId), [blogs, selectedBlogId]);

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
      coverImageUrl: selectedBlog.coverImageUrl || '',
      content: selectedBlog.content || '<p></p>'
    });
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 4rem 1.5rem' }}>
      <h2>Super Admin Dashboard</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Publish announcements/blogs and create temporary admin signup links.
      </p>
      {feedback ? <p style={{ color: '#166534', marginBottom: '1rem' }}>{feedback}</p> : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <section className="card">
          <h3>Create Admin Signup Link</h3>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
            Generate a temporary invite URL and share it with the new admin.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={async () => {
              const link = await createAdminInvite({ hoursValid: 24 });
              setGeneratedInviteLink(link);
              setFeedback('Temporary admin signup link created.');
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
