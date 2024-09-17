import React from 'react';
import styled from 'styled-components';

const StyledQuestIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #3d85c6;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestIcon = ({ children }) => {
  return <StyledQuestIcon>{children}</StyledQuestIcon>;
};

export default QuestIcon;