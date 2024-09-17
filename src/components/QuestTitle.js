import React from 'react';
import styled from 'styled-components';

const StyledQuestTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const QuestTitle = ({ children }) => {
  return <StyledQuestTitle>{children}</StyledQuestTitle>;
};

export default QuestTitle;