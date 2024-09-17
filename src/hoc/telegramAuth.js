import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { initializeTelegramAuth } from '../services/api';

const withTelegramAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const { setUser, setToken, token, user } = useAuth();

    useEffect(() => {
      const authenticate = async () => {
        if (token && user) {
          setIsAuthenticated(true);
          return;
        }

        if (!window.Telegram || !window.Telegram.WebApp) {
          setError('Please open this app from Telegram.');
          return;
        }

        const webApp = window.Telegram.WebApp;
        webApp.ready();

        if (!webApp.initDataUnsafe || !webApp.initData) {
          setError('Invalid Telegram WebApp initialization.');
          return;
        }

        try {
          const response = await initializeTelegramAuth({
            initData: webApp.initData,
            user: webApp.initDataUnsafe.user
          });

          if (response && response.token) {
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
            setIsAuthenticated(true);
          } else {
            throw new Error('Server authentication failed');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          setError(error.response?.data?.message || 'Failed to authenticate. Please try again.');
        }
      };

      authenticate();
    }, [setUser, setToken, token, user]);

    if (error) {
      return (
        <div className="auth-error">
          <h2>Authentication Error</h2>
          <p>{error}</p>
          {window.Telegram?.WebApp && (
            <button onClick={() => window.Telegram.WebApp.close()}>Close WebApp</button>
          )}
        </div>
      );
    }

    if (!isAuthenticated) {
      return <div className="loading">Authenticating...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withTelegramAuth;