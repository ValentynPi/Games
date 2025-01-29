import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { useCoins } from '../../contexts/CoinContext';
import { useInventory } from '../../contexts/InventoryContext';
import { CoinDisplay } from '../../components/CoinDisplay';
import {
  SnakeGameContainer,
  SnakeSegment,
  Food,
  Score,
  Stats,
  PowerupBar,
  PowerupIndicator,
  ComboDisplay,
  PauseMenu,
  CoinReward
} from './styles';
import { 
  CELL_SIZE, 
  GRID_SIZE, 
  INITIAL_SNAKE_LENGTH, 
  POWERUP_TYPES,
  FOOD_TYPES 
} from './constants';

// Game constants
const GAME_WIDTH = GRID_SIZE * CELL_SIZE;
const GAME_HEIGHT = GRID_SIZE * CELL_SIZE;
const BASE_GAME_SPEED = 150;
const SPEED_INCREASE = 2;
const SPECIAL_APPLE_CHANCE = 0.1;
const GOLDEN_APPLE_CHANCE = 0.05;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 2rem;
`;

const GameWrapper = styled.div`
  position: relative;
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  margin: 2rem auto;
`;

const getRandomPosition = (snakeBody) => {
  let attempts = 0;
  let newPos;

  while (attempts < 100) {
    newPos = {
      x: Math.floor(Math.random() * (GAME_WIDTH / CELL_SIZE)),
      y: Math.floor(Math.random() * (GAME_HEIGHT / CELL_SIZE)),
      type: decideFoodType()
    };

    let overlaps = false;
    for (const segment of snakeBody) {
      if (segment.x === newPos.x && segment.y === newPos.y) {
        overlaps = true;
        break;
      }
    }

    if (!overlaps) {
      return newPos;
    }
    attempts++;
  }

  return newPos;
};

// Add function to decide food type
const decideFoodType = () => {
  const random = Math.random();
  if (random < SPECIAL_APPLE_CHANCE) return 'SPECIAL';
  if (random < GOLDEN_APPLE_CHANCE) return 'GOLDEN';
  return 'REGULAR';
};

// Add createInitialSnake function at the top with other utility functions
const createInitialSnake = () => {
  const center = Math.floor(GRID_SIZE / 2);
  return Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
    x: center - i,
    y: center
  }));
};

const Snake = () => {
  // Update initial snake state to use createInitialSnake
  const [snake, setSnake] = useState(createInitialSnake());
  const [food, setFood] = useState(() => ({
    ...getRandomPosition([{ x: 10, y: 10 }]),
    type: FOOD_TYPES.REGULAR
  }));
  const [direction, setDirection] = useState('RIGHT');
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const frameIdRef = useRef(null);
  const navigate = useNavigate();
  const gameContainerRef = useRef(null);

  // Add a direction queue to handle rapid key presses
  const directionQueue = useRef('RIGHT');

  // Add new state variables
  const [gameSpeed, setGameSpeed] = useState(BASE_GAME_SPEED);
  const [highScore, setHighScore] = useState(0);
  const [foodEaten, setFoodEaten] = useState(0);
  const [level, setLevel] = useState(1);

  // Add new state variables to Snake component
  const [activePowerups, setActivePowerups] = useState([]);
  const [powerup, setPowerup] = useState(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeAlive, setTimeAlive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTrail, setShowTrail] = useState(true);
  const [currentPowerup, setCurrentPowerup] = useState(null);

  // Add this with other refs at the top of the component
  const currentFoodRef = useRef(null);

  const { addCoins } = useCoins();
  const [lastCoinScore, setLastCoinScore] = useState(0);
  const { getEquippedSkin } = useInventory();
  const equippedSkin = getEquippedSkin('snake');

  const checkCollision = (head) => {
    // Wall collision
    if (
      head.x < 0 ||
      head.x >= GAME_WIDTH ||
      head.y < 0 ||
      head.y >= GAME_HEIGHT
    ) {
      return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || isPaused) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      switch (directionQueue.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      if (checkCollision(head)) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake.slice(0, -1)];

      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        // Grow snake
        newSnake.push(prevSnake[prevSnake.length - 1]);
        
        // Update score and food
        setScore(prev => prev + 10);
        setFood(getRandomPosition(newSnake));
        setFoodEaten(prev => prev + 1);
        
        // Increase speed
        if (foodEaten > 0 && foodEaten % 5 === 0) {
          setGameSpeed(prev => Math.max(prev - SPEED_INCREASE, 50));
          setLevel(prev => prev + 1);
        }
      }

      return newSnake;
    });
  }, [gameRunning, isPaused, food, checkCollision, foodEaten]);

  // Update game loop
  useEffect(() => {
    let gameInterval;
    
    if (gameRunning && !isPaused) {
      gameInterval = setInterval(moveSnake, gameSpeed);
    }
    
    return () => {
      if (gameInterval) {
        clearInterval(gameInterval);
      }
    };
  }, [gameRunning, isPaused, gameSpeed, moveSnake]);

  // Add powerup generation logic
  const generatePowerup = () => {
    if (Math.random() < 0.1 && !powerup) { // 10% chance to spawn powerup
      const types = Object.keys(POWERUP_TYPES);
      const type = types[Math.floor(Math.random() * types.length)];
      const pos = getRandomPosition(snake);
      setPowerup({
        ...pos,
        type,
        expiresAt: Date.now() + POWERUP_TYPES[type].duration
      });
    }
  };

  // Add handleGameOver function before the moveSnake function
  const handleGameOver = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    setGameOver(true);
    setGameRunning(false);
    setShowMenu(true);
  };

  const handleKeyDown = useCallback((e) => {
    if (!gameRunning || isPaused) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction !== 'DOWN') {
          directionQueue.current = 'UP';
          setDirection('UP');
        }
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction !== 'UP') {
          directionQueue.current = 'DOWN';
          setDirection('DOWN');
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction !== 'RIGHT') {
          directionQueue.current = 'LEFT';
          setDirection('LEFT');
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction !== 'LEFT') {
          directionQueue.current = 'RIGHT';
          setDirection('RIGHT');
        }
        break;
      case 'Escape':
        setIsPaused(prev => !prev);
        break;
      default:
        break;
    }
  }, [gameRunning, isPaused, direction]);

  // Remove the old keyboard event listeners since we're now using onKeyDown prop
  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, [gameRunning]);

  // Update startGame function
  const startGame = () => {
    const initialSnake = createInitialSnake();
    const initialFood = getRandomPosition(initialSnake);
    setSnake(initialSnake);
    directionQueue.current = 'RIGHT';
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
    setShowMenu(false);
    setFood(initialFood);
    currentFoodRef.current = initialFood; // Initialize food ref
    setGameSpeed(BASE_GAME_SPEED);
    setFoodEaten(0);
    setLevel(1);
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  };

  return (
    <PageContainer>
      <GameWrapper>
        <GameContainer>
          <SnakeGameContainer
            ref={gameContainerRef}
            tabIndex="0"
            $width={GAME_WIDTH}
            $height={GAME_HEIGHT}
            onKeyDown={handleKeyDown}
          >
            {snake.map((segment, index) => (
              <SnakeSegment
                key={index}
                style={{
                  left: `${segment.x * CELL_SIZE}px`,
                  top: `${segment.y * CELL_SIZE}px`
                }}
                isHead={index === 0}
                skin={equippedSkin?.styles}
              />
            ))}
            <Food
              style={{
                left: `${food.x * CELL_SIZE}px`,
                top: `${food.y * CELL_SIZE}px`
              }}
              skin={equippedSkin?.styles}
            />
            <Score>Score: {score}</Score>
            <Stats>
              Level: {level}<br/>
              Speed: {Math.floor((BASE_GAME_SPEED - gameSpeed) / BASE_GAME_SPEED * 100)}%<br/>
              Food: {foodEaten}<br/>
              Time: {Math.floor(timeAlive / 10)}s<br/>
              Max Combo: {maxCombo}
            </Stats>

            {/* Add powerup display */}
            {powerup && (
              <PowerupItem
                style={{
                  left: `${powerup.x}px`,
                  top: `${powerup.y}px`,
                  backgroundColor: POWERUP_TYPES[powerup.type].color
                }}
              >
                {POWERUP_TYPES[powerup.type].symbol}
              </PowerupItem>
            )}

            {/* Add active powerup indicators */}
            <PowerupBar>
              {activePowerups.map((type, index) => (
                <PowerupIndicator
                  key={index}
                  $color={POWERUP_TYPES[type].color}
                >
                  {POWERUP_TYPES[type].symbol}
                </PowerupIndicator>
              ))}
            </PowerupBar>

            {/* Add combo display */}
            {combo > 1 && (
              <ComboDisplay>
                Combo: x{combo}
              </ComboDisplay>
            )}

            {/* Add pause menu */}
            {isPaused && (
              <PauseMenu>
                <h2>Paused</h2>
                <p>Press ESC to resume</p>
                <Button onClick={() => setIsPaused(false)}>Resume</Button>
                <Button onClick={() => navigate('/')}>Quit</Button>
              </PauseMenu>
            )}
          </SnakeGameContainer>
        </GameContainer>
      </GameWrapper>

      {showMenu && (
        <Menu>
          <h2>Snake</h2>
          <p>Use arrow keys or WASD to control the snake</p>
          {gameOver && (
            <>
              <p>Game Over!</p>
              <p>Score: {score}</p>
              <p>High Score: {highScore}</p>
              <p>Level Reached: {level}</p>
              <p>Food Eaten: {foodEaten}</p>
              {lastCoinScore > 0 && (
                <CoinReward>
                  +{lastCoinScore * 10} Coins Earned!
                </CoinReward>
              )}
            </>
          )}
          <Button as="button" onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </Button>
          <Button
            as="button"
            onClick={() => {
              if (frameIdRef.current) {
                clearTimeout(frameIdRef.current);
              }
              navigate('/', { replace: true });
            }}
          >
            Home
          </Button>
        </Menu>
      )}
    </PageContainer>
  );
};

export default Snake; 