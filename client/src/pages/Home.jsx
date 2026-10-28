import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: `linear-gradient(rgba(0, 30, 80, 0.75), rgba(0, 15, 45, 0.85)), url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
        color: '#ffffff',
        padding: '90px 20px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '18px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            🎓 Student Academic &amp; Admissions Portal
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '700', lineHeight: 1.2, marginBottom: '18px' }}>
            Welcome to <span style={{ color: 'var(--accent)' }}>EduConnect</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '30px' }}>
            Your one-stop academic student portal for verified courses, real-time curriculum tracking, assignment submissions, and seamless campus administration.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/courses"
              style={{
                background: 'var(--accent)',
                color: '#000',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
              }}
            >
              <i className="fa-solid fa-book-open"></i> Explore Courses
            </Link>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fa-solid fa-gauge-high"></i> Open Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                style={{
                  background: '#ffffff',
                  color: 'var(--primary)',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fa-solid fa-user-plus"></i> Student Admission
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ padding: '60px 20px', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' }}>
              Why Choose EduConnect?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Designed to make education accessible, streamlined, and interconnected.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {/* Card 1 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'rgba(0, 74, 173, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 16px'
              }}>
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Verified Courses</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Comprehensive syllabus for MCA, MBA, B.Tech (CSE, AI/ML), and M.Tech updated to university standards.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 16px'
              }}>
                <i className="fa-solid fa-address-card"></i>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Streamlined Registration</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Instant OTP-verified admissions with academic details, parent records, and counselling tracking.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 16px'
              }}>
                <i className="fa-solid fa-list-check"></i>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Student Dashboard</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Real-time tracking of pending assignments, course notifications, and student profile details.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 16px'
              }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Secure &amp; Protected</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Encrypted credentials, multi-step verification, and automated protection against unauthorized access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '40px 20px'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: '700', color: 'var(--primary)' }}>6+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Degree Programs</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: '700', color: 'var(--accent)' }}>100%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Cloud Connected</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: '700', color: '#10b981' }}>24/7</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Student Support</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: '700', color: '#8b5cf6' }}>Instant</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Online Admissions</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
