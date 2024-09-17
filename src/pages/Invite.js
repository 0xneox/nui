import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaTwitter, FaTelegram, FaFacebook, FaWhatsapp, FaUsers, FaBolt, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import logoLeft from "../Images/logo.png";
import logoRight from "../Images/logo1.png";
import defaultAvatar from "../Images/sam.webp";
import backgroundImage from "../Images/background_image.png";
import useApi from '../hooks/useApi';

const FAQContent = lazy(() => import('../components/FAQContent'));

const InviteWrapper = styled(motion.div)`
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
  height: 30px;
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
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const ReferralLinkContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
`;

const ReferralLink = styled.input`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 16px;
  outline: none;
`;

const CopyButton = styled.button`
  background-color: #3d85c6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a5db0;
  }
`;

const ShareContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ShareButton = styled.button`
  background-color: ${props => props.color};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const EarningsContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
  width: 100%;
  text-align: center;
`;

const EarningsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const EarningsAmount = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: #4caf50;
`;

const ReferralInfo = styled.p`
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
  opacity: 0.8;
`;

const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ReferralRewardsContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
  width: 100%;
`;

const RewardLevel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const LevelLabel = styled.span`
  font-weight: bold;
`;

const RewardItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const LearnMoreButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const FriendsList = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
`;

const FriendItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const FriendName = styled.span`
  font-weight: bold;
`;

const FriendReward = styled.span`
  color: #4caf50;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #000033;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const shareButtonColors = {
  twitter: '#1DA1F2',
  telegram: '#0088cc',
  facebook: '#3b5998',
  whatsapp: '#25D366'
};

const shareIcons = {
  twitter: <FaTwitter />,
  telegram: <FaTelegram />,
  facebook: <FaFacebook />,
  whatsapp: <FaWhatsapp />
};

const Invite = () => {
  const [referralLink, setReferralLink] = useState('');
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [user, setUser] = useState({ name: '', avatar: defaultAvatar });
  const [referralRewards] = useState([
    { level: 'Primary', percentage: '10%' },
    { level: 'Secondary', percentage: '5%' },
    { level: 'Tertiary', percentage: '2.5%' },
  ]);
  const [friends, setFriends] = useState([]);
  const [referralCode, setReferralCode] = useState('');
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, referralData, friendsData] = await Promise.all([
          api.get('/api/user'),
          api.get('/api/referrals/stats'),
          api.get('/api/friends')
        ]);

        setUser(userData);
        setReferralEarnings(referralData.referralXP);
        setFriends(referralData.topReferrals);
        setReferralCode(referralData.referralCode);
        setReferralLink(`https://t.me/Neurolov?start=${referralData.referralCode}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [api]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [referralLink]);

  const handleShare = useCallback((platform) => {
    const shareTexts = {
      twitter: 'Join%20me%20on%20Neurolov%20Compute%20Bot!',
      telegram: 'Join%20me%20on%20Neurolov%20Compute%20Bot!',
      facebook: 'Join me on Neurolov Compute Bot!',
      whatsapp: 'Join me on Neurolov Compute Bot!'
    };
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${shareTexts.twitter}&url=${encodeURIComponent(referralLink)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareTexts.telegram}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTexts.whatsapp} ${referralLink}`)}`
    };
    if (shareUrls[platform]) window.open(shareUrls[platform], '_blank');
  }, [referralLink]);

  const toggleFriendsList = useCallback(() => setShowFriendsList(prev => !prev), []);

  return (
    <InviteWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <Logo src={logoLeft} alt="Neurolov Logo" />
        <RightLogo src={logoRight} alt="Neurolov Logo" />
      </Header>
      
      <ContentWrapper>
        <Title>Invite Friends</Title>
        <Subtitle>Share your referral link and earn rewards when your friends join!</Subtitle>

        <UserSection>
          <UserInfo>
            <Avatar src={user.avatar} alt="User Avatar" />
            <UserDetails>
              <UserName>{user.name}</UserName>
            </UserDetails>
          </UserInfo>
          <ButtonGroup>
            <Button onClick={() => window.open('https://t.me/neurolov9', '_blank')}>Join Channel</Button>
            <Button><FaUsers /> {friends.length}</Button>
          </ButtonGroup>
        </UserSection>

        <ReferralLinkContainer>
          <ReferralLink value={referralLink} readOnly />
          <CopyButton onClick={handleCopy}>
            <FaCopy style={{ marginRight: '5px' }} />
            {copied ? 'Copied!' : 'Copy Link'}
          </CopyButton>
        </ReferralLinkContainer>

        <ShareContainer>
          {Object.entries(shareButtonColors).map(([platform, color]) => (
            <ShareButton key={platform} color={color} onClick={() => handleShare(platform)}>
              {shareIcons[platform]}
            </ShareButton>
          ))}
        </ShareContainer>

        <Button onClick={toggleFriendsList} style={{ width: '100%', marginTop: '20px' }}>
          <FaUsers style={{ marginRight: '5px' }} /> Open Friends List ({friends.length})
        </Button>

        <AnimatePresence>
          {showFriendsList && (
            <FriendsList
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {friends.map((friend, index) => (
                <FriendItem key={index}>
                  <FriendName>{friend.name}</FriendName>
                  <FriendReward>{friend.reward} XP</FriendReward>
                </FriendItem>
              ))}
            </FriendsList>
          )}
        </AnimatePresence>

        <ReferralRewardsContainer>
          <Title>Referral Rewards</Title>
          {referralRewards.map((reward, index) => (
            <RewardLevel key={index}>
              <LevelLabel>{reward.level} Referrals</LevelLabel>
              <RewardItem>
                <FaBolt style={{ marginRight: '5px', color: 'yellow' }} />
                {reward.percentage} of earned XP
              </RewardItem>
            </RewardLevel>
          ))}
          <LearnMoreButton onClick={() => setShowFAQ(true)}>Learn more</LearnMoreButton>
        </ReferralRewardsContainer>

        <EarningsContainer>
          <EarningsTitle>Your Referral Earnings</EarningsTitle>
          <EarningsAmount>{referralEarnings} XP</EarningsAmount>
        </EarningsContainer>

        <ReferralInfo>
          <FaUsers style={{ marginRight: '5px' }} />
          Earn XP by inviting friends and through their earnings!
        </ReferralInfo>
      </ContentWrapper>
      
      <Navbar />

      <AnimatePresence>
        {showFAQ && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModalContent>
              <CloseButton onClick={() => setShowFAQ(false)}><FaTimes /></CloseButton>
              <Suspense fallback={<div>Loading...</div>}>
                <FAQContent />
              </Suspense>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </InviteWrapper>
  );
};

export default React.memo(Invite);