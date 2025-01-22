import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { SnakeSegment, Food, GameOverlay, Score, Stats, PowerupItem, PowerupBar, PowerupIndicator, ComboDisplay, PauseMenu, CoinReward, PerfectBonus } from './styles';
import { useCoins } from '../../contexts/CoinContext';
import { CoinDisplay } from '../../components/CoinDisplay';

const GRID_SIZE = 20;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const INITIAL_SPEED = 100;
const CELL_SIZE = 20;

// Add new constants
const INITIAL_SNAKE_LENGTH = 3;
const SPEED_INCREASE_FACTOR = 0.95;
const BASE_GAME_SPEED = 150;
const MAX_SPEED = 50;
const POINTS_PER_FOOD = 10;

// Add new constants for enhanced gameplay
const POWERUP_TYPES = {
  SPEED_BOOST: { 
    color: '#3498db', 
    duration: 5000, 
    effect: 'Increases snake speed temporarily',
    symbol: '⚡'
  },
  SHIELD: { 
    color: '#f39c12', 
    duration: 8000, 
    effect: 'Allows passing through walls once',
    symbol: '🛡️'
  },
  DOUBLE_POINTS: { 
    color: '#9b59b6', 
    duration: 10000, 
    effect: 'Doubles points from food',
    symbol: '×2'
  }
};

// Update FOOD_TYPES with more variety
const FOOD_TYPES = {
  REGULAR: { points: 10, color: '#e74c3c', symbol: '🍎' },
  GOLDEN: { points: 30, color: '#f1c40f', symbol: '🌟' },
  SPECIAL: { points: 50, color: '#9b59b6', symbol: '💎' },
  BONUS: { points: 100, color: '#2ecc71', symbol: '🎁' }
};

const GOLDEN_APPLE_CHANCE = 0.15; // 15% chance for golden apple
const SPECIAL_APPLE_CHANCE = 0.05; // 5% chance for special apple

const getRandomPosition = (snakeBody) => {
  let attempts = 0;
  let newPos;

  while (attempts < 100) {
    newPos = {
      x: Math.floor(Math.random() * (GAME_WIDTH / CELL_SIZE)) * CELL_SIZE,
      y: Math.floor(Math.random() * (GAME_HEIGHT / CELL_SIZE)) * CELL_SIZE,
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

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [food, setFood] = useState(() => getRandomPosition([{ x: 200, y: 200 }]));
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

  // Update moveSnake function to properly handle scoring and coins
  const moveSnake = () => {
    if (isPaused || !gameRunning) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      
      // Update head position based on direction
      switch (direction) {
        case 'UP': head.y -= CELL_SIZE; break;
        case 'DOWN': head.y += CELL_SIZE; break;
        case 'LEFT': head.x -= CELL_SIZE; break;
        case 'RIGHT': head.x += CELL_SIZE; break;
        default: break;
      }

      // Check for collisions
      if (checkCollision(head)) {
        handleGameOver();
        return prevSnake;
      }

      // Add new head
      newSnake.unshift(head);

      // Check for food collision
      if (head.x === food.x && head.y === food.y) {
        // Update score and coins
        const newScore = score + (FOOD_TYPES[food.type].points * level);
        setScore(newScore);
        
        // Award coins for every 100 points
        const newCoinScore = Math.floor(newScore / 100);
        if (newCoinScore > lastCoinScore) {
          const coinsToAdd = (newCoinScore - lastCoinScore) * 10;
          addCoins(coinsToAdd);
          setLastCoinScore(newCoinScore);
        }

        setFoodEaten(prev => prev + 1);
        setFood(getRandomPosition(newSnake));
      } else {
        // Remove tail if no food was eaten
        newSnake.pop();
      }

      return newSnake;
    });
  };

  // Update createInitialSnake function to ensure proper initial length
  const createInitialSnake = () => {
    const snake = [];
    const startX = Math.floor(GAME_WIDTH / (2 * CELL_SIZE)) * CELL_SIZE;
    const startY = Math.floor(GAME_HEIGHT / (2 * CELL_SIZE)) * CELL_SIZE;
    
    // Create initial snake segments
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snake.push({
        x: startX - (i * CELL_SIZE), // Place segments to the left of the head
        y: startY
      });
    }
    return snake;
  };

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

  // Update game loop with consistent timing
  useEffect(() => {
    let intervalId;

    const gameLoop = () => {
      if (gameRunning && !isPaused) {
        moveSnake();
      }
    };

    if (gameRunning && !isPaused) {
      intervalId = setInterval(gameLoop, 150); // Adjust speed here
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameRunning, isPaused, direction]);

  // Add this useEffect for keyboard controls after the game loop useEffect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionQueue.current !== 'DOWN') {
            directionQueue.current = 'UP';
            setDirection('UP');
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionQueue.current !== 'UP') {
            directionQueue.current = 'DOWN';
            setDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionQueue.current !== 'RIGHT') {
            directionQueue.current = 'LEFT';
            setDirection('LEFT');
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionQueue.current !== 'LEFT') {
            directionQueue.current = 'RIGHT';
            setDirection('RIGHT');
          }
          break;
        default:
          break;
      }
    };

    // Add the event listener to document
    document.addEventListener('keydown', handleKeyPress);
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameRunning]);

  // Add pause handling
  useEffect(() => {
    const handlePause = (e) => {
      if (e.key === 'Escape' && gameRunning) {
        setIsPaused(prev => !prev);
      }
    };

    document.addEventListener('keydown', handlePause);
    return () => document.removeEventListener('keydown', handlePause);
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
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#1a1a1a'
    }}>
      <CoinDisplay />
      <GameContainer
        ref={gameContainerRef}
        style={{
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
          backgroundColor: '#000',
          position: 'relative',
          border: '2px solid #333',
          borderRadius: '4px',
          outline: 'none'
        }}
        tabIndex="0"
      >
        {snake.map((segment, index) => (
          <SnakeSegment
            key={index}
            $isHead={index === 0}
            style={{
              left: `${segment.x}px`,
              top: `${segment.y}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          />
        ))}
        <Food
          style={{
            left: `${food.x}px`,
            top: `${food.y}px`,
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
            backgroundColor: FOOD_TYPES[food.type].color,
            boxShadow: `0 0 15px ${FOOD_TYPES[food.type].color}99`
          }}
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
      </GameContainer>

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
    </div>
  );
};

export default Snake; 