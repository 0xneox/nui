import React from 'react';
import styled from 'styled-components';

const StyledQuestDescription = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #888;
`;

const QuestDescription = ({ children }) => {
  return <StyledQuestDescription>{children}</StyledQuestDescription>;
};

export default QuestDescription;