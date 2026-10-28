import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--footer-bg)',
      color: '#94a3b8',
      padding: '30px 20px',
      marginTop: 'auto',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px' }}>EduConnect</h3>
          <p style={{ fontSize: '0.85rem' }}>Official Student &amp; Academic Management Portal</p>
        </div>

        <div style={{ fontSize: '0.88rem' }}>
          <p style={{ margin: '4px 0' }}>
            <i className="fa-solid fa-phone" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
            Mobile: +91 9192631770
          </p>
          <p style={{ margin: '4px 0' }}>
            <i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: 'var(--primary)' }}></i>
            Email: <a href="mailto:educonnect04@gmail.com" style={{ color: 'var(--primary)' }}>educonnect04@gmail.com</a>
          </p>
        </div>

        <div style={{ width: '100%', textAlign: 'center', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.82rem' }}>
          &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
