import React from 'react';
import styled from 'styled-components';

const StyledQuestInfo = styled.div`
  display: flex;
  align-items: center;
`;

const QuestInfo = ({ children }) => {
  return <StyledQuestInfo>{children}</StyledQuestInfo>;
};

export default QuestInfo;