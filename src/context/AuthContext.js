import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProfileDashboard } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initTelegramAuth = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        if (tg) {
          await tg.ready();
          const initData = tg.initData;
          if (initData) {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/telegram`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(tg.initDataUnsafe),
            });
            const data = await response.json();
            if (response.ok) {
              setUser(data.user);
              localStorage.setItem('token', data.token);
            } else {
              console.error('Authentication failed:', data.error);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize Telegram auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initTelegramAuth();
  }, []);

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
