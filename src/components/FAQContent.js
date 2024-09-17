import React from 'react';
import styled from 'styled-components';

const FAQWrapper = styled.div`
  color: white;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FAQContent = () => (
  <FAQWrapper>
    <p>Referral System FAQ</p>
    <p>How does the referral system work?</p>
    <h4>Our referral system rewards you for bringing new users to the platform. It works on three levels:</h4>
    <ul>
      <li>Primary Referrals: You get 10% of the XP earned by users you directly invite.</li>
      <li>Secondary Referrals: You get 5% of the XP earned by users invited by your primary referrals.</li>
      <li>Tertiary Referrals: You get 2.5% of the XP earned by users invited by your secondary referrals.</li>
    </ul>
    <p>Is there a limit to how much I can earn?</p>
    <h4>There's no cap on your earnings! The more active your referral network, the more you can earn.</h4>
    <h4>How often are referral rewards calculated?</h4>
    <h4>Referral rewards are calculated and distributed in real-time as your referrals earn XP.</h4>
    <p>Can I track my referrals' progress?</p>
    <h4>Yes, you can view your referrals and their earnings in the Friends List section.</h4>
  </FAQWrapper>
);

export default FAQContent;