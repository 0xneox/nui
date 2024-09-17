import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import fanImage from '../Images/fan.svg';
import logoImage from '../Images/logo.png';
import successImage from '../Images/bird.png'; 
import customBackgroundImage from '../Images/background_image.png';

const CheckInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 20px;
`;

const ProfileCard = styled.div`
  background: linear-gradient(135deg, #ff00ff, #00ffff);
  border-radius: 15px;
  padding: 2px;
  margin-bottom: 20px;
`;

const ProfileCardInner = styled.div`
  background: #000033;
  border-radius: 13px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  overflow: hidden;
`;

const UserName = styled.h2`
  font-size: 20px;
  margin: 5px 0;
  color: #00ffff;
`;

const WelcomeText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #ff00ff;
`;

const PointsText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #ffffff;
`;

const FanContainer = styled(motion.div)`
  width: 150px;
  height: 150px;
  margin: 20px auto;
`;

const Fan = styled(motion.img)`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px #00ffff);
`;

const XPText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #00ffff;
  text-align: center;
  margin-bottom: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  transition: width 0.5s ease-in-out;
`;

const Timer = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ffff;
  margin-bottom: 20px;
`;

const DailyRewardsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;

const RewardTitle = styled.h3`
  font-size: 18px;
  color: #00ffff;
  margin-bottom: 10px;
`;

const RewardItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ClaimButton = styled(motion.button)`
  width: 100%;
  padding: 10px;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  border: none;
  border-radius: 20px;
  color: #0a0e1f;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;

const SuccessOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 14, 31, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SuccessContent = styled.div`
  text-align: center;
`;

const SuccessImage = styled.img`
  margin-bottom: 20px;
`;

const SuccessText = styled.h2`
  font-size: 24px;
  color: #00ffff;
  margin-bottom: 10px;
`;

const XPGained = styled.p`
  font-size: 36px;
  color: #ff00ff;
  font-weight: bold;
`;

function CheckIn() {
  const [claimed, setClaimed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [nextRewardTime, setNextRewardTime] = useState(24 * 60 * 60);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const fanRef = useRef(null);
  const api = useApi();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setNextRewardTime(prevTime => Math.max(prevTime - 1, 0));
      setProgress(prevProgress => Math.min(prevProgress + (100 / (24 * 60 * 60)), 100));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = async () => {
    if (claimed) return;

    try {
      const response = await api.post('/api/users/claim-daily-xp');
      setClaimed(true);
      setShowConfetti(true);
      updateUser({ ...user, xp: user.xp + response.xpGained });

      if (fanRef.current) {
        fanRef.current.animate([
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(720deg)' }
        ], {
          duration: 1000,
          easing: 'ease-out'
        });
      }

      setTimeout(() => {
        setShowSuccessMessage(true);
        setShowConfetti(false);
      }, 1500);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/home', { state: { animate: true } });
      }, 4500);
    } catch (err) {
      console.error('Error claiming daily XP:', err);
      setError('Failed to claim reward. Please try again later.');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <CheckInWrapper backgroundImage={customBackgroundImage}>
      <Header>
        <Logo src={logoImage} alt="Neurolov" />
      </Header>
      <ProfileCard>
        <ProfileCardInner>
          <AvatarCircle>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.username.charAt(0)
            )}
          </AvatarCircle>
          <UserName>{user.username}</UserName>
          <WelcomeText>Welcome to Compute App</WelcomeText>
          <PointsText>You have {user.xp} XP</PointsText>
        </ProfileCardInner>
      </ProfileCard>
      <FanContainer
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Fan src={fanImage} alt="Fan" ref={fanRef} />
      </FanContainer>
      <XPText>{user.xp}</XPText>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
      <Timer>
        <FaClock style={{ marginRight: '5px' }} />
        Next Reward: {formatTime(nextRewardTime)}
      </Timer>
      <DailyRewardsSection>
        <RewardTitle>Daily Reward</RewardTitle>
        <RewardItem>
          <span>XP Boost:</span>
          <span>500 XP</span>
        </RewardItem>
        <RewardItem>
          <span>Achievement Progress:</span>
          <span>+25%</span>
        </RewardItem>
        <ClaimButton
          onClick={handleClaim}
          disabled={claimed}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {claimed ? 'Claimed' : 'Claim Reward'}
        </ClaimButton>
      </DailyRewardsSection>
      {showConfetti && <Confetti />}
      <AnimatePresence>
        {showSuccessMessage && (
          <SuccessOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessContent>
              <SuccessImage src={successImage} alt="Success" />
              <SuccessText>Claim Successful!</SuccessText>
              <XPGained>500 XP</XPGained>
            </SuccessContent>
          </SuccessOverlay>
        )}
      </AnimatePresence>
    </CheckInWrapper>
  );
}

export default CheckIn;