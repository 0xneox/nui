import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTelegramUserData, getRandomAvatar } from '../utils/telegramUtils';
import useApi from '../hooks/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    const initUser = async () => {
      try {
        const telegramData = await getTelegramUserData();
        if (telegramData) {
          const response = await api.post('/auth/telegram', telegramData);
          setUser(response.user);
          localStorage.setItem('token', response.token);
        }
      } catch (error) {
        console.error('Failed to initialize user:', error);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [api]);

  const updateUser = async (userData) => {
    try {
      const updatedUser = await api.put('/profile', userData);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);