import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { 
  Paddle, 
  Ball, 
  ScoreDisplay, 
  CenterLine, 
  DifficultyButton,
  CoinReward,
  PerfectBonus
} from './styles';
import { useCoins } from '../../contexts/CoinContext';
import { CoinDisplay } from '../../components/CoinDisplay';

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 600;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 120;
const BALL_SIZE = 15;
const PADDLE_OFFSET = 60;
const INITIAL_BALL_SPEED = 7;
const BOUNCE_MULTIPLIER = 1.05;
const MAX_BALL_SPEED = 15;
const MAX_VERTICAL_ANGLE = 0.75;

// Add these constants for computer AI
const EASY_SPEED = 6;
const MEDIUM_SPEED = 8;
const HARD_SPEED = 10;
const PREDICTION_FACTOR = 1.2; // Increased prediction factor
const EASY_MISTAKE_CHANCE = 0.3;  // 30% chance to make a mistake
const EASY_REACTION_DELAY = 0.5;  // Slower reactions in easy mode

// Add new constants for side shots
const SIDE_SHOT_MULTIPLIER = 1.5;  // Increased speed for side shots
const SIDE_SHOT_THRESHOLD = 0.15;  // How close to paddle edge for side shot (15% of paddle height)

// Update styles for the game container
const styles = {
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a472a',  // Changed to a dark green color
    position: 'relative'
  },
  gameContainer: {
    width: `${GAME_WIDTH}px`,
    height: `${GAME_HEIGHT}px`,
    backgroundColor: '#000',
    border: '2px solid #2d8a4e',  // Changed border to green
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    margin: 'auto'
  }
};

export const Pong = () => {
  const [ballPos, setBallPos] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
  const [playerY, setPlayerY] = useState(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [computerY, setComputerY] = useState(GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(7);
  const [ballSpeed, setBallSpeed] = useState({ x: 0, y: 0 });
  const [lastScoreTime, setLastScoreTime] = useState(0);  // Add this new state
  const SCORE_COOLDOWN = 1000; // 1 second cooldown between scores
  const { addCoins } = useCoins();
  const [coinScore, setCoinScore] = useState(0);
  const [rallyLength, setRallyLength] = useState(0);

  const containerRef = useRef(null);
  const frameIdRef = useRef(null);
  const navigate = useNavigate();

  const resetBall = () => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const angle = (Math.random() * 0.3 - 0.15) * Math.PI;
    setBallPos({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    setBallSpeed({
      x: INITIAL_BALL_SPEED * Math.cos(angle) * direction,
      y: INITIAL_BALL_SPEED * Math.sin(angle)
    });
  };

  const handlePaddleCollision = useCallback((next, paddleY, isPlayer) => {
    const ballCenter = next.y + BALL_SIZE / 2;
    const paddleCenter = paddleY + PADDLE_HEIGHT / 2;
    
    const relativeIntersectY = (ballCenter - paddleCenter) / (PADDLE_HEIGHT / 2);
    const bounceAngle = relativeIntersectY * MAX_VERTICAL_ANGLE;
    
    const currentSpeed = Math.sqrt(ballSpeed.x * ballSpeed.x + ballSpeed.y * ballSpeed.y);
    const newSpeed = Math.min(currentSpeed * BOUNCE_MULTIPLIER, MAX_BALL_SPEED);
    
    const direction = isPlayer ? 1 : -1;
    return {
      x: direction * newSpeed * Math.cos(bounceAngle),
      y: newSpeed * Math.sin(bounceAngle)
    };
  }, [ballSpeed]);

  const handleWallCollision = useCallback((next, prevSpeed) => {
    return {
      newSpeed: {
        x: prevSpeed.x,
        y: -prevSpeed.y * 0.95
      },
      newPos: {
        x: next.x,
        y: next.y <= 0 ? 0 : GAME_HEIGHT - BALL_SIZE
      }
    };
  }, []);

  const updateGame = () => {
    if (!gameRunning) return;

    setBallPos(prev => {
      const next = {
        x: prev.x + ballSpeed.x,
        y: prev.y + ballSpeed.y
      };

      // Improved wall collision handling
      if (next.y <= 0 || next.y >= GAME_HEIGHT - BALL_SIZE) {
        const { newSpeed, newPos } = handleWallCollision(next, ballSpeed);
        setBallSpeed(newSpeed);
        next.y = newPos.y;
      }

      if (next.x <= PADDLE_OFFSET + PADDLE_WIDTH &&
          next.x >= PADDLE_OFFSET &&
          next.y + BALL_SIZE >= playerY &&
          next.y <= playerY + PADDLE_HEIGHT) {
        
        setBallSpeed(handlePaddleCollision(next, playerY, true));
        next.x = PADDLE_OFFSET + PADDLE_WIDTH;
        
        setRallyLength(prev => {
          const newRally = prev + 1;
          if (newRally % 5 === 0) {
            const coinsToAdd = Math.min(Math.floor(newRally / 5) * 5, 20);
            addCoins(coinsToAdd);
            setCoinScore(prev => prev + coinsToAdd);
          }
          return newRally;
        });
      }
      
      else if (next.x + BALL_SIZE >= GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH &&
               next.x <= GAME_WIDTH - PADDLE_OFFSET &&
               next.y + BALL_SIZE >= computerY &&
               next.y <= computerY + PADDLE_HEIGHT) {
        
        setBallSpeed(handlePaddleCollision(next, computerY, false));
        next.x = GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH - BALL_SIZE;
        
        setRallyLength(prev => {
          const newRally = prev + 1;
          if (newRally % 5 === 0) {
            const coinsToAdd = Math.min(Math.floor(newRally / 5) * 5, 20);
            addCoins(coinsToAdd);
            setCoinScore(prev => prev + coinsToAdd);
          }
          return newRally;
        });
      }

      if (next.x <= 0) {
        setComputerScore(prev => prev + 1);
        setRallyLength(0);
        resetBall();
        return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
      }
      if (next.x + BALL_SIZE >= GAME_WIDTH) {
        setPlayerScore(prev => prev + 1);
        setRallyLength(0);
        resetBall();
        return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
      }

      return next;
    });

    updateComputerPosition();
  };

  const updateComputerPosition = () => {
    const computerSpeed = difficulty === 5 ? EASY_SPEED : 
                         difficulty === 7 ? MEDIUM_SPEED : 
                         HARD_SPEED;

    setComputerY(prev => {
      const ballCenterY = ballPos.y + BALL_SIZE / 2;
      
      let targetY = ballCenterY;
      
      if (ballSpeed.x > 0) {
        const timeToReach = (GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH - ballPos.x) / ballSpeed.x;
        targetY = ballCenterY + (ballSpeed.y * timeToReach * PREDICTION_FACTOR);

        if (difficulty === 5) {
          if (Math.random() < EASY_MISTAKE_CHANCE) {
            targetY = prev + (Math.random() * 100 - 50);
          }
          
          targetY = ballCenterY + (ballSpeed.y * timeToReach * EASY_REACTION_DELAY);
          
          if (Math.random() < EASY_MISTAKE_CHANCE) {
            targetY += (Math.random() * 200 - 100);
          }
        }
      }
      
      const randomError = (Math.random() - 0.5) * (difficulty === 5 ? 30 : 
                                                  difficulty === 7 ? 15 : 
                                                  5);
      targetY += randomError;
      
      targetY -= PADDLE_HEIGHT / 2;
      
      const diff = targetY - prev;
      const direction = diff > 0 ? 1 : -1;
      
      let movement = Math.min(Math.abs(diff), computerSpeed);
      if (difficulty === 5 && Math.random() < EASY_MISTAKE_CHANCE) {
        movement *= 0.5;
      }
      
      const newY = prev + (movement * direction);
      return Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, newY));
    });
  };

  const startGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRallyLength(0);
    setCoinScore(0);
    setGameRunning(true);
    setShowMenu(false);
    resetBall();
  };

  useEffect(() => {
    let frameId;
    
    const gameLoop = () => {
      if (!gameRunning) return;

      setBallPos(prev => {
        const next = {
          x: prev.x + ballSpeed.x,
          y: prev.y + ballSpeed.y
        };

        // Improved wall collision handling
        if (next.y <= 0 || next.y >= GAME_HEIGHT - BALL_SIZE) {
          const { newSpeed, newPos } = handleWallCollision(next, ballSpeed);
          setBallSpeed(newSpeed);
          next.y = newPos.y;
        }

        if (next.x <= PADDLE_OFFSET + PADDLE_WIDTH &&
            next.x >= PADDLE_OFFSET &&
            next.y + BALL_SIZE >= playerY &&
            next.y <= playerY + PADDLE_HEIGHT) {
          
          const newSpeed = handlePaddleCollision(next, playerY, true);
          setBallSpeed(newSpeed);
          next.x = PADDLE_OFFSET + PADDLE_WIDTH;
          
          setRallyLength(prev => {
            const newRally = prev + 1;
            if (newRally % 5 === 0) {
              const coinsToAdd = Math.min(Math.floor(newRally / 5) * 5, 20);
              addCoins(coinsToAdd);
              setCoinScore(prev => prev + coinsToAdd);
            }
            return newRally;
          });
        }
        
        else if (next.x + BALL_SIZE >= GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH &&
                 next.x <= GAME_WIDTH - PADDLE_OFFSET &&
                 next.y + BALL_SIZE >= computerY &&
                 next.y <= computerY + PADDLE_HEIGHT) {
          
          const newSpeed = handlePaddleCollision(next, computerY, false);
          setBallSpeed(newSpeed);
          next.x = GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH - BALL_SIZE;
          
          setRallyLength(prev => {
            const newRally = prev + 1;
            if (newRally % 5 === 0) {
              const coinsToAdd = Math.min(Math.floor(newRally / 5) * 5, 20);
              addCoins(coinsToAdd);
              setCoinScore(prev => prev + coinsToAdd);
            }
            return newRally;
          });
        }

        if (next.x <= 0) {
          setComputerScore(prev => prev + 1);
          setRallyLength(0);
          resetBall();
          return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
        }
        if (next.x + BALL_SIZE >= GAME_WIDTH) {
          setPlayerScore(prev => prev + 1);
          setRallyLength(0);
          resetBall();
          return { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 };
        }

        return next;
      });

      setComputerY(prev => {
        const ballCenter = ballPos.y + BALL_SIZE / 2;
        const paddleCenter = prev + PADDLE_HEIGHT / 2;
        const diff = ballCenter - paddleCenter;
        const speed = difficulty === 5 ? EASY_SPEED : 
                     difficulty === 7 ? MEDIUM_SPEED : 
                     HARD_SPEED;
        
        const movement = Math.min(Math.abs(diff), speed) * Math.sign(diff);
        const newY = prev + movement;
        return Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, newY));
      });

      frameId = requestAnimationFrame(gameLoop);
    };

    if (gameRunning) {
      frameId = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [gameRunning, ballSpeed, playerY, computerY, difficulty, handlePaddleCollision, handleWallCollision]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!gameRunning || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      setPlayerY(Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, mouseY)));
    };

    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      const moveAmount = 25;
      if (e.key === 'ArrowUp') {
        setPlayerY(prev => Math.max(0, prev - moveAmount));
      } else if (e.key === 'ArrowDown') {
        setPlayerY(prev => Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + moveAmount));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [gameRunning]);

  useEffect(() => {
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CoinDisplay />
      <GameContainer ref={containerRef} style={styles.gameContainer}>
        <CenterLine />
        <Paddle 
          $isPlayer
          style={{ 
            left: `${PADDLE_OFFSET}px`, 
            top: `${playerY}px`,
            width: `${PADDLE_WIDTH}px`,
            height: `${PADDLE_HEIGHT}px`
          }} 
        />
        <Paddle 
          style={{ 
            right: `${PADDLE_OFFSET}px`, 
            top: `${computerY}px`,
            width: `${PADDLE_WIDTH}px`,
            height: `${PADDLE_HEIGHT}px`
          }} 
        />
        <Ball 
          style={{ 
            left: `${ballPos.x}px`, 
            top: `${ballPos.y}px`,
            width: `${BALL_SIZE}px`,
            height: `${BALL_SIZE}px`
          }} 
        />
        <ScoreDisplay side="left" style={{ fontSize: '64px' }}>{playerScore}</ScoreDisplay>
        <ScoreDisplay side="right" style={{ fontSize: '64px' }}>{computerScore}</ScoreDisplay>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Game Over!</h2>
          <p>Score: {playerScore + computerScore}</p>
          {coinScore > 0 && (
            <CoinReward>
              +{coinScore} Coins Earned!
              {rallyLength >= 10 && (
                <PerfectBonus>Longest Rally: {rallyLength}</PerfectBonus>
              )}
            </CoinReward>
          )}
          <Button onClick={startGame}>Play Again</Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </div>
  );
};