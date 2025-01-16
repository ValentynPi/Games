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
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [gameSpeed, setGameSpeed] = useState(150);
  const directionRef = useRef('right');
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

  const moveSnake = () => {
    setSnake(prevSnake => {
      if (!gameRunning) return prevSnake;

      const head = prevSnake[0];
      let newX = head.x;
      let newY = head.y;

      switch(directionRef.current) {
        case 'up': newY--; break;
        case 'down': newY++; break;
        case 'left': newX--; break;
        case 'right': newX++; break;
        default: break;
      }

      // Check collision with walls
      if (newX < 0 || newX >= 30 || newY < 0 || newY >= 30) {
        endGame();
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newX && segment.y === newY)) {
        endGame();
        return prevSnake;
      }

      const newSnake = [
        createSnakeSegment(newX, newY, true),
        ...prevSnake.slice(0, -1).map(segment => ({
          ...segment,
          isHead: false
        }))
      ];

      // Check if food is eaten
      if (food && newX === food.x && newY === food.y) {
        newSnake.push(prevSnake[prevSnake.length - 1]);
        setScore(s => s + 1);
        createFood();
      }

      return newSnake;
    });
  };

  const startGame = () => {
    const initialSnake = [
      createSnakeSegment(4, 2, true),
      createSnakeSegment(3, 2),
      createSnakeSegment(2, 2)
    ];
    
    setSnake(initialSnake);
    setDirection('right');
    directionRef.current = 'right';
    setScore(0);
    setShowMenu(false);
    setGameRunning(true);
    createFood();

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(moveSnake, gameSpeed);
  };

  const endGame = () => {
    setGameRunning(false);
    clearInterval(gameLoopRef.current);
    setShowMenu(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;

      switch(e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'down') {
            directionRef.current = 'up';
            setDirection('up');
          }
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'up') {
            directionRef.current = 'down';
            setDirection('down');
          }
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'right') {
            directionRef.current = 'left';
            setDirection('left');
          }
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'left') {
            directionRef.current = 'right';
            setDirection('right');
          }
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
  }, [gameRunning]);

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