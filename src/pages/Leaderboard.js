import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaTrophy, FaUserFriends, FaGlobe, FaQuestionCircle, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import trophyIcon from '../Images/trophy.png';
import backgroundImage from "../Images/background_image.png";
import logoLeft from "../Images/logo.png";
import logoRight from "../Images/logo1.png";
import defaultAvatar from "../Images/sam.webp";
import useApi from '../hooks/useApi'; // Assume we have this custom hook for API calls

const LeaderboardWrapper = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  color: #ffffff;
  background-color: #000033;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
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
  align-items: center;
  padding: 80px 20px 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const TrophyIcon = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
`;

const Timer = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#3d85c6' : 'transparent'};
  color: white;
  border: 1px solid #3d85c6;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#3d85c6' : 'rgba(61, 133, 198, 0.2)'};
  }
`;

const LeaderboardTypeContainer = styled(FilterContainer)`
  margin-bottom: 10px;
`;

const TopThree = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  width: 100%;
`;

const TopUser = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${props => props.borderColor};
`;

const Username = styled.span`
  font-size: 12px;
  margin-top: 5px;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableCell = styled.td`
  padding: 8px 5px;
  font-size: 14px;
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CTAButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #45a049;
  }

  svg {
    margin-right: 8px;
  }
`;

const Leaderboard = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [timeFilter, setTimeFilter] = useState('daily');
  const [leaderboardType, setLeaderboardType] = useState('global');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  const api = useApi();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 24 * 60 * 60);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await api.get(`/api/leaderboard/${timeFilter}?type=${leaderboardType}`);
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    const fetchUserPosition = async () => {
      try {
        const response = await api.get(`/api/leaderboard/position/${timeFilter}`);
        setUserPosition(response.data.position);
      } catch (error) {
        console.error('Error fetching user position:', error);
      }
    };

    fetchLeaderboardData();
    fetchUserPosition();
  }, [api, timeFilter, leaderboardType]);

  const formatTime = useCallback((time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return (
    <LeaderboardWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <Logo src={logoLeft} alt="Neurolov Logo" />
        <RightLogo src={logoRight} alt="Neurolov Logo" />
      </Header>
      
      <ContentWrapper>
        <Title>Wall of Fame</Title>
        <Subtitle>Play daily and win rewards!</Subtitle>
        <TrophyIcon src={trophyIcon} alt="Trophy" />
        <Timer>Resets in: {formatTime(timeLeft)}</Timer>
        
        <LeaderboardTypeContainer>
          <FilterButton 
            active={leaderboardType === 'global'}
            onClick={() => setLeaderboardType('global')}
          >
            <FaGlobe /> Global
          </FilterButton>
          <FilterButton 
            active={leaderboardType === 'friends'}
            onClick={() => setLeaderboardType('friends')}
          >
            <FaUserFriends /> Friends
          </FilterButton>
        </LeaderboardTypeContainer>

        <FilterContainer>
          <FilterButton active={timeFilter === 'daily'} onClick={() => setTimeFilter('daily')}>Daily</FilterButton>
          <FilterButton active={timeFilter === 'weekly'} onClick={() => setTimeFilter('weekly')}>Weekly</FilterButton>
          <FilterButton active={timeFilter === 'allTime'} onClick={() => setTimeFilter('allTime')}>All Time</FilterButton>
        </FilterContainer>
        
        <TopThree>
          {leaderboardData.slice(0, 3).map((user, index) => (
            <TopUser key={user._id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.2 }}>
              <UserAvatar src={user.avatar || defaultAvatar} alt={user.username} borderColor={['gold', 'silver', '#cd7f32'][index]} />
              <Username>{user.username}</Username>
              <div>{user.rewards} XP</div>
            </TopUser>
          ))}
        </TopThree>
        
        <LeaderboardTable>
          <AnimatePresence>
            {leaderboardData.slice(3).map((user, index) => (
              <TableRow
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <TableCell>{index + 4}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.rewards.toLocaleString()} XP</TableCell>
              </TableRow>
            ))}
          </AnimatePresence>
        </LeaderboardTable>

        {userPosition && (
          <div>Your Position: {userPosition}</div>
        )}

        <CTAContainer>
          <CTAButton onClick={() => navigate('/quest')}>
            <FaQuestionCircle /> Complete a Quest
          </CTAButton>
          <CTAButton onClick={() => navigate('/achievements', { state: { highlight: '7dayStreak' } })}>
            <FaCalendarCheck /> Maintain 7-Day Streak
          </CTAButton>
        </CTAContainer>
      </ContentWrapper>
      
      <Navbar />
    </LeaderboardWrapper>
  );
};

export default React.memo(Leaderboard);