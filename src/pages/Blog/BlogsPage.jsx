import React from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';

const BlogsPage = () => {
  const { blogs } = useAppData();

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
              <h3 style={{ marginBottom: '0.75rem' }}>{blog.title}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{blog.excerpt}</p>
              <Link className="btn-secondary" to={`/blogs/${blog.id}`} style={{ display: 'inline-block', marginTop: '1rem' }}>
                Read Blog
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
