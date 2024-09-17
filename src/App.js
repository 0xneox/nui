import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import SplashScreen from './components/SplashScreen';

import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import CheckIn from './pages/CheckIn';
import Invite from './pages/Invite';
import Achievement from './pages/Achievement';
import Quest from './pages/Quest';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: #000033;
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  padding-bottom: 60px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 20px;
  font-size: 18px;
`;

function App() {
  const { loading, error, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onLoadingComplete={handleSplashComplete} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <AppWrapper>
      <ContentWrapper>
        <Routes>
          <Route path="/" element={user ? <Home /> : <CheckIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/achievement" element={<Achievement />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ContentWrapper>
      <ToastContainer position="bottom-right" />
    </AppWrapper>
  );
}

export default App;