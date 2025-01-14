import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { SnakeSegment, Food, Score, DifficultyButton } from './styles';

const Snake = () => {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState('right');
  const [nextDirection, setNextDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [gameSpeed, setGameSpeed] = useState(150);
  const gameLoopRef = useRef(null);
  const navigate = useNavigate();

  const createSnakeSegment = (x, y, isHead = false) => ({
    x,
    y,
    isHead
  });

  const createFood = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 30);
      y = Math.floor(Math.random() * 30);
    } while (snake.some(segment => segment.x === x && segment.y === y));
    
    setFood({ x, y });
  };

  const updateSnake = () => {
    if (!gameRunning) return;

    setDirection(nextDirection);
    const head = snake[0];
    let newX = head.x;
    let newY = head.y;

    switch(direction) {
      case 'up': newY--; break;
      case 'down': newY++; break;
      case 'left': newX--; break;
      case 'right': newX++; break;
      default: break;
    }

    // Check collision with walls
    if (newX < 0 || newX >= 30 || newY < 0 || newY >= 30) {
      endGame();
      return;
    }

    // Check collision with self
    if (snake.some(segment => segment.x === newX && segment.y === newY)) {
      endGame();
      return;
    }

    // Create new head
    const newSnake = [
      createSnakeSegment(newX, newY, true),
      ...snake.slice(0, -1).map(segment => ({
        ...segment,
        isHead: false
      }))
    ];

    // Check food collision
    if (food && newX === food.x && newY === food.y) {
      setSnake([...newSnake, snake[snake.length - 1]]);
      setScore(prev => prev + 10);
      createFood();
    } else {
      setSnake(newSnake);
    }
  };

  const startGame = () => {
    setSnake([
      createSnakeSegment(7, 15, true),
      createSnakeSegment(6, 15),
      createSnakeSegment(5, 15)
    ]);
    setDirection('right');
    setNextDirection('right');
    setScore(0);
    setShowMenu(false);
    setGameRunning(true);
    createFood();

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(updateSnake, gameSpeed);
  };

  const endGame = () => {
    setGameRunning(false);
    clearInterval(gameLoopRef.current);
    setShowMenu(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setNextDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setNextDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setNextDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setNextDirection('right');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction]);

  return (
    <>
      <GameContainer>
        {snake.map((segment, index) => (
          <SnakeSegment
            key={index}
            $isHead={segment.isHead}
            style={{
              left: `${segment.x * 20}px`,
              top: `${segment.y * 20}px`
            }}
          />
        ))}
        {food && (
          <Food
            style={{
              left: `${food.x * 20}px`,
              top: `${food.y * 20}px`
            }}
          />
        )}
        <Score>Score: {score}</Score>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Snake Game</h2>
          {score > 0 && <p>Final Score: {score}</p>}
          <div>
            <DifficultyButton
              $selected={gameSpeed === 150}
              onClick={() => setGameSpeed(150)}
            >
              Easy
            </DifficultyButton>
            <DifficultyButton
              $selected={gameSpeed === 100}
              onClick={() => setGameSpeed(100)}
            >
              Medium
            </DifficultyButton>
            <DifficultyButton
              $selected={gameSpeed === 50}
              onClick={() => setGameSpeed(50)}
            >
              Hard
            </DifficultyButton>
          </div>
          <Button as="button" onClick={startGame}>
            {score === 0 ? 'Start Game' : 'Play Again'}
          </Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </>
  );
};

export default Snake; 