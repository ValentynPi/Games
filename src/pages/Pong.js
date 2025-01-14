import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GameContainer } from '../components/GameContainer';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';

const Paddle = styled.div`
  position: absolute;
  width: 15px;
  height: 100px;
  background: #ecf0f1;
  border-radius: 5px;
`;

const Ball = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: #e74c3c;
  border-radius: 50%;
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 20px;
  color: white;
  font-size: 48px;
  font-family: 'Arial', sans-serif;
  ${props => props.side === 'left' ? 'left: 30%;' : 'right: 30%;'}
`;

function Pong() {
  const [gameRunning, setGameRunning] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 400, y: 250 });
  const [ballSpeed, setBallSpeed] = useState({ x: 5, y: 5 });
  const [playerY, setPlayerY] = useState(200);
  const [computerY, setComputerY] = useState(200);
  const gameLoopRef = useRef(null);
  const containerRef = useRef(null);

  const startGame = () => {
    setGameRunning(true);
    setPlayerScore(0);
    setComputerScore(0);
    setBallPos({ x: 400, y: 250 });
    setBallSpeed({ x: 5, y: 5 });
    setPlayerY(200);
    setComputerY(200);
  };

  useEffect(() => {
    if (gameRunning) {
      gameLoopRef.current = setInterval(() => {
        setBallPos(prev => ({
          x: prev.x + ballSpeed.x,
          y: prev.y + ballSpeed.y
        }));

        // Ball collision with top and bottom
        if (ballPos.y <= 0 || ballPos.y >= 485) {
          setBallSpeed(prev => ({ ...prev, y: -prev.y }));
        }

        // Ball collision with paddles
        if (ballPos.x <= 65 && ballPos.y >= playerY && ballPos.y <= playerY + 100) {
          setBallSpeed(prev => ({ ...prev, x: Math.abs(prev.x) }));
        }

        if (ballPos.x >= 720 && ballPos.y >= computerY && ballPos.y <= computerY + 100) {
          setBallSpeed(prev => ({ ...prev, x: -Math.abs(prev.x) }));
        }

        // Scoring
        if (ballPos.x <= 0) {
          setComputerScore(prev => prev + 1);
          setBallPos({ x: 400, y: 250 });
        }
        if (ballPos.x >= 785) {
          setPlayerScore(prev => prev + 1);
          setBallPos({ x: 400, y: 250 });
        }

        // Computer AI
        const computerCenter = computerY + 50;
        if (computerCenter < ballPos.y - 35) {
          setComputerY(prev => prev + 5);
        }
        if (computerCenter > ballPos.y + 35) {
          setComputerY(prev => prev - 5);
        }
      }, 16);

      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameRunning, ballPos, ballSpeed, playerY, computerY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseY = e.clientY - rect.top - 50;
        setPlayerY(Math.max(0, Math.min(400, mouseY)));
      }
    };

    if (gameRunning) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [gameRunning]);

  return (
    <GameContainer ref={containerRef} width="800px" height="500px">
      <Paddle style={{ left: '50px', top: `${playerY}px` }} />
      <Paddle style={{ right: '50px', top: `${computerY}px` }} />
      <Ball style={{ left: `${ballPos.x}px`, top: `${ballPos.y}px` }} />
      <ScoreDisplay side="left">{playerScore}</ScoreDisplay>
      <ScoreDisplay side="right">{computerScore}</ScoreDisplay>

      {!gameRunning && (
        <Menu>
          <h2>Pong</h2>
          <p>Use mouse to move paddle</p>
          <Button as="button" onClick={startGame}>
            Start Game
          </Button>
          <Button to="/">Home</Button>
        </Menu>
      )}
    </GameContainer>
  );
}

export default Pong; 