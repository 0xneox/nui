import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaLock, FaGem, FaTrophy, FaTwitter, FaDiscord, FaTelegram, FaCheckCircle, FaMedium, FaReddit, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import logoLeft from "../Images/logo.png";
import logoRight from "../Images/logo1.png";
import backgroundImage from "../Images/background_image.png";
import useApi from '../hooks/useApi'; // Assume we have this custom hook for API calls

const QuestWrapper = styled.div`
  padding: 20px;
  color: #ffffff;
  background-color: #000033;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 20px;
  width: auto;
`;

const RightLogo = styled(Logo)`
  height: 30px; // Increased size for the right logo
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const SubHeader = styled.div`
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
  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const ItemWrapper = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #3d85c6;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;


const ItemDescription = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #bbb;
`;


const ClaimFeedback = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 255, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
  z-index: 1000;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const XPBadge = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 10px;
`;

const QuestTitle = styled.span`
  flex: 1;
`;

const ActionButton = styled.button`
  background-color: ${props => props.claimed ? '#888' : props.locked ? '#d32f2f' : '#00c853'};
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 12px;
  cursor: ${props => props.claimed || props.locked ? 'default' : 'pointer'};
  transition: background-color 0.3s ease, transform 0.3s ease;
  min-width: 80px;
  text-align: center;

  &:hover {
    transform: ${props => !props.claimed && !props.locked ? 'scale(1.05)' : 'none'};
  }
`;

// Mock data (maintained from the original code)
const achievementLevels = [
  "Novice", "Quest Seeker", "Architect", "Rising Star", "Elite Explorer", "Supreme Strategist"
];

const Quest = () => {
  const [activeTab, setActiveTab] = useState('quest');
  const [questList, setQuestList] = useState([]);
  const [achievementList, setAchievementList] = useState([]);
  const [showClaimFeedback, setShowClaimFeedback] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questsData, achievementsData] = await Promise.all([
          api.get('/api/quests'),
          api.get('/api/achievements')
        ]);
        setQuestList(questsData);
        setAchievementList(achievementsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [api]);

  const handleQuestClaim = useCallback(async (questId) => {
    try {
      const response = await api.post(`/api/quests/${questId}/claim`);
      setQuestList(prevQuests => prevQuests.map(quest => 
        quest.id === questId ? { ...quest, claimed: true } : quest
      ));
      setTotalXP(prevXP => prevXP + response.xpGained);
      setShowClaimFeedback(true);
      setTimeout(() => setShowClaimFeedback(false), 2000);
    } catch (error) {
      console.error('Error claiming quest:', error);
    }
  }, [api]);

  const handleAchievementClaim = useCallback(async (achievementId) => {
    try {
      const response = await api.post(`/api/achievements/${achievementId}/claim`);
      setAchievementList(prevAchievements => prevAchievements.map(achievement => 
        achievement.id === achievementId ? { ...achievement, claimed: true } : achievement
      ));
      setTotalXP(prevXP => prevXP + response.xpGained);
      setShowClaimFeedback(true);
      setTimeout(() => setShowClaimFeedback(false), 2000);
    } catch (error) {
      console.error('Error claiming achievement:', error);
    }
  }, [api]);

  const renderQuests = () => (
    questList.map(quest => (
      <ItemWrapper key={quest.id} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
        <ItemInfo>
          <ItemIcon>{quest.icon}</ItemIcon>
          <ItemDetails>
            <ItemTitle>
              <XPBadge>{quest.xp} XP</XPBadge>
              <QuestTitle>{quest.title}</QuestTitle>
            </ItemTitle>
            <ItemDescription>{quest.description}</ItemDescription>
          </ItemDetails>
        </ItemInfo>
        <ActionButton
          claimed={quest.claimed}
          locked={quest.locked}
          onClick={() => !quest.claimed && !quest.locked && handleQuestClaim(quest.id)}
        >
          {quest.claimed ? 'Claimed' : quest.locked ? 'Locked' : 'Claim'}
        </ActionButton>
      </ItemWrapper>
    ))
  );

  const renderAchievements = () => (
    achievementList.map(achievement => (
      <ItemWrapper key={achievement.id} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
        <ItemInfo>
          <ItemIcon>{achievement.icon}</ItemIcon>
          <ItemDetails>
            <ItemTitle>
              <XPBadge>{achievement.level}</XPBadge>
              <QuestTitle>{achievement.title}</QuestTitle>
            </ItemTitle>
            <ItemDescription>{achievement.description}</ItemDescription>
          </ItemDetails>
        </ItemInfo>
        <ActionButton
          claimed={achievement.claimed}
          onClick={() => !achievement.claimed && handleAchievementClaim(achievement.id)}
        >
          {achievement.claimed ? 'Claimed' : `${achievement.progress}/${achievement.required}`}
        </ActionButton>
      </ItemWrapper>
    ))
  );

  return (
    <QuestWrapper>
      <Header>
        <Logo src={logoLeft} alt="Logo" />
        <RightLogo src={logoRight} alt="Logo" />
      </Header>

      <ContentWrapper>
        <SubHeader>
          <DropdownButton>
            Current Quest
            <FaChevronDown style={{marginLeft: '5px'}} />
          </DropdownButton>
          <XPEarned>XP Earned: {totalXP}</XPEarned>
        </SubHeader>

        <TabContainer>
          <Tab active={activeTab === 'quest'} onClick={() => setActiveTab('quest')}>
            <FaGem style={{marginRight: '5px'}} /> Quests
          </Tab>
          <Tab active={activeTab === 'achievement'} onClick={() => setActiveTab('achievement')}>
            <FaTrophy style={{marginRight: '5px'}} /> Achievements
          </Tab>
        </TabContainer>

        <Content>
          <AnimatePresence>
            {activeTab === 'quest' ? renderQuests() : renderAchievements()}
          </AnimatePresence>
        </Content>
      </ContentWrapper>

      <AnimatePresence>
        {showClaimFeedback && (
          <ClaimFeedback
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {activeTab === 'quest' ? 'Quest claimed successfully!' : 'Achievement unlocked!'}
          </ClaimFeedback>
        )}
      </AnimatePresence>

      <Navbar />
    </QuestWrapper>
  );
};

export default React.memo(Quest);