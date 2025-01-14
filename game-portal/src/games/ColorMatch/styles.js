import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

export const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  cursor: grab;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
  }
`;

export const Zone = styled.div`
  position: absolute;
  bottom: 0;
  height: 120px;
  border-top: 4px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: rgba(255,255,255,0.5);
`;

export const Score = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
  z-index: 1;
`;

export const Combo = styled.div`
  position: fixed;
  top: 60px;
  left: 20px;
  color: ${props => props.theme.colors.warning};
  font-size: 20px;
  z-index: 1;
`;

export const Timer = styled.div`
  position: fixed;
  top: 20px;
  right: 100px;
  color: ${props => props.theme.colors.danger};
  font-size: 24px;
  z-index: 1;
`;

export const ComboText = styled.div`
  position: fixed;
  font-size: 32px;
  color: ${props => props.theme.colors.warning};
  pointer-events: none;
  transition: transform 0.5s, opacity 0.5s;
  z-index: 2;
`;

export const DifficultyButton = styled.button`
  background: ${props => props.$selected ? props.theme.colors.danger : props.theme.colors.secondary};
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  border: none;

  &:hover {
    background: ${props => props.$selected ? props.theme.colors.danger : props.theme.colors.primary};
  }
`; 