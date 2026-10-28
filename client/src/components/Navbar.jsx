import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: isActive ? '700' : '500',
    borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
    paddingBottom: '4px',
    transition: 'all 0.2s ease',
    fontSize: '0.95rem'
  });

  return (
    <header style={{
      background: 'var(--header-bg)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-md)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        gap: '16px'
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-graduation-cap" style={{ fontSize: '1.6rem', color: 'var(--accent)' }}></i>
          <h1 style={{ fontSize: '1.35rem', fontWeight: '700', letterSpacing: '-0.3px', margin: 0 }}>
            EduConnect
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/courses" style={navLinkStyle}>Courses</NavLink>
          {!isAuthenticated && (
            <NavLink to="/register" style={navLinkStyle}>Register</NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/dashboard" style={navLinkStyle}>Dashboard</NavLink>
          )}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s ease'
            }}
          >
            {theme === 'dark' ? (
              <>
                <i className="fa-solid fa-sun" style={{ color: '#fcd34d' }}></i> Light
              </>
            ) : (
              <>
                <i className="fa-solid fa-moon"></i> Dark
              </>
            )}
          </button>

          {/* Auth State Button */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.88rem',
                  fontWeight: '600'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>
                  {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <span>{user?.fullName?.split(' ')[0] || 'Profile'}</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  transition: 'opacity 0.2s'
                }}
              >
                <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '6px' }}></i>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                to="/login"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  padding: '7px 16px',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
