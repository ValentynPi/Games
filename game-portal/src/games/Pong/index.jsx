import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { Paddle, Ball, ScoreDisplay, CenterLine, DifficultyButton } from './styles';

const Pong = () => {
  const [ballPos, setBallPos] = useState({ x: 400, y: 250 });
  const [ballSpeed, setBallSpeed] = useState({ x: 5, y: 5 });
  const [playerY, setPlayerY] = useState(200);
  const [computerY, setComputerY] = useState(200);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(5);
  const gameLoopRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const updatePositions = () => {
    // Update ball position
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
      setBallSpeed(prev => ({
        x: Math.abs(prev.x),
        y: ((playerY + 50) - ballPos.y) / -10
      }));
    }

    if (ballPos.x >= 720 && ballPos.y >= computerY && ballPos.y <= computerY + 100) {
      setBallSpeed(prev => ({
        x: -Math.abs(prev.x),
        y: ((computerY + 50) - ballPos.y) / -10
      }));
    }

    // Scoring
    if (ballPos.x <= 0) {
      setComputerScore(prev => prev + 1);
      resetBall();
    }
    if (ballPos.x >= 785) {
      setPlayerScore(prev => prev + 1);
      resetBall();
    }

    // Move computer paddle
    const computerCenter = computerY + 50;
    if (computerCenter < ballPos.y - 35) {
      setComputerY(prev => Math.min(prev + difficulty, 400));
    }
    if (computerCenter > ballPos.y + 35) {
      setComputerY(prev => Math.max(prev - difficulty, 0));
    }
  };

  const resetBall = () => {
    setBallPos({ x: 400, y: 250 });
    setBallSpeed({
      x: Math.random() > 0.5 ? 5 : -5,
      y: Math.random() * 10 - 5
    });
  };

  const startGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerY(200);
    setComputerY(200);
    resetBall();
    setShowMenu(false);
    setGameRunning(true);
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(updatePositions, 16);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current && gameRunning) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseY = e.clientY - rect.top - 50;
        setPlayerY(Math.max(0, Math.min(400, mouseY)));
      }
    };

    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      if (e.key === 'ArrowUp') {
        setPlayerY(prev => Math.max(0, prev - 20));
      } else if (e.key === 'ArrowDown') {
        setPlayerY(prev => Math.min(400, prev + 20));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameRunning]);

  return (
    <>
      <GameContainer ref={containerRef}>
        <CenterLine />
        <Paddle style={{ left: '50px', top: `${playerY}px` }} />
        <Paddle style={{ right: '50px', top: `${computerY}px` }} />
        <Ball style={{ left: `${ballPos.x}px`, top: `${ballPos.y}px` }} />
        <ScoreDisplay side="left">{playerScore}</ScoreDisplay>
        <ScoreDisplay side="right">{computerScore}</ScoreDisplay>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Pong</h2>
          <p>Use mouse or arrow keys to move paddle</p>
          <div>
            <DifficultyButton
              $selected={difficulty === 5}
              onClick={() => setDifficulty(5)}
            >
              Easy
            </DifficultyButton>
            <DifficultyButton
              $selected={difficulty === 7}
              onClick={() => setDifficulty(7)}
            >
              Medium
            </DifficultyButton>
            <DifficultyButton
              $selected={difficulty === 9}
              onClick={() => setDifficulty(9)}
            >
              Hard
            </DifficultyButton>
          </div>
          <Button as="button" onClick={startGame}>
            Start Game
          </Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </>
  );
};

export default Pong; 