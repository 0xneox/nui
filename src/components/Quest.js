import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getQuests, claimQuest } from '../services/api';
import useApi from '../hooks/useApi';
import { FaChevronDown, FaLock } from 'react-icons/fa';

const [quests, setQuests] = useState([]);

const QuestWrapper = styled.div`
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

const QuestItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestInfo = styled.div`
  display: flex;
  align-items: center;
`;

const QuestIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #3d85c6;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestDetails = styled.div``;

const QuestTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const QuestDescription = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #888;
`;

const ClaimButton = styled.button`
  background-color: ${props => props.claimed ? '#888' : props.locked ? '#d32f2f' : '#00c853'};
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: ${props => props.claimed || props.locked ? 'default' : 'pointer'};
  display: flex;
  align-items: center;
`;

const Quest = () => {
  const [activeTab, setActiveTab] = useState('quest');
  const [quests, setQuests] = useState([]);
  const { execute: fetchQuests, loading: questsLoading, error: questsError } = useApi(getQuests);
  const { execute: executeClaim, loading: claimLoading } = useApi(claimQuest);

  useEffect(() => {
    fetchQuests().then(response => {
      if (Array.isArray(response)) {
        setQuests(response);
      } else {
        console.error('Unexpected response format for quests:', response);
        setQuests([]);
      }
    }).catch(error => {
      console.error('Error fetching quests:', error);
      setQuests([]);
    });
  }, [fetchQuests]);

  if (questsLoading) return <QuestWrapper>Loading quests...</QuestWrapper>;
  if (questsError) return <QuestWrapper>Error loading quests: {questsError.message}</QuestWrapper>;

  return (
    <QuestWrapper>
      <Header>
        <DropdownButton>
          Daily Quest <FaChevronDown />
        </DropdownButton>
        <XPEarned>350 XP earned</XPEarned>
      </Header>

      <TabContainer>
        <Tab active={activeTab === 'quest'} onClick={() => setActiveTab('quest')}>Quest</Tab>
        <Tab active={activeTab === 'achievement'} onClick={() => setActiveTab('achievement')}>Achievement</Tab>
      </TabContainer>

      {quests.map(quest => (
        <QuestItem key={quest.id}>
          <QuestInfo>
            <QuestIcon>📋</QuestIcon>
            <QuestDetails>
              <QuestTitle>{quest.title}</QuestTitle>
              <QuestDescription>{quest.description}</QuestDescription>
            </QuestDetails>
          </QuestInfo>
          <ClaimButton 
            onClick={() => handleClaim(quest.id)}
            disabled={claimLoading || quest.claimed || quest.locked}
            claimed={quest.claimed}
            locked={quest.locked}
          >
            {quest.claimed ? 'Claimed' : quest.locked ? <><FaLock /> Locked</> : 'Claim'}
          </ClaimButton>
        </QuestItem>
      ))}
    </QuestWrapper>
  );
};

export default Quest;