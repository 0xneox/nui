import axios from 'axios';
import config from '../utils/config';
import { verifyTelegramWebAppData, getTelegramInitData } from '../utils/telegramUtils';


const API_BASE_URL = config.API_BASE_URL;
const AUTH_BASE_URL = config.AUTH_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('API Request Error:', error);
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('API Response Error:', error.response || error);
  if (error.response && error.response.status === 401) {
    // Handle unauthorized access (e.g., redirect to login)
    // You might want to implement a logout function here
  }
  return Promise.reject(error);
});

// Authentication
export const initializeTelegramAuth = async (userData, initData) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/telegram`, userData, {
      headers: {
        'Telegram-Data': initData
      }
    });
    return response.data;
  } catch (error) {
    console.error('Telegram Auth Error:', error);
    throw error;
  }
};

// User Profile
export const createUserProfile = async (userData) => {
  try {
    const response = await api.post('/users/create', userData);
    return response.data;
  } catch (error) {
    console.error('Create User Profile Error:', error);
    throw error;
  }
};

export const getProfileDashboard = async () => {
  try {
    const response = await api.get('/profile-dashboard');
    return response.data;
  } catch (error) {
    console.error('Get Profile Dashboard Error:', error);
    throw error;
  }
};

export const updateProfileDashboard = async (updateData) => {
  try {
    const response = await api.put('/profile-dashboard/update', updateData);
    return response.data;
  } catch (error) {
    console.error('Update Profile Dashboard Error:', error);
    throw error;
  }
};

// User actions
export const claimDailyXP = async () => {
  try {
    const response = await api.post('/users/claim-daily-xp');
    return response.data;
  } catch (error) {
    console.error('Claim Daily XP Error:', error);
    throw error;
  }
};

export const tapGPU = async () => {
  try {
    const response = await api.post('/users/tap');
    return response.data;
  } catch (error) {
    console.error('Tap GPU Error:', error);
    throw error;
  }
};

export const upgradeGPU = async () => {
  try {
    const response = await api.post('/users/upgrade-gpu');
    return response.data;
  } catch (error) {
    console.error('Upgrade GPU Error:', error);
    throw error;
  }
};

export const getCooldownStatus = async () => {
  try {
    const response = await api.get('/users/cooldown-status');
    return response.data;
  } catch (error) {
    console.error('Get Cooldown Status Error:', error);
    throw error;
  }
};

export const getDailyPoints = async () => {
  try {
    const response = await api.get('/users/daily-points');
    return response.data;
  } catch (error) {
    console.error('Get Daily Points Error:', error);
    throw error;
  }
};

// Referral
export const generateReferralCode = async () => {
  try {
    const response = await api.post('/referral/generate-code');
    return response.data;
  } catch (error) {
    console.error('Generate Referral Code Error:', error);
    throw error;
  }
};

export const applyReferralCode = async (referralCode) => {
  try {
    const response = await api.post('/referral/apply-code', { referralCode });
    return response.data;
  } catch (error) {
    console.error('Apply Referral Code Error:', error);
    throw error;
  }
};

export const getReferralStats = async () => {
  try {
    const response = await api.get('/referral/stats');
    return response.data;
  } catch (error) {
    console.error('Get Referral Stats Error:', error);
    throw error;
  }
};

// Quests
export const getQuests = async () => {
  try {
    const response = await api.get('/quests');
    return response.data;
  } catch (error) {
    console.error('Get Quests Error:', error);
    throw error;
  }
};

export const claimQuest = async (questId) => {
  try {
    const response = await api.post(`/quests/${questId}/complete`);
    return response.data;
  } catch (error) {
    console.error('Claim Quest Error:', error);
    throw error;
  }
};

// Leaderboard
export const getLeaderboard = async (type = 'all-time') => {
  try {
    const response = await api.get(`/leaderboard/${type}`);
    return response.data;
  } catch (error) {
    console.error('Get Leaderboard Error:', error);
    throw error;
  }
};

// Settings
export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Get Settings Error:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const response = await api.put('/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error('Update Settings Error:', error);
    throw error;
  }
};

// Achievements
export const getAchievements = async () => {
  try {
    const response = await api.get('/achievements');
    return response.data;
  } catch (error) {
    console.error('Get Achievements Error:', error);
    throw error;
  }
};

export const claimAchievement = async (achievementId) => {
  try {
    const response = await api.post(`/achievements/claim/${achievementId}`);
    return response.data;
  } catch (error) {
    console.error('Claim Achievement Error:', error);
    throw error;
  }
};

export default api;