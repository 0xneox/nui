import React from 'react';
import styled from 'styled-components';

const StyledQuestItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestItem = ({ children }) => {
  return <StyledQuestItem>{children}</StyledQuestItem>;
};

export default QuestItem;