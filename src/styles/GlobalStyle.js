import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Neue+Haas+Grotesk+Display+Pro:wght@400;700&display=swap');

  :root {
    --primary-color: #06115D;
    --secondary-color: #1AECED;
    --black: #000000;
    --white: #FFFFFF;
    --gradient-start: #06115D;
    --gradient-middle: #0361DA;
    --gradient-end: #20A5EF;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.background || 'var(--primary-color)'};
    color: ${props => props.theme.colors.text || 'var(--white)'};
    font-family: 'Neue Haas Grotesk Display Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    font-size: 122px;
    font-weight: 700;
  }

  h2 {
    font-size: 74.94px;
    font-weight: 700;
  }

  h3 {
    font-size: 46.03px;
    font-weight: 700;
  }

  p {
    font-size: 28.27px;
    font-weight: 400;
  }

  .gradient-bg {
    background: linear-gradient(90deg, var(--gradient-start), var(--gradient-middle), var(--gradient-end));
  }

  /* Override Telegram WebApp styles */
  .t-body {
    background-color: ${props => props.theme.colors.background || 'var(--primary-color)'} !important;
    color: ${props => props.theme.colors.text || 'var(--white)'} !important;
  }
`;

export default GlobalStyle;