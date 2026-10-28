import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LOCK_KEY = 'edu_lock_info';
const REMEMBER_KEY = 'edu_remember_user';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Load Remembered email and check lockout on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(REMEMBER_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    checkLockout(savedEmail || '');
  }, []);

  const checkLockout = (emailToCheck) => {
    try {
      const lockData = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}');
      const entry = lockData[emailToCheck.toLowerCase()];
      if (entry && entry.lockedUntil && Date.now() < entry.lockedUntil) {
        const remaining = Math.ceil((entry.lockedUntil - Date.now()) / 1000);
        setLockoutTime(remaining);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const recordFailedAttempt = (emailToRecord) => {
    try {
      const lockData = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}');
      const key = emailToRecord.toLowerCase();
      if (!lockData[key]) {
        lockData[key] = { attempts: 0, lockedUntil: null };
      }
      lockData[key].attempts += 1;
      if (lockData[key].attempts >= 5) {
        lockData[key].lockedUntil = Date.now() + 5 * 60 * 1000; // 5 min lock
        setLockoutTime(300);
      }
      localStorage.setItem(LOCK_KEY, JSON.stringify(lockData));
    } catch {}
  };

  const clearFailedAttempts = (emailToClear) => {
    try {
      const lockData = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}');
      delete lockData[emailToClear.toLowerCase()];
      localStorage.setItem(LOCK_KEY, JSON.stringify(lockData));
    } catch {}
  };

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (checkLockout(email)) {
      setErrorMsg(`Too many failed attempts. Login locked for ${lockoutTime}s.`);
      return;
    }

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);

      // Remember me logic
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      clearFailedAttempts(email);
      navigate('/dashboard');
    } catch (err) {
      recordFailedAttempt(email);
      checkLockout(email);
      setErrorMsg(err.response?.data?.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '75vh',
      padding: '40px 20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'rgba(0, 86, 179, 0.1)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            margin: '0 auto 14px'
          }}>
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>
            Student Portal Login
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Access your courses, profile, and assignments
          </p>
        </div>

        {/* Error / Lockout Alert */}
        {lockoutTime > 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            marginBottom: '18px',
            textAlign: 'center'
          }}>
            <i className="fa-solid fa-clock" style={{ marginRight: '6px' }}></i>
            Account locked due to 5 failed attempts. Please retry in <strong>{lockoutTime}s</strong>.
          </div>
        )}

        {errorMsg && lockoutTime === 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            marginBottom: '18px'
          }}>
            <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '6px' }}></i>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>
              Registered Email
            </label>
            <input
              type="email"
              required
              placeholder="e.g. student@college.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkLockout(e.target.value);
              }}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem'
                }}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('For demo purposes: if you forgot your password, please register with a new email or check with the administrator.');
              }}
              style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || lockoutTime > 0}
            style={{
              width: '100%',
              background: 'var(--primary)',
              color: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-sm)',
              opacity: loading || lockoutTime > 0 ? 0.6 : 1,
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text)',
  fontSize: '0.92rem'
};

export default Login;
