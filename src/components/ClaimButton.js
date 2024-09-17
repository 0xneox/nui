import React from 'react';
import styled from 'styled-components';

const StyledClaimButton = styled.button`
  background-color: ${props => props.claimed ? '#888' : props.locked ? '#d32f2f' : '#00c853'};
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: ${props => props.claimed || props.locked ? 'default' : 'pointer'};
  display: flex;
  align-items: center;
`;

const ClaimButton = ({ children, onClick, disabled, claimed, locked }) => {
  return (
    <StyledClaimButton 
      onClick={onClick}
      disabled={disabled}
      claimed={claimed}
      locked={locked}
    >
      {children}
    </StyledClaimButton>
  );
};

export default ClaimButton;