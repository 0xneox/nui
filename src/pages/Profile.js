import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaLevelUpAlt, FaWallet, FaLock, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import defaultAvatar from "../Images/sam.webp";
import backgroundImage from "../Images/background_image.png";
import logoLeft from "../Images/logo.png";
import logoRight from "../Images/logo1.png";

const ProfileWrapper = styled(motion.div)`
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
  overflow: hidden;
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
  height: 30px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 80px 20px 70px;
  overflow-y: auto;
  margin-top: 60px;
`;

const UserSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  margin-bottom: 20px;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Avatar = styled(motion.img)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChangeAvatarButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UserDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Username = styled.h2`
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
`;

const UserID = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const Achievement = styled.span`
  font-size: 16px;
  color: #ffd700;
  margin-top: 5px;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
`;

const StatValue = styled.h3`
  margin: 0;
  font-size: 24px;
`;

const StatLabel = styled.p`
  margin: 5px 0 0;
  font-size: 12px;
  opacity: 0.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled(motion.button)`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ComingSoonModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [user, setUser] = useState({
    username: '',
    id: '',
    cpLevel: 0,
    avatar: defaultAvatar,
    xp: 0,
    nlov: 0,
    computePower: 0,
    totalQuests: 0,
    referrals: 0,
    friends: 0,
    achievement: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await axios.post('/api/user/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setUser(prevUser => ({ ...prevUser, avatar: response.data.avatarUrl }));
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await axios.post('/api/user/upgrade');
      setUser(prevUser => ({ ...prevUser, ...response.data }));
    } catch (error) {
      console.error('Error upgrading user:', error);
    }
  };

  const handleConnectWallet = useCallback(() => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  }, []);

  return (
    <ProfileWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <Logo src={logoLeft} alt="Left Logo" />
        <RightLogo src={logoRight} alt="Right Logo" />
      </Header>

      <ContentWrapper>
        <UserSection>
          <AvatarContainer>
            <Avatar src={user.avatar} alt={user.username} />
            <ChangeAvatarButton htmlFor="avatar-upload">
              <FaCamera />
            </ChangeAvatarButton>
            <HiddenFileInput
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </AvatarContainer>
          <UserDetails>
            <Username>{user.username}</Username>
            <UserID>ID: {user.id}</UserID>
            <Achievement>{user.achievement}</Achievement>
          </UserDetails>
        </UserSection>

        <StatsGrid>
          {[
            { value: user.cpLevel, label: 'CP Level' },
            { value: user.xp.toLocaleString(), label: 'XP' },
            { value: user.nlov.toLocaleString(), label: 'NLOV' },
            { value: user.computePower, label: 'Compute Power' },
            { value: user.totalQuests, label: 'Quests Completed' },
            { value: user.referrals, label: 'Referrals' },
            { value: user.friends, label: 'Friends' },
            { value: `${user.cpLevel}`, label: 'Current CP Level' },
          ].map((stat, index) => (
            <StatCard 
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <ButtonGroup>
          <Button onClick={handleUpgrade}>
            <FaLevelUpAlt style={{ marginRight: '10px' }} />
            Upgrade
          </Button>
          <Button onClick={() => navigate('/settings')}>
            <FaCog style={{ marginRight: '10px' }} />
            Settings
          </Button>
          <Button onClick={handleConnectWallet}>
            <FaWallet style={{ marginRight: '10px' }} />
            Wallet 
          </Button>
        </ButtonGroup>
      </ContentWrapper>

      <Navbar />

      <AnimatePresence>
        {showComingSoon && (
          <ComingSoonModal
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            Coming Soon!
          </ComingSoonModal>
        )}
      </AnimatePresence>
    </ProfileWrapper>
  );
};

export default Profile;