import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${slug}`);
        setCourse(res.data);
      } catch (err) {
        setError('Course not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '14px' }}></i>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>Course Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{error || 'Unable to locate this course.'}</p>
        <Link to="/courses" style={{
          background: 'var(--primary)',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600'
        }}>
          &larr; Back to All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary)',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Courses
          </Link>
        </div>

        {/* Main Course Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '24px',
            marginBottom: '24px'
          }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>
                {course.title}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                {course.shortDesc}
              </p>
            </div>
            <span style={{
              background: 'rgba(0, 86, 179, 0.1)',
              color: 'var(--primary)',
              border: '1px solid var(--primary)',
              padding: '6px 16px',
              borderRadius: '24px',
              fontSize: '0.88rem',
              fontWeight: '700'
            }}>
              {course.duration}
            </span>
          </div>

          {/* Overview */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text)' }}>
              Program Overview
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
              {course.overview}
            </p>
          </div>

          {/* Specifications Grid */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text)' }}>
              Specifications &amp; Eligibility
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>DURATION</div>
                <div style={{ fontWeight: '600' }}>{course.duration}</div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ELIGIBILITY</div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{course.eligibility}</div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>STUDENT INTAKE</div>
                <div style={{ fontWeight: '600' }}>{course.intake} seats / batch</div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ESTIMATED FEES</div>
                <div style={{ fontWeight: '600', color: '#10b981' }}>{course.fees}</div>
              </div>
            </div>
          </div>

          {/* Syllabus Section */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text)' }}>
                Curriculum &amp; Syllabus Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {course.syllabus.map((sem) => (
                  <div
                    key={sem.semester}
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '20px'
                    }}
                  >
                    <div style={{
                      fontWeight: '700',
                      color: 'var(--primary)',
                      fontSize: '1rem',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <i className="fa-solid fa-book-bookmark"></i>
                      Semester {sem.semester}: {sem.title || 'Core Modules'}
                    </div>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {sem.subjects.map((sub, i) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Opportunities */}
          {course.careerOptions && course.careerOptions.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text)' }}>
                Career Opportunities
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {course.careerOptions.map((opt, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(245, 158, 11, 0.12)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.88rem',
                      fontWeight: '600'
                    }}
                  >
                    <i className="fa-solid fa-briefcase" style={{ marginRight: '6px' }}></i>
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border)'
          }}>
            <Link
              to="/register"
              style={{
                background: 'var(--accent)',
                color: '#000',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-solid fa-user-plus"></i> Apply for this Program
            </Link>

            <a
              href="mailto:admissions@college.edu?subject=Inquiry regarding course"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-solid fa-envelope"></i> Contact Department
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
