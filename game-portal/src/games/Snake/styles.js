import styled, { keyframes } from 'styled-components';
import { CELL_SIZE } from './constants';

const bounceIn = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const SnakeGameContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #2d8a4e;
  position: relative;
  background-color: #1a1a1a;
  border-radius: 8px;
  outline: none;
  box-shadow: 0 0 20px rgba(45, 138, 78, 0.3);
  overflow: hidden;
  
  &:focus {
    outline: none;
  }
`;

export const SnakeSegment = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  position: absolute;
  background-color: ${props => props.$isHead ? '#4CAF50' : '#2d8a4e'};
  border-radius: 4px;
  transition: all 0.1s linear;
  box-shadow: 0 0 10px rgba(45, 138, 78, 0.5);
  left: ${props => props.$x * CELL_SIZE}px;
  top: ${props => props.$y * CELL_SIZE}px;
`;

export const Food = styled.div`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  position: absolute;
  background-color: ${props => props.$type === 'golden' ? '#FFD700' : 
    props.$type === 'special' ? '#FF4081' : '#e74c3c'};
  border-radius: 50%;
  left: ${props => props.$x * CELL_SIZE}px;
  top: ${props => props.$y * CELL_SIZE}px;
  animation: ${bounceIn} 0.3s ease-out;
  box-shadow: 0 0 15px ${props => props.$type === 'golden' ? 'rgba(255, 215, 0, 0.7)' : 
    props.$type === 'special' ? 'rgba(255, 64, 129, 0.7)' : 'rgba(231, 76, 60, 0.7)'};
`;

export const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 10;
`;

export const Stats = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  font-size: 16px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 10;
`;

export const PowerupBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

export const PowerupIndicator = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  border: 2px solid ${props => props.$active ? '#4CAF50' : '#666'};
  box-shadow: 0 0 15px rgba(76, 175, 80, ${props => props.$active ? '0.5' : '0'});
`;

export const ComboDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: #4CAF50;
  text-shadow: 0 0 20px rgba(76, 175, 80, 0.8);
  animation: ${bounceIn} 0.3s ease-out;
  z-index: 10;
`;

export const PauseMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 100;
  backdrop-filter: blur(5px);
`;

export const CoinReward = styled.div`
  position: absolute;
  color: #FFD700;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  animation: ${bounceIn} 0.3s ease-out;
  z-index: 10;
  left: ${props => props.$x * CELL_SIZE}px;
  top: ${props => props.$y * CELL_SIZE}px;
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
  animation: ${bounceIn} 0.3s ease-out;
  z-index: 5;
`; 