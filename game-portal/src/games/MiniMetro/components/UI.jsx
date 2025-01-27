import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const UIContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: auto;

  &:hover {
    transform: translateY(-2px);
    background: rgba(44, 62, 80, 1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Score = styled.div`
  padding: 12px 24px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-radius: 8px;
`;

const LineSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: auto;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.selected ? 1 : 0.6};
  transform: scale(${props => props.selected ? 1.1 : 1});
  pointer-events: auto;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: scale(1);
  }
`;

const GameOverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: white;
  font-size: 48px;
  font-weight: bold;
  pointer-events: auto;
`;

export const UI = ({ gameState, selectedLine, setSelectedLine, onReset, onPause }) => {
  const { score, gameOver, paused, availableLines } = gameState;

  return (
    <>
      <UIContainer>
        <LeftPanel>
          <Score>Score: {score}</Score>
          <Button onClick={onPause}>{paused ? 'Resume' : 'Pause'}</Button>
          <Button onClick={onReset}>New Game</Button>
        </LeftPanel>
        <RightPanel>
          <LineSelector>
            {COLORS.slice(0, availableLines).map((color, index) => (
              <ColorButton
                key={color}
                color={color}
                selected={selectedLine === index}
                onClick={() => setSelectedLine(selectedLine === index ? null : index)}
              />
            ))}
          </LineSelector>
        </RightPanel>
      </UIContainer>
      {gameOver && (
        <GameOverOverlay>
          <div>Game Over!</div>
          <div>Score: {score}</div>
          <Button onClick={onReset}>Play Again</Button>
        </GameOverOverlay>
      )}
      {paused && !gameOver && (
        <GameOverOverlay>
          <div>Paused</div>
          <Button onClick={onPause}>Resume</Button>
        </GameOverOverlay>
      )}
    </>
  );
}; 