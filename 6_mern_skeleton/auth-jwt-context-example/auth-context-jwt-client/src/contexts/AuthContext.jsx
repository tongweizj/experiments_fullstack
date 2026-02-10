// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = '/api/auth';

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${apiURL}/verify`, { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        setError(error.response?.data.message || 'Unable to verify authentication');
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${apiURL}/login`, { username, password }, { withCredentials: true });
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      setError(error.response?.data.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiURL}/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      setError(error.response?.data.message || 'Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
