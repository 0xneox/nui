import { initializeTelegramAuth } from '../services/api';

export const initTelegramAuth = (setUser, setLoading, setError) => {
  const tg = window.Telegram?.WebApp;

  if (tg?.initDataUnsafe?.user) {
    const { id, first_name, username } = tg.initDataUnsafe.user;
    
    setLoading(true);
    initializeTelegramAuth({ id, first_name, username })
      .then(response => {
        setUser(response.user);
        localStorage.setItem('token', response.token);
        setLoading(false);
      })
      .catch(error => {
        console.error('Authentication error:', error);
        setError('Failed to authenticate. Please try again.');
        setLoading(false);
      });
  } else {
    console.error('Unable to get user data from Telegram WebApp');
    setError('Unable to get user data from Telegram WebApp');
    setLoading(false);
  }
};