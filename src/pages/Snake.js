import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GameContainer } from '../components/GameContainer';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';

const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${props => props.isHead ? '#27ae60' : '#2ecc71'};
  border-radius: 4px;
  transition: all 0.1s linear;
`;

const Food = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #e74c3c;
  border-radius: 50%;
`;

const Score = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
`;

function Snake() {
  const [gameRunning, setGameRunning] = useState(false);
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef(null);

  const createFood = () => {
    const x = Math.floor(Math.random() * 30);
    const y = Math.floor(Math.random() * 30);
    setFood({ x, y });
  };

  const startGame = () => {
    setGameRunning(true);
    setSnake([
      { x: 7, y: 15 },
      { x: 6, y: 15 },
      { x: 5, y: 15 }
    ]);
    setDirection('right');
    setScore(0);
    createFood();
  };

  const endGame = () => {
    setGameRunning(false);
    clearInterval(gameLoopRef.current);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowUp': 
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameRunning) {
      gameLoopRef.current = setInterval(() => {
        setSnake(prevSnake => {
          const head = { ...prevSnake[0] };
          
          switch(direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
            default: break;
          }

          // Check collisions
          if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 ||
              prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame();
            return prevSnake;
          }

          const newSnake = [head, ...prevSnake];
          
          // Check food collision
          if (food && head.x === food.x && head.y === food.y) {
            setScore(s => s + 10);
            createFood();
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      }, 150);

      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameRunning, direction, food]);

  return (
    <GameContainer width="600px" height="600px">
      {snake.map((segment, index) => (
        <SnakeSegment
          key={index}
          isHead={index === 0}
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

      {!gameRunning && (
        <Menu>
          <h2>Snake Game</h2>
          <p>Use arrow keys to control the snake</p>
          <p>Final Score: {score}</p>
          <Button as="button" onClick={startGame}>
            {score === 0 ? 'Start Game' : 'Play Again'}
          </Button>
          <Button to="/">Home</Button>
        </Menu>
      )}
    </GameContainer>
  );
}

export default Snake; 