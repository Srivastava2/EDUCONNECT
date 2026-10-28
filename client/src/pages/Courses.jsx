import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err) {
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
    (c.coreSubjects && c.coreSubjects.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="fade-in" style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '10px' }}>
            Academic Programs &amp; Courses
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Explore accredited undergraduate and postgraduate curricula with detailed semester breakdowns.
          </p>

          {/* Search Box */}
          <div style={{
            position: 'relative',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <i className="fa-solid fa-magnifying-glass" style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}></i>
            <input
              type="text"
              placeholder="Search by degree, branch, or subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: '30px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text)',
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '12px', color: 'var(--primary)' }}></i>
            <p>Loading academic curriculum...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
            <p>{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.25s, box-shadow 0.25s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'rgba(0, 86, 179, 0.1)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      <i className={`fa-solid ${course.icon || 'fa-graduation-cap'}`}></i>
                    </div>
                    <span style={{
                      background: 'rgba(245, 158, 11, 0.12)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: '700'
                    }}>
                      {course.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text)' }}>
                    {course.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '16px' }}>
                    {course.shortDesc}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px'
                  }}>
                    {course.coreSubjects && course.coreSubjects.slice(0, 4).map((sub, idx) => (
                      <span key={idx} style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem'
                      }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-users" style={{ marginRight: '6px' }}></i>
                    Intake: <strong>{course.intake} seats</strong>
                  </div>
                  <Link
                    to={`/courses/${course.slug}`}
                    style={{
                      background: 'var(--primary)',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'background 0.2s'
                    }}
                  >
                    View Curriculum <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
            <p>No courses match your search "{search}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
