import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs } = useAppData();
  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return (
      <div className="container section">
        <h2>Blog not found</h2>
        <Link to="/blogs" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="container section" style={{ maxWidth: '860px' }}>
      {blog.coverImageUrl ? (
        <img
          src={blog.coverImageUrl}
          alt={blog.title}
          style={{ width: '100%', borderRadius: 'var(--border-radius-lg)', marginBottom: '1.5rem' }}
        />
      ) : null}
      <h1 style={{ marginBottom: '0.75rem' }}>{blog.title}</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{blog.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <Link to="/blogs" className="btn-secondary" style={{ display: 'inline-block', marginTop: '2rem' }}>
        Back to Blogs
      </Link>
    </article>
  );
};

export default BlogDetails;
