// src/utils/haptics.js

export const triggerHapticFeedback = (type) => {
    if (!window.navigator.vibrate) return; // Check if vibration is supported
  
    switch (type) {
      case 'tap':
        window.navigator.vibrate(50); // Short vibration for taps
        break;
      case 'cooldown':
        window.navigator.vibrate([100, 30, 100]); // Pattern for cooldown
        break;
      case 'claim':
        window.navigator.vibrate([50, 50, 50]); // Pattern for claims
        break;
      case 'bonus':
        window.navigator.vibrate([100, 50, 100, 50, 100]); // Pattern for bonuses
        break;
      case 'quest':
        window.navigator.vibrate([50, 100, 50, 100]); // Pattern for completed quests
        break;
      default:
        window.navigator.vibrate(50); // Default vibration
    }
  };