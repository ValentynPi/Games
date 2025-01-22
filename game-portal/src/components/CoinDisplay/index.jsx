import React from 'react';
import styled from 'styled-components';
import { useCoins } from '../../contexts/CoinContext';

const CoinContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  border-radius: 20px;
  color: #f1c40f;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2em;
  z-index: 1000;
`;

const CoinIcon = styled.span`
  color: #f1c40f;
`;

export const CoinDisplay = () => {
  const { coins } = useCoins();
  
  return (
    <CoinContainer>
      <CoinIcon>🪙</CoinIcon>
      {coins}
    </CoinContainer>
  );
}; 