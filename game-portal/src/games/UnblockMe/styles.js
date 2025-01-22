import styled, { keyframes } from 'styled-components';
import { Menu } from '../../components/Menu';

// Define animations first
const bounceIn = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
`;

// Add CELL_SIZE constant
const CELL_SIZE = 20;

// Move DIFFICULTY_COLORS here
export const DIFFICULTY_COLORS = {
  'Tutorial': '#3498db',
  'Very Easy': '#2ecc71',
  'Easy': '#27ae60',
  'Medium': '#f1c40f',
  'Hard': '#e67e22',
  'Expert': '#e74c3c',
  'Master': '#9b59b6'
};

export const GameBoard = styled.div`
  position: relative;
  width: ${6 * 80}px;
  height: ${6 * 80}px;
  background: #2c3e50;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  
  &:after {
    content: '';
    position: absolute;
    right: -10px;
    top: ${props => props.$exitY * 80 + 30}px;
    width: 20px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0 5px 5px 0;
  }
`;

export const Block = styled.div`
  position: absolute;
  width: ${props => props.$isHorizontal ? props.$length * 80 - 10 : 70}px;
  height: ${props => props.$isHorizontal ? 70 : props.$length * 80 - 10}px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);

  ${props => props.$isSelected && `
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    transform: scale(1.02) translate(${props.$isHorizontal ? props.x * 80 : props.x * 80 - 1}px, 
                                   ${props.$isHorizontal ? props.y * 80 - 1 : props.y * 80}px) !important;
  `}

  ${props => props.$isHighlighted && `
    animation: ${glow} 1s infinite;
  `}

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    transform: scale(1.01) translate(${props => props.style.transform.split('(')[1].split('px')[0]}px, 
                                   ${props => props.style.transform.split(',')[1].split('px')[0]}px);
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LevelCounter = styled.div`
  color: ${props => props.theme.colors.light};
  font-size: 1.2em;
  font-weight: bold;
  
  span {
    margin-left: 10px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    background: ${props => {
      switch (props.$difficulty) {
        case 'Tutorial': return '#3498db';
        case 'Very Easy': return '#2ecc71';
        case 'Easy': return '#f1c40f';
        case 'Medium': return '#e67e22';
        case 'Hard': return '#e74c3c';
        case 'Expert': return '#9b59b6';
        default: return props.theme.colors.primary;
      }
    }};
  }
`;

export const MovesCounter = styled.div`
  color: ${props => props.theme.colors.light};
  font-size: 1.1em;
  
  span {
    color: ${props => props.$overMinMoves ? props.theme.colors.danger : props.theme.colors.success};
    font-weight: bold;
  }
`;

export const Timer = styled.div`
  color: ${props => props.theme.colors.light};
  font-size: 1.1em;
  font-family: monospace;
`;

export const HintText = styled.div`
  color: ${props => props.theme.colors.light};
  text-align: center;
  margin-top: 10px;
  font-size: 0.9em;
  opacity: 0.8;
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
  animation: ${pulse} 1s infinite;
`;

export const TimeBonus = styled.div`
  color: #3498db;
  font-size: 0.8em;
  margin-top: 5px;
  animation: ${pulse} 1s infinite;
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const ControlButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const UndoButton = styled(ControlButton)`
  background: #3498db;
  &:hover:not(:disabled) {
    background: #2980b9;
  }
`;

export const RedoButton = styled(ControlButton)`
  background: #2ecc71;
  &:hover:not(:disabled) {
    background: #27ae60;
  }
`;

export const HintButton = styled(ControlButton)`
  background: #f1c40f;
  &:hover:not(:disabled) {
    background: #f39c12;
  }
`;

export const SoundButton = styled(ControlButton)`
  background: #9b59b6;
  &:hover:not(:disabled) {
    background: #8e44ad;
  }
`;

export const TutorialOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const TutorialBox = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  text-align: center;
  
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 10px;
  }
  
  p {
    color: ${props => props.theme.colors.light};
    margin-bottom: 15px;
  }
`; 