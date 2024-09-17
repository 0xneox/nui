import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTelegramUserData, getTelegramInitData, initializeTelegramWebApp } from '../utils/telegramUtils';
import { initializeTelegramAuth } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initUser = async () => {
      try {
        if (!initializeTelegramWebApp()) {
          throw new Error('Telegram Web App not available');
        }

        const telegramData = getTelegramUserData();
        const initData = getTelegramInitData();
        
        if (!telegramData || !initData) {
          throw new Error('Failed to get Telegram user data');
        }

        const authResult = await initializeTelegramAuth(telegramData, initData);
        if (authResult.token) {
          localStorage.setItem('token', authResult.token);
          setUser(authResult.user);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (err) {
        console.error('Error initializing user:', err);
        setError(err.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);