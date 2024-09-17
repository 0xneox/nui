import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { updateSettings } from '../services/api';
import useApi from '../hooks/useApi';
import Navbar from './Navbar';
import { FaBell, FaVolumeMute, FaGlobe, FaEye, FaQuestionCircle, FaShieldAlt, FaFileContract, FaSignOutAlt, FaTrash } from 'react-icons/fa';

const SettingsWrapper = styled(motion.div)`
  padding: 20px;
  color: #ffffff;
  background: linear-gradient(180deg, #000033 0%, #000066 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Level = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  opacity: 0.8;
`;

const SettingsSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
`;

const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const SettingsLabel = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const Toggle = styled(motion.div)`
  width: 50px;
  height: 24px;
  background-color: ${props => props.isOn ? '#00c853' : '#ccc'};
  display: flex;
  justify-content: ${props => props.isOn ? 'flex-end' : 'flex-start'};
  border-radius: 50px;
  padding: 2px;
  cursor: pointer;
`;

const Handle = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Button = styled(motion.button)`
  background: ${props => props.danger ? '#d32f2f' : '#3d85c6'};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
`;

const Settings = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [soundAndVibration, setSoundAndVibration] = useState(true);
  const [language, setLanguage] = useState('English');
  const [profileVisibility, setProfileVisibility] = useState(true);

  const { execute: executeUpdate, loading, error } = useApi(updateSettings);

  const handleToggle = (setter) => () => setter(prev => !prev);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleLogout = () => {
    logout();
    // Redirect to login page or perform other logout actions
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
  };

  return (
    <SettingsWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <Avatar src={user?.avatar} alt={user?.username} />
        <UserInfo>
          <Username>{user?.username}</Username>
          <Level>Level: {user?.level}</Level>
        </UserInfo>
      </Header>

      <AnimatePresence>
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaBell /></IconWrapper>
              Alert Notifications
            </SettingsLabel>
            <Toggle isOn={notifications} onClick={handleToggle(setNotifications)}>
              <Handle layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
            </Toggle>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaVolumeMute /></IconWrapper>
              Sound & Vibration
            </SettingsLabel>
            <Toggle isOn={soundAndVibration} onClick={handleToggle(setSoundAndVibration)}>
              <Handle layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
            </Toggle>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaGlobe /></IconWrapper>
              Change Language
            </SettingsLabel>
            <Select value={language} onChange={handleLanguageChange}>
              <option value="English">English</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
            </Select>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaEye /></IconWrapper>
              Profile Visibility and Data Sharing
            </SettingsLabel>
            <Toggle isOn={profileVisibility} onClick={handleToggle(setProfileVisibility)}>
              <Handle layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
            </Toggle>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaQuestionCircle /></IconWrapper>
              Frequently Asked Questions
            </SettingsLabel>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaShieldAlt /></IconWrapper>
              Privacy Policy
            </SettingsLabel>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <SettingsItem>
            <SettingsLabel>
              <IconWrapper><FaFileContract /></IconWrapper>
              Terms of Service
            </SettingsLabel>
          </SettingsItem>
        </SettingsSection>

        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          <IconWrapper><FaSignOutAlt /></IconWrapper>
          Logout Account
        </Button>

        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDeleteAccount}
          danger
        >
          <IconWrapper><FaTrash /></IconWrapper>
          Delete Account
        </Button>
      </AnimatePresence>

      <Navbar />
    </SettingsWrapper>
  );
};

export default Settings;