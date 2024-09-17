import React, { useState, useContext, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaVolumeMute, FaGlobe, FaMoon, FaSun, FaQuestionCircle, FaShieldAlt, FaFileContract, FaSignOutAlt, FaTrash, FaArrowLeft, FaTelegram, FaCamera, FaHive } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../components/Navbar';
import logoLeft from '../Images/logo.png';
import logoRight from '../Images/logo1.png';
import backgroundImage from "../Images/settings_bg.png";


// Mock user data
const mockUser = {
  name: "Sam A",
  avatar: "https://facts.net/wp-content/uploads/2023/06/Sam-Bankman-Fried.webp",
  xp: 150000,
  cpLevel: 5
};

// Theme context
const ThemeContext = React.createContext(null);

const lightTheme = {
  body: '#f0f0f0',
  text: '#333333',
  background: `url(${backgroundImage})`,
};

const darkTheme = {
  body: '#333333',
  text: '#f0f0f0',
  background: `linear-gradient(180deg, #000033 0%, #000066 100%), url(${backgroundImage})`,
};


const SettingsWrapper = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  color: ${props => props.theme.text};
  background: ${props => props.theme.background};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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
  padding: 100px 20px 70px;
  overflow-y: auto;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarUploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(61, 133, 198, 0.8);
  color: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarUploadInput = styled.input`
  display: none;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const UserStats = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
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
  background-color: ${props => props.isOn ? 'rgba(0, 200, 83, 0.8)' : 'rgba(204, 204, 204, 0.8)'};
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
  color: ${props => props.theme.text};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Button = styled(motion.button)`
  background: rgba(61, 133, 198, 0.8);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
  margin-top: 10px;
  font-size: 14px;
`;

const DangerButton = styled(Button)`
  background: rgba(211, 47, 47, 0.8);
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const Settings = () => {
  const [user, setUser] = useState({
    name: "Sam A",
    avatar: "https://facts.net/wp-content/uploads/2023/06/Sam-Bankman-Fried.webp",
    xp: 150000,
    cpLevel: 5
  });
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const fileInputRef = useRef(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleToggle = (setter) => () => setter(prev => !prev);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <SettingsWrapper
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
              <Avatar src={user.avatar} alt={user.name} />
              <AvatarUploadLabel htmlFor="avatar-upload">
                <FaCamera />
              </AvatarUploadLabel>
              <AvatarUploadInput
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                ref={fileInputRef}
              />
            </AvatarContainer>
            <UserInfo>
              <Username>{user.name}</Username>
              <UserStats>XP: {user.xp} | CP Level: {user.cpLevel}</UserStats>
            </UserInfo>
          </UserSection>

          <AnimatePresence>
            <SettingsSection>
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

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper><FaVolumeMute /></IconWrapper>
                  Sound
                </SettingsLabel>
                <Toggle isOn={soundEnabled} onClick={handleToggle(setSoundEnabled)}>
                  <Handle layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
                </Toggle>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper><FaHive /></IconWrapper>
                  Vibration
                </SettingsLabel>
                <Toggle isOn={vibrationEnabled} onClick={handleToggle(setVibrationEnabled)}>
                  <Handle layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
                </Toggle>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper><FaGlobe /></IconWrapper>
                  Language
                </SettingsLabel>
                <Select value={language} onChange={handleLanguageChange}>
                  <option value="English">English</option>
                  <option value="Russian">Русский</option>
                </Select>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper>{isDarkMode ? <FaMoon /> : <FaSun />}</IconWrapper>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </SettingsLabel>
                <Toggle isOn={isDarkMode} onClick={toggleTheme}>
                  <Handle layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
                </Toggle>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper><FaShieldAlt /></IconWrapper>
                  Privacy Policy
                </SettingsLabel>
                <Button onClick={() => setShowPrivacyPolicy(true)}>View</Button>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper><FaFileContract /></IconWrapper>
                  Terms of Service
                </SettingsLabel>
                <Button onClick={() => setShowTermsOfService(true)}>View</Button>
              </SettingsItem>
            </SettingsSection>

            <SettingsSection>
              <SettingsItem>
                <SettingsLabel>
                  <IconWrapper><FaTelegram /></IconWrapper>
                  Help 
                </SettingsLabel>
                <Button onClick={() => window.open('https://t.me/neurolov9', '_blank')}>
                  Join
                </Button>
              </SettingsItem>
            </SettingsSection>
          </AnimatePresence>

       

     
        </ContentWrapper>

        <Navbar />

        {showPrivacyPolicy && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrivacyPolicy(false)}
          >
            <ModalContent onClick={e => e.stopPropagation()}>
            <h3>Privacy Policy</h3>
            <h4>
                Last updated: 11-09-2024
            </h4>
            
            <h4>1. Introduction</h4>
            <h4>
                Welcome to NeuroLov Compute App ("we," "our," or "us"), a Telegram micro application developed by Orlov Innovations, Limited ("Company"), based in Dubai. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information when you use our tap-to-earn game cum application ("App") within the Telegram platform.
            </h4>
            
            <h4>2. Information We Collect</h4>
            
            <h4>2.1 Information Provided by Telegram</h4>
            <h4>
                We may receive certain information from Telegram when you use our App, including:
            </h4>
            <ul>
                <li>Your Telegram user ID</li>
                <li>Your username</li>
                <li>Your profile picture</li>
            </ul>
            
            <h4>2.2 Information You Provide</h4>
            <h4>
                We may collect information you provide directly through the App, such as:
            </h4>
            <ul>
                <li>Game progress and scores</li>
                <li>In-app purchase information</li>
                <li>Communication with our support team</li>
            </ul>
            
            <h4>2.3 Automatically Collected Information</h4>
            <h4>
                We may automatically collect certain information about your device and usage of the App, including:
            </h4>
            <ul>
                <li>Device type and operating system</li>
                <li>App usage statistics</li>
                <li>Error logs and crash reports</li>
            </ul>
            
            <h4>3. How We Use Your Information</h4>
            <h4>
                We use the collected information for the following purposes:
            </h4>
            <ul>
                <li>To provide and maintain our App</li>
                <li>To improve user experience and App functionality</li>
                <li>To process in-app transactions</li>
                <li>To communicate with you about the App</li>
                <li>To prevent fraud and ensure the security of our App</li>
                <li>To comply with legal obligations</li>
            </ul>
            
            <h4>4. Data Sharing and Disclosure</h4>
            <h4>
                We do not sell your personal information. We may share your information in the following circumstances:
            </h4>
            <ul>
                <li>With service providers who assist in App operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In the event of a merger, acquisition, or sale of assets</li>
            </ul>
            
            <h4>5. Data Security</h4>
            <h4>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </h4>
            
            <h4>6. Your Rights</h4>
            <h4>
                Depending on your location, you may have certain rights regarding your personal information, including:
            </h4>
            <ul>
                <li>Access to your data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
            </ul>
            <h4>
                To exercise these rights, please contact us using the information provided in Section 10.
            </h4>
            
            <h4>7. Children's Privacy</h4>
            <h4>
                Our App is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </h4>
            
            <h4>8. Changes to This Privacy Policy</h4>
            <h4>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </h4>
            
            <h4>9. Third-Party Links and Services</h4>
            <h4>
                Our App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you access through our App.
            </h4>
            
            <h4>10. Contact Us</h4>
            <h4>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </h4>
            <h4>
                Orlov Innovations, Limited
                Dubai, United Arab Emirates
                Email: support@neurolov.ai
            </h4>
            
            <h4>11. Consent</h4>
            <h4>
                By using NeuroLov Compute App, you consent to the collection and use of your information as described in this Privacy Policy.
            </h4>
              <Button onClick={() => setShowPrivacyPolicy(false)}>Close</Button>
            </ModalContent>
          </ModalOverlay>
        )}

        {showTermsOfService && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTermsOfService(false)}
          >
            <ModalContent onClick={e => e.stopPropagation()}>
            <h2>TOS</h2>
                
            <h4>Last Updated: 11-09-2024</h4>
            
            <h4>1. Acceptance of Terms</h4>
            
            <h4>Welcome to NeuroLov Compute App ("App"), a Telegram micro application developed by Orlov Innovations, Limited ("Company," "we," "us," or "our"), based in Dubai. By accessing or using our App, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.</h4>
            
            <h4>2. Changes to Terms</h4>
            
            <h4>We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the App after any changes constitutes your acceptance of the new Terms.</h4>
            
            <h4>3. Use of the App</h4>
            
            <h4>3.1. Eligibility: You must be at least 13 years old to use this App. By using the App, you represent and warrant that you meet this eligibility requirement.</h4>
            
            <h4>3.2. User Account: To use certain features of the App, you may need to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</h4>
            
            <h4>3.3. Prohibited Conduct: You agree not to:</h4>
            <ul>
                <li>Use the App for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Violate or encourage others to violate the rights of third parties, including intellectual property rights</li>
                <li>Attempt to gain unauthorized access to the App or its related systems or networks</li>
                <li>Use any automated means or interface not provided by us to access the App or extract data</li>
                <li>Engage in any conduct that restricts or inhibits any other user from using or enjoying the App</li>
            </ul>
            
            <h4>4. Intellectual Property</h4>
            
            <h4>The App and its original content, features, and functionality are owned by the Company and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</h4>
            
            <h4>5. User-Generated Content</h4>
            
            <h4>5.1. You retain ownership of any content you submit, post, or display on or through the App ("User Content").</h4>
            
            <h4>5.2. By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in connection with the App.</h4>
            
            <h4>6. Privacy</h4>
            
            <h4>Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference.</h4>
            
            <h4>7. Disclaimers</h4>
            
            <h4>7.1. The App is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties of any kind, whether express or implied.</h4>
            
            <h4>7.2. We do not warrant that the App will be uninterrupted, secure, or error-free.</h4>
            
            <h4>8. Limitation of Liability</h4>
            
            <h4>To the fullest extent permitted by applicable law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the App.</h4>
            
            <h4>9. Indemnification</h4>
            
            <h4>You agree to indemnify, defend, and hold harmless the Company and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of the App or your violation of these Terms.</h4>
            
            <h4>10. Governing Law</h4>
            
            <h4>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.</h4>
            
            <h4>11. Dispute Resolution</h4>
            
            <h4>Any dispute arising out of or relating to these Terms or the App shall be resolved through binding arbitration in Dubai, United Arab Emirates, in accordance with the rules of the Dubai International Arbitration Centre.</h4>
            
            <h4>12. Severability</h4>
            
            <h4>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.</h4>
            
            <h4>13. Entire Agreement</h4>
            
            <h4>These Terms constitute the entire agreement between you and the Company regarding the use of the App, superseding any prior agreements between you and the Company relating to your use of the App.</h4>
            
            <h4>14. Contact Us</h4>
            
            <h4>If you have any questions about these Terms, please contact us at:</h4>
            
            <h4>Orlov Innovations, Limited</h4>
            <h4>Dubai, United Arab Emirates</h4>
            <h4>Email: support@neurolov.ai </h4>
              <Button onClick={() => setShowTermsOfService(false)}>Close</Button>
            </ModalContent>
          </ModalOverlay>
        )}
      </SettingsWrapper>
    </ThemeProvider>
  );
};

export default Settings;