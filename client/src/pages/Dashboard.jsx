import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const loadDashboardData = async () => {
    try {
      const [profileRes, assignmentsRes] = await Promise.all([
        api.get('/auth/profile'),
        api.get('/assignments')
      ]);
      setProfile(profileRes.data);
      setUser(profileRes.data);
      setAssignments(assignmentsRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const toggleAssignmentStatus = async (id) => {
    try {
      const res = await api.post(`/assignments/${id}/complete`);
      setActionMsg(res.data.message);
      setTimeout(() => setActionMsg(''), 3000);

      // Update local state
      setAssignments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, isCompleted: res.data.isCompleted } : a))
      );
    } catch (err) {
      alert('Failed to update assignment status.');
    }
  };

  const pendingCount = assignments.filter((a) => !a.isCompleted).length;
  const completedCount = assignments.filter((a) => a.isCompleted).length;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '14px' }}></i>
        <p>Loading your student profile &amp; assignments...</p>
      </div>
    );
  }

  const initials = profile?.fullName
    ? profile.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <div className="fade-in" style={{ padding: '36px 20px', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '26px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
              Student Portal Dashboard
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Welcome back, <strong>{profile?.fullName || 'Student'}</strong>! Here is your academic overview.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className={`fa-solid fa-rotate-right ${refreshing ? 'fa-spin' : ''}`}></i>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {actionMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid #10b981',
            color: '#10b981',
            padding: '10px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            <i className="fa-solid fa-check" style={{ marginRight: '8px' }}></i>
            {actionMsg}
          </div>
        )}

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 360px) 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Left Column: Student Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Identity Card */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #0056b3, #38bdf8)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(0, 86, 179, 0.25)'
                }}>
                  {initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text)' }}>
                    {profile?.fullName}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 0' }}>
                    {profile?.email}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginTop: '6px'
                  }}>
                    Active Student
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                Personal Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem', marginBottom: '18px' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>PHONE</div>
                  <div style={{ fontWeight: '600' }}>{profile?.phone || '—'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>DOB</div>
                  <div style={{ fontWeight: '600' }}>
                    {profile?.dob ? new Date(profile.dob).toLocaleDateString() : '—'}
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>GENDER</div>
                  <div style={{ fontWeight: '600' }}>{profile?.gender || '—'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>BLOOD GROUP</div>
                  <div style={{ fontWeight: '600' }}>{profile?.bloodGroup || '—'}</div>
                </div>
              </div>

              {/* Academic Enrollment */}
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                Academic Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem', marginBottom: '18px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>PROGRAM</div>
                  <div style={{ fontWeight: '700', color: 'var(--accent)' }}>{profile?.course || '—'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>SECTION</div>
                  <div style={{ fontWeight: '600' }}>Section {profile?.section || 'A'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>ROLL NO.</div>
                  <div style={{ fontWeight: '600' }}>{profile?.rollNo || 'Not Assigned'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>CATEGORY</div>
                  <div style={{ fontWeight: '600' }}>{profile?.admissionCategory || 'Direct'}</div>
                </div>
              </div>

              {/* Parents Record */}
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                Parents / Guardians
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>FATHER</div>
                  <div style={{ fontWeight: '600' }}>{profile?.fatherName || '—'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>MOTHER</div>
                  <div style={{ fontWeight: '600' }}>{profile?.motherName || '—'}</div>
                </div>
              </div>
            </div>

            {/* Metrics Widget */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ef4444' }}>
                  {pendingCount}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
                  Pending Tasks
                </div>
              </div>

              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#10b981' }}>
                  {completedCount}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
                  Completed Tasks
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Assignments & Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Assignments Card */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0, color: 'var(--text)' }}>
                    Assignments &amp; Submissions
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '4px 0 0' }}>
                    Track tasks assigned to <strong>{profile?.course}</strong>
                  </p>
                </div>
                <span style={{
                  background: 'rgba(0, 86, 179, 0.1)',
                  color: 'var(--primary)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: '700'
                }}>
                  {assignments.length} Total
                </span>
              </div>

              {assignments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '10px' }}></i>
                  <p>All caught up! No pending assignments for your course.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {assignments.map((item) => (
                    <div
                      key={item._id}
                      style={{
                        background: 'var(--bg)',
                        border: `1px solid ${item.isCompleted ? 'rgba(16, 185, 129, 0.4)' : 'var(--border)'}`,
                        borderRadius: '12px',
                        padding: '18px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '14px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            background: item.isCompleted ? '#10b981' : '#f59e0b',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%'
                          }}></span>
                          <h4 style={{
                            margin: 0,
                            fontSize: '1.02rem',
                            fontWeight: '600',
                            textDecoration: item.isCompleted ? 'line-through' : 'none',
                            color: item.isCompleted ? 'var(--text-muted)' : 'var(--text)'
                          }}>
                            {item.title}
                          </h4>
                        </div>
                        <p style={{ margin: '4px 0 8px', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                          {item.description}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
                          Due: <strong>{new Date(item.dueDate).toLocaleDateString()}</strong> • Course:{' '}
                          <span>{item.course}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleAssignmentStatus(item._id)}
                        style={{
                          background: item.isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'var(--primary)',
                          color: item.isCompleted ? '#10b981' : '#ffffff',
                          border: item.isCompleted ? '1px solid #10b981' : 'none',
                          padding: '9px 18px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        {item.isCompleted ? (
                          <>
                            <i className="fa-solid fa-circle-check"></i> Completed
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-check"></i> Mark as Done
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Course Notifications / Notice Board */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '14px', color: 'var(--text)' }}>
                <i className="fa-solid fa-bullhorn" style={{ color: 'var(--accent)', marginRight: '8px' }}></i>
                Campus &amp; Department Notices
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  background: 'var(--bg)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--primary)',
                  fontSize: '0.88rem'
                }}>
                  <strong>Mid-Term Evaluation Schedule:</strong> Departmental presentations for {profile?.course} will commence from next Monday.
                </div>
                <div style={{
                  background: 'var(--bg)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--accent)',
                  fontSize: '0.88rem'
                }}>
                  <strong>Library Resource Access:</strong> IEEE digital library and ACM portal credentials have been dispatched to registered student emails.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
