import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAchievements, claimAchievement } from '../services/api';
import useApi from '../hooks/useApi';
import { FaChevronDown } from 'react-icons/fa';

const [achievements, setAchievements] = useState([]);



// Define AchievementWrapper component
const AchievementWrapper = styled.div`
  padding: 20px;
  color: #ffffff;
  background-color: #0c0f2c;
  min-height: 100vh;
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

const TabContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 5px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: ${props => props.active ? '#3d85c6' : 'transparent'};
  color: white;
  border-radius: 20px;
  font-size: 16px;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const AchievementItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const Achievement = () => {
  const [activeTab, setActiveTab] = useState('achievement');
  const [achievements, setAchievements] = useState([]);
  const { execute: fetchAchievements, loading, error } = useApi(getAchievements);
  const { execute: executeClaim } = useApi(claimAchievement);

  useEffect(() => {
    const tg = window.Telegram?.WebApp || { initDataUnsafe: { user: { id: 1, username: "test_user" } } };
    if (tg.initDataUnsafe?.user) {
      fetchAchievements().then(setAchievements);
    } else {
      console.error("Telegram WebApp user context is missing");
    }
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
    <AchievementWrapper>
      <Header>
        <DropdownButton>
          7 Daily Quest <FaChevronDown />
        </DropdownButton>
        <XPEarned>350 XP earned</XPEarned>
      </Header>

      <TabContainer>
        <Tab active={activeTab === 'quest'} onClick={() => setActiveTab('quest')}>Quest</Tab>
        <Tab active={activeTab === 'achievement'} onClick={() => setActiveTab('achievement')}>Achievement</Tab>
      </TabContainer>

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
  );
};

export default Achievement;
