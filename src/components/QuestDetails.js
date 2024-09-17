import React from 'react';
import styled from 'styled-components';

const StyledQuestDetails = styled.div``;

const QuestDetails = ({ children }) => {
  return <StyledQuestDetails>{children}</StyledQuestDetails>;
};

export default QuestDetails;