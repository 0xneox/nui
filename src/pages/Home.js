import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaCog, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import { triggerHapticFeedback } from '../utils/haptics';
import Navbar from '../components/Navbar';
import fanImage from "../Images/fan_2.svg";
import fanImage2 from "../Images/fan_3.svg";
import breathingLight from "../Images/breath_1.svg";
import logoLeft from "../Images/logo.png";
import logoRight from "../Images/logo1.png";
import backgroundImage from "../Images/background_image.png";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
`;

const breatheAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.03); opacity: 0.5; }
`;

const popAnimation = keyframes`
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  position: relative;
  touch-action: manipulation;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: ${props => props.isVisible ? 0.5 : 0};
  transition: opacity 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 3;
`;

const Logo = styled.img`
  height: 20px;
  width: auto;
`;

const RightLogo = styled(Logo)`
  height: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  z-index: 2;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const StatsDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 2;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #00ffff;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #ffffff;
`;

const FanContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

const Fan = styled(motion.img)`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const BreathingLight = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;

  transform: translate(-50%, -50%);
  animation: ${breatheAnimation} 4s infinite ease-in-out;
  opacity: ${props => Math.min(0.3 + props.intensity * 0.7, 1)};
  filter: hue-rotate(${props => props.hue}deg) saturate(${props => 100 + props.intensity * 100}%);
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 20px;
  z-index: 5;
`;

const ControlButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const XPPopup = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  color: #00ffff;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
  animation: ${popAnimation} 1s forwards;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(to right, #8B5CF6, #EC4899);
  transition: width 0.3s ease-out;
`;

const TapCount = styled.div`
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  margin-top: 5px;
`;

const InfoButton = styled(ControlButton)`
  position: absolute;
  bottom: 70px;
  right: 20px;
  z-index: 5;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;


function Home() {
  const { user, updateUser } = useAuth();
  const [fanSpeed, setFanSpeed] = useState(0);
  const [isCooling, setIsCooling] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [rpm, setRPM] = useState(0);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [boostCount, setBoostCount] = useState(1);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [xpPopups, setXpPopups] = useState([]);
  const fanRef = useRef(null);
  const lastTapTime = useRef(Date.now());
  const coolingTimeoutRef = useRef(null);
  const popupIdRef = useRef(0);
  const navigate = useNavigate();
  const api = useApi();

  const handleTap = useCallback(async (e) => {
    e.preventDefault();
    if (isCooling) return;

    const now = Date.now();
    lastTapTime.current = now;

    try {
      const response = await api.post('/tap');
      const { compute, totalTaps, computePower, cooldownEndTime } = response.user;

      updateUser({ compute, totalTaps, computePower });

      setTapCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount >= 500) {
          startCooling();
        }
        return newCount;
      });

      setFanSpeed(prevSpeed => Math.min(prevSpeed + 2, 100));
      setRPM(prevRPM => Math.min(prevRPM + 200, 100000));
      setIsBackgroundVisible(true);

      // XP popup logic
      const xpGain = computePower;
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 20;
      const top = 50 + Math.sin(angle) * radius;
      const left = 50 + Math.cos(angle) * radius;
      const newPopupId = popupIdRef.current++;
      setXpPopups(prev => [...prev, { id: newPopupId, top, left, xp: xpGain }]);

      setTimeout(() => {
        setXpPopups(prev => prev.filter(popup => popup.id !== newPopupId));
      }, 1000);

      triggerHapticFeedback('tap');

      if (cooldownEndTime) {
        setIsCooling(true);
        const cooldownTime = new Date(cooldownEndTime) - now;
        coolingTimeoutRef.current = setTimeout(() => {
          setIsCooling(false);
        }, cooldownTime);
      }
    } catch (error) {
      console.error('Error during tap:', error);
    }
  }, [isCooling, api, updateUser]);

  const startCooling = useCallback(() => {
    setIsCooling(true);
    setTapCount(0);
    setFanSpeed(0);
    setRPM(0);
    setIsBackgroundVisible(false);

    coolingTimeoutRef.current = setTimeout(() => {
      setIsCooling(false);
    }, 5000);
  }, []);

  const handleBoost = useCallback(async () => {
    if (!isCooling && !isBoostActive && rpm >= 50000) {
      try {
        const response = await api.post('/boost');
        setIsBoostActive(true);
        setFanSpeed(100);
        setRPM(100000);
        setTapCount(prevCount => prevCount + 100);
        setTimeout(() => {
          setIsBoostActive(false);
          setFanSpeed(prevSpeed => Math.max(prevSpeed - 50, 0));
          setRPM(prevRPM => Math.max(prevRPM - 50000, 0));
        }, 3000);
    
        setBoostCount(prevCount => {
          const fibSeries = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
          return fibSeries[Math.min(prevCount + 1, fibSeries.length - 1)];
        });

        updateUser(response.user);
      } catch (error) {
        console.error('Error during boost:', error);
      }
    }
  }, [isCooling, isBoostActive, rpm, api, updateUser]);

  const handleUpgrade = useCallback(async () => {
    try {
      const response = await api.post('/upgrade');
      updateUser(response.user);
    } catch (error) {
      console.error('Error during upgrade:', error);
    }
  }, [api, updateUser]);

  useEffect(() => {
    return () => {
      if (coolingTimeoutRef.current) {
        clearTimeout(coolingTimeoutRef.current);
      }
    };
  }, []);
  
  const getFanImage = useCallback((xp) => {
    return xp >= 25000 ? fanImage2 : fanImage;
  }, []);

  const getFanColor = useCallback((xp) => {
    if (xp >= 10000 && xp < 25000) {
      return `hue-rotate(${90 + ((xp - 10000) / 15000) * 270}deg)`;
    } else if (xp >= 25000) {
      return 'hue-rotate(360deg)';
    }
    return 'none';
  }, []);

  return (
    <>
      <GlobalStyle />
      <HomeWrapper>
        <Header>
          <Logo src={logoLeft} alt="Left Logo" />
          <RightLogo src={logoRight} alt="Right Logo" />
        </Header>

        <UserInfo>
          <UserName>{user.name}</UserName>
          <div>CP: {user.cpLevel}</div>
        </UserInfo>

        <StatsDisplay>
          <StatItem>
            <StatValue>{user.xp}</StatValue>
            <StatLabel>XP</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{Math.round(rpm)}</StatValue>
            <StatLabel>RPM</StatLabel>
          </StatItem>
        </StatsDisplay>

        <FanContainer onTouchStart={handleTap} onClick={handleTap}>
          <BreathingLight 
            src={breathingLight}
            alt="Breathing Light"
            intensity={isCooling ? 1 : tapCount / 500}
            hue={isCooling ? 0 : 180 - (tapCount / 500) * 180}
          />
          <Fan
            ref={fanRef}
            src={getFanImage(user.xp)}
            alt="Fan"
            animate={{ rotate: fanSpeed > 0 ? 360 : 0 }}
            transition={{
              duration: fanSpeed > 0 ? Math.max(0.1, 1 - fanSpeed / 100) : 0,
              ease: "linear",
              repeat: fanSpeed > 0 ? Infinity : 0,
            }}
            style={{ filter: getFanColor(user.xp) }}
          />
          {xpPopups.map(popup => (
            <XPPopup key={popup.id} top={popup.top} left={popup.left}>+{popup.xp}</XPPopup>
          ))}
        </FanContainer>

        <ProgressBarContainer>
          <ProgressBar>
            <Progress progress={(500 - tapCount) / 5} />
          </ProgressBar>
          <TapCount>
            <FaBolt /> {500 - tapCount} Taps Remaining
          </TapCount>
        </ProgressBarContainer>

        <ControlsContainer>
          <ControlButton
            onClick={handleBoost}
            disabled={isCooling || isBoostActive || rpm < 50000}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBolt /> Boost ({boostCount})
          </ControlButton>
          <ControlButton
            onClick={handleUpgrade}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCog /> Upgrade
          </ControlButton>
        </ControlsContainer>

        <InfoButton
          onClick={() => setShowInfoModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInfoCircle />
        </InfoButton>

        <AnimatePresence>
          {showInfoModal && (
            <Modal
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3>How to Play</h3>
              <ul>
                <li>Tap the fan to spin it and earn XP!</li>
                <li>Each tap increases the fan's RPM and your XP.</li>
                <li>You can tap continuously for up to 500 taps.</li>
                <li>After reaching 500 taps, there's a 5-second cooling period.</li>
                <li>The fan will slow down if you don't tap for 0.5 seconds.</li>
                <li>Reach new CP levels by earning XP.</li>
                <li>The fan color changes at 10,000 XP and upgrades at 25,000 XP.</li>
                <li>Use the Boost button when RPM reaches 50k for a temporary speed increase to 100k RPM.</li>
                <li>Boost count increases according to the Fibonacci series, giving more XP each time.</li>
              </ul>
              <CloseButton onClick={() => setShowInfoModal(false)}>×</CloseButton>
            </Modal>
          )}
        </AnimatePresence>

        <Navbar />
      </HomeWrapper>
    </>
  );
}

export default React.memo(Home);