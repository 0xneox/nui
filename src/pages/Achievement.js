import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { getAchievements, claimAchievement } from '../services/api';
import useApi from '../hooks/useApi';
import { FaChevronDown, FaGem, FaTrophy } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import styled, { keyframes, css } from 'styled-components';


const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px #ffd700; }
  50% { box-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700; }
  100% { box-shadow: 0 0 5px #ffd700; }
`;

const AchievementWrapper = styled.div`
  padding: 20px;
  color: #ffffff;
  background-color: #000033;
  min-height: 100vh;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const XPEarned = styled.div`
  background-color: #3d85c6;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
`;

const CoinImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: gold;
  border-radius: 50%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  animation: ${glow} 2s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TimerWrapper = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin: 20px 0;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 5px;
  margin: 20px 0;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: ${props => props.active ? '#3d85c6' : 'transparent'};
  color: white;
  border-radius: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  overflow-y: auto;
  padding-right: 10px;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3d85c6;
    border-radius: 10px;
  }
`;

const AchievementItem = styled.div`
  background-color: rgba(61, 133, 198, 0.1);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(61, 133, 198, 0.3);
  }
`;

const AchievementXP = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const AchievementProgress = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
`;

const CollectButton = styled.button`
  background-color: #00c853;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #00e676;
    transform: scale(1.05);
  }

  ${props => props.disabled && css`
    background-color: #888;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  `}
`;

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const { execute: fetchAchievements, loading, error } = useApi(getAchievements);
  const { execute: executeClaim } = useApi(claimAchievement);

  useEffect(() => {
    fetchAchievements().then(setAchievements);
  }, [fetchAchievements]);

  const handleClaim = async (achievementId) => {
    try {
      await executeClaim(achievementId);
      const updatedAchievements = await fetchAchievements();
      setAchievements(updatedAchievements);
    } catch (error) {
      console.error('Failed to claim achievement:', error);
    }
  };

  if (loading) return <AchievementWrapper>Loading achievements...</AchievementWrapper>;
  if (error) return <AchievementWrapper>Error loading achievements: {error.message}</AchievementWrapper>;

  return (
    <>
      <AchievementWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header>
          <DropdownButton>
            7 Daily Quest <FaChevronDown />
          </DropdownButton>
          <XPEarned>350 XP earned</XPEarned>
        </Header>

       
        <AchievementGrid>
          {achievements.map(achievement => (
            <AchievementItem key={achievement.id}>
              <AchievementXP>{achievement.xpReward}XP</AchievementXP>
              <AchievementProgress>{achievement.progress}/{achievement.required}</AchievementProgress>
              <CollectButton 
                onClick={() => handleClaim(achievement.id)}
                disabled={achievement.claimed || achievement.progress < achievement.required}
              >
                Collect
              </CollectButton>
            </AchievementItem>
          ))}
        </AchievementGrid>
      </AchievementWrapper>
      <Navbar />
    </>
  );
};

export default Achievement;