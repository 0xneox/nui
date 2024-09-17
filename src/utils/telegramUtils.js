import CryptoJS from 'crypto-js';

export const getTelegramUserData = () => {
  const tg = window.Telegram?.WebApp;
  
  if (tg?.initDataUnsafe?.user) {
    const { id, first_name, username, photo_url } = tg.initDataUnsafe.user;
    const accountAge = calculateAccountAge(tg.initDataUnsafe.user.date);
    const isPremium = tg.initDataUnsafe.user.is_premium || false;

    return {
      id,
      name: username || first_name,
      avatarUrl: photo_url,
      accountAge,
      isPremium
    };
  }

  return null;
};

const calculateAccountAge = (creationDate) => {
  const now = new Date();
  const created = new Date(creationDate * 1000);
  const diffYears = now.getFullYear() - created.getFullYear();
  const diffMonths = now.getMonth() - created.getMonth();
  const diffDays = now.getDate() - created.getDate();

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
};

export const initializeTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    return true;
  }
  return false;
};

export const getTelegramInitData = () => {
  return window.Telegram?.WebApp?.initData || '';
};

export const verifyTelegramWebAppData = (initData) => {
  const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  if (!BOT_TOKEN) {
    console.error('Telegram bot token is not set');
    return false;
  }

  const initDataArray = initData.split('&');
  const dataToCheck = initDataArray.filter(item => item.match(/=(.*)/));
  const hash = initDataArray.find(item => item.startsWith('hash='))?.split('=')[1];

  if (!hash) {
    console.error('Hash not found in init data');
    return false;
  }

  dataToCheck.sort();
  const dataCheckString = dataToCheck.join('\n');

  const secret = CryptoJS.HmacSHA256(BOT_TOKEN, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataCheckString, secret).toString(CryptoJS.enc.Hex);

  return _hash === hash;
};