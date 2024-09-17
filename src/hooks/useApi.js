import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({ method, url, data, ...config });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      toast.error(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url, config) => request('get', url, null, config), [request]);
  const post = useCallback((url, data, config) => request('post', url, data, config), [request]);
  const put = useCallback((url, data, config) => request('put', url, data, config), [request]);
  const del = useCallback((url, config) => request('delete', url, null, config), [request]);

  const authenticateTelegram = useCallback(async (telegramData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/telegram', telegramData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
      toast.error(err.response?.data?.message || 'Authentication failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { get, post, put, delete: del, authenticateTelegram, loading, error };
};

export default useApi;