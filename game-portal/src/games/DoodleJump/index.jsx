import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { 
  DoodleCharacter, 
  Platform, 
  Score, 
  GameWrapper,
  GameOverText 
} from './styles';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const GRAVITY = 0.4;
const JUMP_FORCE = -12;
const PLATFORM_COUNT = 8;
const PLATFORM_HEIGHT = 15;
const PLATFORM_WIDTH = 60;
const DOODLER_SIZE = 40;
const MOVEMENT_SPEED = 6;
const MAX_FALL_SPEED = 12;

const DoodleJump = () => {
  const [position, setPosition] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [platforms, setPlatforms] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [direction, setDirection] = useState(0);

  const gameRef = useRef(null);
  const frameIdRef = useRef(null);
  const navigate = useNavigate();

  // Generate random platforms
  const generatePlatforms = () => {
    const newPlatforms = [];
    for (let i = 0; i < PLATFORM_COUNT; i++) {
      newPlatforms.push({
        x: Math.random() * (GAME_WIDTH - PLATFORM_WIDTH),
        y: (GAME_HEIGHT / PLATFORM_COUNT) * i,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT
      });
    }
    return newPlatforms;
  };

  // Update platform collision detection
  const checkPlatformCollision = (doodler, platform) => {
    const doodlerBottom = doodler.y + DOODLER_SIZE;
    const doodlerRight = doodler.x + DOODLER_SIZE;
    const platformRight = platform.x + platform.width;
    
    // Only check collision when falling
    if (velocity.y <= 0) return false;

    return (
      doodler.x < platformRight &&
      doodlerRight > platform.x &&
      doodlerBottom >= platform.y &&
      doodlerBottom <= platform.y + platform.height + velocity.y && // Account for velocity
      velocity.y > 0 // Only collide when falling
    );
  };

  // Move platforms down
  const movePlatforms = (distance) => {
    setPlatforms(prevPlatforms => {
      const newPlatforms = prevPlatforms.map(platform => ({
        ...platform,
        y: platform.y + distance
      }));

      // Remove platforms that are off screen and add new ones
      const filteredPlatforms = newPlatforms.filter(
        platform => platform.y < GAME_HEIGHT
      );

      while (filteredPlatforms.length < PLATFORM_COUNT) {
        filteredPlatforms.unshift({
          x: Math.random() * (GAME_WIDTH - PLATFORM_WIDTH),
          y: filteredPlatforms[0].y - GAME_HEIGHT / PLATFORM_COUNT,
          width: PLATFORM_WIDTH,
          height: PLATFORM_HEIGHT
        });
      }

      return filteredPlatforms;
    });
  };

  // Update the keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowLeft':
          setDirection(-1);
          break;
        case 'ArrowRight':
          setDirection(1);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (direction < 0) setDirection(0);
          break;
        case 'ArrowRight':
          if (direction > 0) setDirection(0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameRunning, direction]);

  // Update game loop with improved physics
  useEffect(() => {
    let lastTime = 0;
    let accumulator = 0;
    const timeStep = 1000 / 60; // 60 FPS

    const gameLoop = (timestamp) => {
      if (!gameRunning) return;

      if (lastTime) {
        accumulator += timestamp - lastTime;
        
        // Update physics with fixed timestep
        while (accumulator >= timeStep) {
          setPosition(prevPos => {
            const newPos = {
              x: prevPos.x + direction * MOVEMENT_SPEED,
              y: prevPos.y + velocity.y
            };

            // Screen wrap-around with smooth transition
            if (newPos.x < -DOODLER_SIZE) {
              newPos.x = GAME_WIDTH;
            } else if (newPos.x > GAME_WIDTH) {
              newPos.x = -DOODLER_SIZE;
            }

            // Check platform collisions
            let hasCollided = false;
            platforms.forEach(platform => {
              if (checkPlatformCollision({ ...newPos }, platform)) {
                hasCollided = true;
                newPos.y = platform.y - DOODLER_SIZE; // Align with platform
                setVelocity(prev => ({ ...prev, y: JUMP_FORCE }));
              }
            });

            // Camera follow and platform movement
            if (newPos.y < GAME_HEIGHT / 2) {
              const diff = GAME_HEIGHT / 2 - newPos.y;
              newPos.y = GAME_HEIGHT / 2;
              movePlatforms(diff);
              setScore(prev => prev + Math.floor(diff));
            }

            // Game over condition
            if (newPos.y > GAME_HEIGHT + DOODLER_SIZE) {
              if (score > highScore) {
                setHighScore(score);
              }
              setGameOver(true);
              setGameRunning(false);
              setShowMenu(true);
              return prevPos;
            }

            return newPos;
          });

          // Update velocity with gravity
          setVelocity(prev => ({
            ...prev,
            y: Math.min(prev.y + GRAVITY, MAX_FALL_SPEED)
          }));

          accumulator -= timeStep;
        }
      }

      lastTime = timestamp;
      frameIdRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameRunning) {
      frameIdRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [gameRunning, direction, platforms]);

  // Update startGame function
  const startGame = () => {
    setPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 });
    setVelocity({ x: 0, y: 0 });
    setDirection(0);
    setPlatforms(generatePlatforms());
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
    setShowMenu(false);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#1a1a1a'
    }}>
      <GameContainer ref={gameRef}>
        <GameWrapper>
          <DoodleCharacter
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: `scaleX(${direction < 0 ? -1 : 1})`, // Face direction of movement
              transition: 'transform 0.1s' // Smooth direction change
            }}
          />
          {platforms.map((platform, index) => (
            <Platform
              key={index}
              style={{
                left: `${platform.x}px`,
                top: `${platform.y}px`,
                width: `${platform.width}px`,
                height: `${platform.height}px`
              }}
            />
          ))}
          <Score>Score: {Math.floor(score)}</Score>
        </GameWrapper>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Doodle Jump</h2>
          <p>Use arrow keys to move left and right</p>
          {gameOver && (
            <>
              <GameOverText>Game Over!</GameOverText>
              <p>Score: {Math.floor(score)}</p>
              <p>High Score: {Math.floor(highScore)}</p>
            </>
          )}
          <Button onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </div>
  );
};

export default DoodleJump; 