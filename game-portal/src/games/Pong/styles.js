import styled, { keyframes } from 'styled-components';

// Define animations first
const bounceIn = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const Paddle = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.light};
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  transition: box-shadow 0.2s;
  border: 2px solid rgba(255, 255, 255, 0.2);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 1;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }

  ${props => props.$isPlayer && `
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
      border-radius: 8px;
    }
  `}
`;

export const Ball = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.colors.danger};
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
  border: 2px solid rgba(255, 0, 0, 0.4);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 1;
`;

export const ScoreDisplay = styled.div`
  position: absolute;
  top: 40px;
  ${props => props.side === 'left' ? 'left: 25%;' : 'right: 25%;'}
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  z-index: 1;
`;

export const CenterLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  z-index: 0;
`;

export const DifficultyButton = styled.button`
  background: ${props => props.$selected ? props.theme.colors.danger : props.theme.colors.secondary};
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  border: none;
  font-size: 1rem;

  &:hover {
    background: ${props => props.$selected ? props.theme.colors.danger : props.theme.colors.primary};
  }
`;

export const CoinReward = styled.div`
  font-size: 1.5em;
  color: #f1c40f;
  margin: 15px 0;
  text-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
  animation: ${bounceIn} 0.5s ease-out;
`;

export const PerfectBonus = styled.div`
  color: #2ecc71;
  font-size: 0.8em;
  margin-top: 5px;
`;