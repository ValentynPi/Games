import styled, { keyframes } from 'styled-components';
import { Menu } from '../../components/Menu';

// Add CELL_SIZE constant
const CELL_SIZE = 20;

const bounceIn = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const SnakeSegment = styled.div`
  position: absolute;
  background-color: ${props => props.$isHead ? props.theme.colors.primary : props.theme.colors.success};
  border-radius: ${props => props.$isHead ? '8px' : '4px'};
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
  transform: ${props => props.$isHead ? 'scale(1.1)' : 'scale(1)'};
  z-index: ${props => props.$isHead ? 2 : 1};
`;

export const Food = styled.div`
  position: absolute;
  background-color: #e74c3c;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.7);
  transform: scale(0.9);
  animation: pulse 1s infinite;
  border: 2px solid #c0392b;
  
  &::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 50%;
    width: 20%;
    height: 30%;
    background: #2ecc71;
    transform: translateX(-50%) rotate(-45deg);
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10%;
    right: 25%;
    width: 15%;
    height: 15%;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }

  @keyframes pulse {
    0% { transform: scale(0.9); }
    50% { transform: scale(1); }
    100% { transform: scale(0.9); }
  }
`;

export const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${props => props.theme.colors.light};
  font-size: 24px;
  font-weight: bold;
`;

export const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 32px;
`;

export const Stats = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  color: ${props => props.theme.colors.light};
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  line-height: 1.5;
`;

export const PowerupItem = styled.div`
  position: absolute;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  animation: pulse 1s infinite;
  z-index: 2;
`;

export const PowerupBar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
`;

export const PowerupIndicator = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;
`;

export const ComboDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f1c40f;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
  animation: scaleIn 0.3s;
`;

export const PauseMenu = styled(Menu)`
  background: rgba(0, 0, 0, 0.8);
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