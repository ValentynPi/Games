import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { Paddle, Ball, ScoreDisplay, CenterLine, DifficultyButton } from './styles';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 15;
const BALL_SPEED = 7;

const Pong = () => {
  const [ballPos, setBallPos] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
  const [playerY, setPlayerY] = useState(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [computerY, setComputerY] = useState(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(5);
  
  const ballSpeedRef = useRef({ x: BALL_SPEED, y: 0 });
  const gameLoopRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const resetBall = () => {
    setBallPos({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    const direction = Math.random() > 0.5 ? 1 : -1;
    const angle = (Math.random() - 0.5) * 0.5;
    ballSpeedRef.current = {
      x: BALL_SPEED * direction,
      y: BALL_SPEED * angle
    };
  };

  const updateGame = () => {
    if (!gameRunning) return;

    setBallPos(prev => {
      const newPos = {
        x: prev.x + ballSpeedRef.current.x,
        y: prev.y + ballSpeedRef.current.y
      };

      // Ball collision with top and bottom walls
      if (newPos.y <= 0 || newPos.y >= GAME_HEIGHT - BALL_SIZE) {
        ballSpeedRef.current.y = -ballSpeedRef.current.y;
      }

      // Ball collision with player paddle
      if (newPos.x <= 65 && 
          newPos.y + BALL_SIZE >= playerY && 
          newPos.y <= playerY + PADDLE_HEIGHT) {
        const hitPos = (newPos.y - playerY) / PADDLE_HEIGHT;
        const angle = (hitPos - 0.5) * Math.PI / 3;
        
        ballSpeedRef.current = {
          x: BALL_SPEED,
          y: BALL_SPEED * Math.sin(angle)
        };
        newPos.x = 66;
      }

      // Ball collision with computer paddle
      if (newPos.x >= GAME_WIDTH - 80 && 
          newPos.y + BALL_SIZE >= computerY && 
          newPos.y <= computerY + PADDLE_HEIGHT) {
        const hitPos = (newPos.y - computerY) / PADDLE_HEIGHT;
        const angle = (hitPos - 0.5) * Math.PI / 3;

        ballSpeedRef.current = {
          x: -BALL_SPEED,
          y: BALL_SPEED * Math.sin(angle)
        };
        newPos.x = GAME_WIDTH - 81;
      }

      // Scoring
      if (newPos.x <= 0) {
        setComputerScore(s => s + 1);
        resetBall();
        return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
      }
      if (newPos.x >= GAME_WIDTH) {
        setPlayerScore(s => s + 1);
        resetBall();
        return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
      }

      return newPos;
    });

    // Update computer paddle with smoother movement
    setComputerY(prev => {
      const targetY = ballPos.y - (PADDLE_HEIGHT / 2);
      const diff = targetY - prev;
      const movement = Math.min(Math.abs(diff), difficulty);
      return Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, 
        prev + (diff > 0 ? movement : -movement)
      ));
    });
  };

  useEffect(() => {
    let frameId;
    
    const gameLoop = () => {
      if (gameRunning) {
        updateGame();
        frameId = requestAnimationFrame(gameLoop);
      }
    };

    if (gameRunning) {
      frameId = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [gameRunning]);

  const startGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerY(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setComputerY(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    resetBall();
    setGameRunning(true);
    setShowMenu(false);
  };

  const endGame = () => {
    setGameRunning(false);
    setShowMenu(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gameRunning || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      setPlayerY(Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, mouseY)));
    };

    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      if (e.key === 'ArrowUp') {
        setPlayerY(prev => Math.max(0, prev - 20));
      } else if (e.key === 'ArrowDown') {
        setPlayerY(prev => Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + 20));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
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