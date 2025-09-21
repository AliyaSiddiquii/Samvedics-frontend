import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: '#2f3d2c',
        fontFamily: 'var(--nunito-sans)',
        fontSize: '0.95rem'
      }}
    >
      <p>All rights reserved © Samvedics | Design by Aliya Siddiqui</p>
    </footer>
  );
};

export default Footer;
