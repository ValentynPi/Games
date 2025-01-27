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
import { useInventory } from '../../contexts/InventoryContext';

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
const PADDLE_SPEED = 15; // Increased from default
const EASY_SPEED = 4;
const MEDIUM_SPEED = 6;
const HARD_SPEED = 8;
const PREDICTION_FACTOR = 0.8; // Reduced from 1.2 to make AI less perfect
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

  const { getEquippedSkin } = useInventory();
  const equippedSkin = getEquippedSkin('pong');

  // Add paddle movement state
  const [keyState, setKeyState] = useState({
    ArrowUp: false,
    ArrowDown: false
  });

  const getPaddleStyle = useCallback((isPlayer) => {
    const skin = equippedSkin?.styles || {};
    const baseStyle = {
      width: PADDLE_WIDTH,
      height: skin.baseStyle?.height || PADDLE_HEIGHT,
      position: 'absolute',
      borderRadius: '4px',
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      ...skin.baseStyle
    };

    if (isPlayer) {
      return {
        ...baseStyle,
        left: PADDLE_OFFSET,
        background: skin.playerPaddle?.background || '#fff',
        boxShadow: skin.playerPaddle?.boxShadow || '0 0 10px rgba(255, 255, 255, 0.5)',
        border: skin.playerPaddle?.border || '2px solid rgba(255, 255, 255, 0.8)'
      };
    }

    return {
      ...baseStyle,
      right: PADDLE_OFFSET,
      background: skin.computerPaddle?.background || '#fff',
      boxShadow: skin.computerPaddle?.boxShadow || '0 0 10px rgba(255, 255, 255, 0.5)',
      border: skin.computerPaddle?.border || '2px solid rgba(255, 255, 255, 0.8)'
    };
  }, [equippedSkin]);

  // Add effect to rerender when skin changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.border = equippedSkin?.styles?.border || '2px solid #2d8a4e';
    }
  }, [equippedSkin]);

  const resetBall = () => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const angle = (Math.random() * 0.3 - 0.15) * Math.PI;
    setBallPos({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    setBallSpeed({
      x: INITIAL_BALL_SPEED * Math.cos(angle) * direction,
      y: INITIAL_BALL_SPEED * Math.sin(angle)
    });
  };

  const handlePaddleCollision = useCallback((isPlayer) => {
    const paddleHeight = equippedSkin?.styles?.baseStyle?.height || PADDLE_HEIGHT;
    const INITIAL_SPEED = 8;
    const MAX_BOUNCE_ANGLE = Math.PI / 3; // 60 degrees
    
    const paddleY = isPlayer ? playerY : computerY;
    const relativeIntersectY = (paddleY + (paddleHeight / 2)) - ballPos.y;
    const normalizedIntersectY = relativeIntersectY / (paddleHeight / 2);
    const bounceAngle = normalizedIntersectY * MAX_BOUNCE_ANGLE;

    // Maintain or slightly increase speed after collision
    const currentSpeed = Math.sqrt(ballSpeed.x * ballSpeed.x + ballSpeed.y * ballSpeed.y);
    const newSpeed = Math.max(currentSpeed, INITIAL_SPEED);
    
    return {
      x: (isPlayer ? 1 : -1) * newSpeed * Math.cos(bounceAngle),
      y: -newSpeed * Math.sin(bounceAngle)
    };
  }, [ballPos, playerY, computerY, ballSpeed, equippedSkin]);

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

      // Player paddle collision - more precise detection
      const playerPaddleRight = PADDLE_OFFSET + PADDLE_WIDTH;
      const ballLeft = next.x;
      const ballRight = next.x + BALL_SIZE;
      const ballTop = next.y;
      const ballBottom = next.y + BALL_SIZE;
      
      if (ballSpeed.x < 0 && // Only check when ball is moving left
          ballLeft <= playerPaddleRight &&
          ballRight > PADDLE_OFFSET && // Prevent triggering when ball is past paddle
          ballBottom >= playerY &&
          ballTop <= playerY + PADDLE_HEIGHT) {
        
        const newSpeed = handlePaddleCollision(true);
        setBallSpeed(newSpeed);
        next.x = playerPaddleRight;
        setRallyLength(prev => prev + 1);
      }
      
      // Computer paddle collision - more precise detection
      const computerPaddleLeft = GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH;
      
      if (ballSpeed.x > 0 && // Only check when ball is moving right
          ballRight >= computerPaddleLeft &&
          ballLeft < GAME_WIDTH - PADDLE_OFFSET && // Prevent triggering when ball is past paddle
          ballBottom >= computerY &&
          ballTop <= computerY + PADDLE_HEIGHT) {
        
        const newSpeed = handlePaddleCollision(false);
        setBallSpeed(newSpeed);
        next.x = computerPaddleLeft - BALL_SIZE;
        setRallyLength(prev => prev + 1);
      }

      // Scoring logic
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

  const updateComputerPosition = useCallback(() => {
    const computerSpeed = difficulty === 5 ? EASY_SPEED : 
                         difficulty === 7 ? MEDIUM_SPEED : 
                         HARD_SPEED;

    setComputerY(prev => {
      // Only move if the ball is moving towards the computer
      if (ballSpeed.x <= 0) {
        // Return to center when ball is moving away
        const centerY = GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2;
        const moveToCenter = centerY > prev ? 
          Math.min(prev + computerSpeed / 2, centerY) : 
          Math.max(prev - computerSpeed / 2, centerY);
        return moveToCenter;
      }

      const ballCenterY = ballPos.y + BALL_SIZE / 2;
      let targetY = ballCenterY - PADDLE_HEIGHT / 2;

      // Add prediction for ball position
      const timeToReach = (GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH - ballPos.x) / ballSpeed.x;
      targetY = ballCenterY + (ballSpeed.y * timeToReach * PREDICTION_FACTOR) - PADDLE_HEIGHT / 2;

      // Add randomness to make it less perfect
      if (difficulty === 5) { // Easy mode
        targetY += (Math.random() - 0.5) * PADDLE_HEIGHT * 0.5;
      } else if (difficulty === 7) { // Medium mode
        targetY += (Math.random() - 0.5) * PADDLE_HEIGHT * 0.3;
      }

      // Clamp target position
      targetY = Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, targetY));

      // Move towards target
      const diff = targetY - prev;
      if (Math.abs(diff) < computerSpeed) return targetY;
      return prev + Math.sign(diff) * computerSpeed;
    });
  }, [ballPos, ballSpeed, difficulty]);

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

        // Player paddle collision
        if (next.x <= PADDLE_OFFSET + PADDLE_WIDTH &&
            next.x >= PADDLE_OFFSET &&
            next.y + BALL_SIZE >= playerY &&
            next.y <= playerY + PADDLE_HEIGHT) {
          
          const newSpeed = handlePaddleCollision(true);
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
        
        // Computer paddle collision
        else if (next.x + BALL_SIZE >= GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH &&
                 next.x <= GAME_WIDTH - PADDLE_OFFSET &&
                 next.y + BALL_SIZE >= computerY &&
                 next.y <= computerY + PADDLE_HEIGHT) {
          
          const newSpeed = handlePaddleCollision(false);
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

        // Scoring logic
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

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setKeyState(prev => ({ ...prev, [e.key]: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setKeyState(prev => ({ ...prev, [e.key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update player paddle position based on key state
  useEffect(() => {
    if (!gameRunning) return;

    const movePlayer = () => {
      setPlayerY(prev => {
        let newY = prev;
        if (keyState.ArrowUp) newY -= PADDLE_SPEED;
        if (keyState.ArrowDown) newY += PADDLE_SPEED;
        return Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, newY));
      });
      frameIdRef.current = requestAnimationFrame(movePlayer);
    };

    frameIdRef.current = requestAnimationFrame(movePlayer);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [gameRunning, keyState]);

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
            ...getPaddleStyle(true),
            top: playerY
          }}
        />
        <Paddle 
          style={{
            ...getPaddleStyle(false),
            top: computerY
          }}
        />
        <Ball 
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            left: ballPos.x,
            top: ballPos.y,
            background: equippedSkin?.styles?.ball?.background || '#fff',
            boxShadow: equippedSkin?.styles?.ball?.boxShadow || '0 0 10px rgba(255, 255, 255, 0.5)',
            border: equippedSkin?.styles?.ball?.border || '2px solid rgba(255, 255, 255, 0.8)'
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