import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

const labelByType = {
  travel_guide: 'Travel Guide',
  destination_spotlight: 'Destination Spotlight',
  travel_tips: 'Travel Tips',
  company_update: 'Company Update'
};

const initialBlog = {
  title: '',
  excerpt: '',
  type: 'travel_guide',
  coverImageUrl: '',
  content: ''
};

const BlogsPage = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useAppData();
  const { userData } = useAuth();
  const canManageBlogs = userData?.role === 'admin' || userData?.role === 'super_admin';
  const [blogForm, setBlogForm] = useState(initialBlog);
  const [selectedBlogId, setSelectedBlogId] = useState('');
  const [feedback, setFeedback] = useState('');

  const selectedBlog = useMemo(() => blogs.find((item) => item.id === selectedBlogId), [blogs, selectedBlogId]);

  const handleLoad = () => {
    if (!selectedBlog) {
      return;
    }
    setBlogForm({
      title: selectedBlog.title || '',
      excerpt: selectedBlog.excerpt || '',
      type: selectedBlog.type || 'travel_guide',
      coverImageUrl: selectedBlog.coverImageUrl || '',
      content: selectedBlog.content || ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedBlogId) {
      await updateBlog(selectedBlogId, blogForm);
      setFeedback('Blog updated.');
    } else {
      await addBlog(blogForm);
      setFeedback('Blog added.');
    }
    setBlogForm(initialBlog);
    setSelectedBlogId('');
  };

  const handleDelete = async () => {
    if (!selectedBlogId) {
      return;
    }
    await deleteBlog(selectedBlogId);
    setFeedback('Blog deleted.');
    setBlogForm(initialBlog);
    setSelectedBlogId('');
  };

  return (
    <div className="container section">
      <h2>Travel Blogs</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Stories, guides, and local tips for your next Sri Lankan trip.
      </p>
      <div className="grid-3">
        {blogs.map((blog) => (
          <article key={blog.id} className="card" style={{ overflow: 'hidden', padding: 0 }}>
            {blog.coverImageUrl ? (
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
            ) : null}
            <div style={{ padding: '1.2rem' }}>
              <p style={{ color: 'var(--color-dark)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                {labelByType[blog.type] || 'Blog'}
              </p>
              <h3 style={{ marginBottom: '0.75rem' }}>{blog.title}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{blog.excerpt}</p>
              <Link className="btn-secondary" to={`/blogs/${blog.id}`} style={{ display: 'inline-block', marginTop: '1rem' }}>
                Read Blog
              </Link>
            </div>
          </article>
        ))}
      </div>

      {canManageBlogs ? (
        <section className="card" style={{ marginTop: '2rem' }}>
          <h3>Manage Blogs (Admin)</h3>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>
            Add new blogs and edit/delete uploaded blog posts directly from this page.
          </p>
          {feedback ? <p style={{ color: '#166534', marginBottom: '1rem' }}>{feedback}</p> : null}

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <select value={selectedBlogId} onChange={(event) => setSelectedBlogId(event.target.value)}>
              <option value="">Select blog</option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.title}
                </option>
              ))}
            </select>
            <button type="button" className="btn-secondary" onClick={handleLoad}>
              Load
            </button>
            {selectedBlogId ? (
              <button type="button" className="btn-secondary" onClick={handleDelete}>
                Delete
              </button>
            ) : null}
          </div>

          <form onSubmit={handleSubmit}>
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
                value={blogForm.coverImageUrl}
                onChange={(event) =>
                  setBlogForm((previous) => ({ ...previous, coverImageUrl: event.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Blog Content (HTML/Text)</label>
              <textarea
                rows={6}
                value={blogForm.content}
                onChange={(event) => setBlogForm((previous) => ({ ...previous, content: event.target.value }))}
                placeholder="<p>Write your post here...</p>"
                required
              />
            </div>
            <button className="btn-primary">{selectedBlogId ? 'Update' : 'Add'} Blog</button>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default BlogsPage;
