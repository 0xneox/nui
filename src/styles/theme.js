const lightTheme = {
  colors: {
    background: '#f5f5f5',
    text: '#333333',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
  },
};

const darkTheme = {
  colors: {
    background: '#333333',
    text: '#f5f5f5',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
  },
};

export const getTheme = (isDarkMode = false) => isDarkMode ? darkTheme : lightTheme;