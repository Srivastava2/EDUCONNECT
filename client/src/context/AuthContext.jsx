import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('edu_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem('edu_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data);
        } catch (err) {
          console.error('Failed to load profile with stored token', err);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: receivedToken, ...userData } = res.data;
    localStorage.setItem('edu_token', receivedToken);
    localStorage.setItem('edu_user', JSON.stringify(userData));
    setToken(receivedToken);
    setUser(userData);
    return res.data;
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    const { token: receivedToken, ...userData } = res.data;
    localStorage.setItem('edu_token', receivedToken);
    localStorage.setItem('edu_user', JSON.stringify(userData));
    setToken(receivedToken);
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('edu_token');
    localStorage.removeItem('edu_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
