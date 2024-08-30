import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Leaderboard from './Leaderboard';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import CheckIn from './CheckIn';
import Invite from './Invite';
import Achievement from './Achievement';
import Quest from './Quest';
import Settings from './Settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Home></Home> */}
    {/* <Leaderboard /> */}
    {/* <CheckIn /> */}
    {/* <Invite /> */}
    {/* <Achievement /> */}
    <Quest />
    {/* <Settings></Settings> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
