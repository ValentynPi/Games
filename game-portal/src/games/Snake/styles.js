import styled, { keyframes } from 'styled-components';
import { Menu } from '../../components/Menu';
import { CELL_SIZE } from './constants';

const bounceIn = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const SnakeGameContainer = styled.div`
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  border: 2px solid #2d8a4e;
  position: relative;
  background-color: #1a1a1a;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 0 20px rgba(45, 138, 78, 0.3);
  margin: 20px;
  overflow: hidden;
  transform: scale(1.2);
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(45, 138, 78, 0.4);
  }
`;

export const SnakeSegment = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  position: absolute;
  transition: all 0.1s linear;
  z-index: 1;
  ${({ isHead, skin }) => {
    if (skin?.snake) {
      return `
        background: ${skin.snake.background || '#4CAF50'};
        box-shadow: ${skin.snake.boxShadow || '0 0 10px rgba(76, 175, 80, 0.8)'};
        border: ${skin.snake.border || '2px solid #388E3C'};
        ${isHead ? `
          border-radius: 6px;
          background: #66BB6A;
          box-shadow: 0 0 15px rgba(76, 175, 80, 1);
        ` : ''}
      `;
    }
    return `
      background-color: ${isHead ? '#66BB6A' : '#4CAF50'};
      box-shadow: ${isHead ? '0 0 15px rgba(76, 175, 80, 1)' : '0 0 10px rgba(76, 175, 80, 0.8)'};
      border: 2px solid #388E3C;
      ${isHead ? 'border-radius: 6px;' : ''}
    `;
  }}
`;

export const Food = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  position: absolute;
  border-radius: 50%;
  ${({ skin }) => {
    if (skin?.food) {
      return `
        background: ${skin.food.background || '#FF5252'};
        box-shadow: ${skin.food.boxShadow || '0 0 5px rgba(255, 82, 82, 0.5)'};
        border: ${skin.food.border || '1px solid #D32F2F'};
      `;
    }
    return `
      background-color: #FF5252;
      box-shadow: 0 0 5px rgba(255, 82, 82, 0.5);
      border: 1px solid #D32F2F;
    `;
  }}
`;

export const Score = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
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
  top: 20px;
  right: 20px;
  color: white;
  font-size: 16px;
  text-align: right;
`;

export const PowerupItem = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

export const PowerupBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
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
  color: white;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

export const ComboDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFC107;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
  pointer-events: none;
`;

export const PauseMenu = styled(Menu)`
  background: rgba(0, 0, 0, 0.8);
`;

export const CoinReward = styled.div`
  color: #FFC107;
  font-size: 24px;
  margin: 10px 0;
  text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
  animation: pulse 1s infinite;
`;

export const PerfectBonus = styled.div`
  color: #2ecc71;
  font-size: 0.8em;
  margin-top: 5px;
`; 