import styled from 'styled-components';

export const GameBoard = styled.div`
  position: relative;
  width: 1000px;
  height: 600px;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(45, 138, 78, 0.3);
`;

export const StationDot = styled.div`
  position: absolute;
  width: ${props => props.size || '30px'};
  height: ${props => props.size || '30px'};
  background-color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: ${props => props.shape === 'circle' ? '50%' : 
                           props.shape === 'square' ? '0' : '0'};
  transform: ${props => props.shape === 'triangle' ? 'rotate(45deg)' : 'none'};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: ${props => props.shape === 'triangle' ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)'};
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

export const MetroLine = styled.div`
  position: absolute;
  height: ${props => props.width || '4px'};
  background-color: ${props => props.color};
  transform-origin: 0 0;
  pointer-events: none;
  box-shadow: 0 0 10px ${props => props.color}80;
`;

export const Train = styled.div`
  position: absolute;
  width: 20px;
  height: 10px;
  background-color: ${props => props.color};
  border-radius: 4px;
  transform-origin: center;
  transition: transform 0.1s linear;
  box-shadow: 0 0 10px ${props => props.color}80;
`;

export const Passenger = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: ${props => props.shape === 'circle' ? '50%' : 
                           props.shape === 'square' ? '0' : '0'};
  transform: ${props => props.shape === 'triangle' ? 'rotate(45deg)' : 'none'};
  opacity: 0.8;
  pointer-events: none;
`;

export const ScoreDisplay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(45, 138, 78, 0.5);
`;

export const LineSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const LineButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.color};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px ${props => props.color}80;
  }

  &.selected {
    border: 3px solid #ffffff;
    box-shadow: 0 0 20px ${props => props.color}80;
  }
`;

export const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 32px;
  gap: 20px;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
`; 