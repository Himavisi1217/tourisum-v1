import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-darkest)', color: 'var(--color-light-medium)', padding: '4rem 0 2rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '3rem', borderBottom: '1px solid var(--color-dark)', paddingBottom: '3rem' }}>
          <div>
            <h3 style={{ color: 'var(--color-cream)', marginBottom: '1.5rem' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#">About us</a></li>
              <li><Link to="/blogs">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'var(--color-cream)', marginBottom: '1.5rem' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#">Vehicle rental</a></li>
              <li><a href="#">Driver service</a></li>
              <li><a href="#">Airport transfer</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'var(--color-cream)', marginBottom: '1.5rem' }}>Support</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#">Help center</a></li>
              <li><a href="#">Contact us</a></li>
              <li><Link to="/privacy-policy">Privacy policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'var(--color-cream)', marginBottom: '1.5rem' }}>Contact</h3>
            <p style={{ marginBottom: '0.5rem' }}>+94 70 123 4567</p>
            <p>support@serendibtravels.com</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
          <p>© 2026 Serendib Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
