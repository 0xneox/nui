import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import introVideo from '../videos/welcome.mp4';
import discordIcon from '../Images/discord.svg';
import telegramIcon from '../Images/telegram.svg';
import twitterIcon from '../Images/twitter.svg';

const SplashWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #000033;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-bottom: 20px;
`;

const MoreInfo = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const LoadingBar = styled(motion.div)`
  width: 200px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 20px;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background-color: #00ffff;
`;

const SocialButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialButton = styled.a`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 40px;
    height: 40px;
  }
`;

const SplashScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 75) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500); // Delay to allow exit animation
          return 75;
        }
        return oldProgress + 1;
      });
    }, 75);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <SplashWrapper
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VideoBackground autoPlay loop muted playsInline>
        <source src={introVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <ContentWrapper>
        <InfoGroup>
          <MoreInfo>More info in official channels</MoreInfo>
          <LoadingBar>
            <LoadingProgress
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </LoadingBar>
        </InfoGroup>
        <SocialButtonsWrapper>
          <SocialButton href="https://discord.gg/GZdDfWMuvu" target="_blank" rel="noopener noreferrer">
            <img src={discordIcon} alt="Discord" />
          </SocialButton>
          <SocialButton href="https://t.me/neurolov9" target="_blank" rel="noopener noreferrer">
            <img src={telegramIcon} alt="Telegram" />
          </SocialButton>
          <SocialButton href="https://twitter.com/neurolov" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </SocialButton>
        </SocialButtonsWrapper>
      </ContentWrapper>
    </SplashWrapper>
  );
};

export default SplashScreen;