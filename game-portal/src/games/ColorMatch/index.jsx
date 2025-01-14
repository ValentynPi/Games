import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { Block, Zone, Score, Combo, Timer, ComboText, DifficultyButton } from './styles';

const COLORS = [
  { name: 'red', hex: '#e74c3c' },
  { name: 'blue', hex: '#3498db' },
  { name: 'green', hex: '#2ecc71' },
  { name: 'yellow', hex: '#f1c40f' },
  { name: 'purple', hex: '#9b59b6' }
];

const ColorMatch = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [currentBlocks, setCurrentBlocks] = useState([]);
  const gameLoopRef = useRef(null);
  const navigate = useNavigate();

  const createBlock = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      id: Math.random(),
      color: color,
      x: Math.random() * (window.innerWidth - 50),
      y: -50,
      speed: gameSpeed
    };
  };

  const showComboText = (x, y, text) => {
    const comboText = document.createElement('div');
    comboText.style.position = 'absolute';
    comboText.style.left = `${x}px`;
    comboText.style.top = `${y}px`;
    comboText.textContent = text;
    document.body.appendChild(comboText);

    setTimeout(() => {
      comboText.style.transform = 'translateY(-50px)';
      comboText.style.opacity = '0';
      setTimeout(() => comboText.remove(), 500);
    }, 100);
  };

  const updateBlocks = () => {
    setCurrentBlocks(prev => {
      return prev.map(block => ({
        ...block,
        y: block.y + block.speed
      })).filter(block => {
        if (block.y > window.innerHeight - 150) {
          const blockCenter = block.x + 25;
          const zoneWidth = window.innerWidth / COLORS.length;
          const zoneIndex = Math.floor(blockCenter / zoneWidth);
          
          if (block.y > window.innerHeight - 50) {
            if (block.color.name === COLORS[zoneIndex].name) {
              const points = 10 * combo;
              setScore(s => s + points);
              setCombo(c => c + 1);
              showComboText(block.x, block.y, `+${points}!`);
            } else {
              setCombo(1);
            }
            return false;
          }
        }
        return block.y <= window.innerHeight;
      });
    });
  };

  const startGame = () => {
    setScore(0);
    setCombo(1);
    setTimeLeft(60);
    setCurrentBlocks([]);
    setShowMenu(false);
    setGameRunning(true);

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(() => {
      if (Math.random() < 0.05) {
        setCurrentBlocks(prev => [...prev, createBlock()]);
      }
      updateBlocks();
      setTimeLeft(prev => {
        const newTime = prev - 1/60;
        if (newTime <= 0) {
          endGame();
          return 0;
        }
        return newTime;
      });
    }, 16);
  };

  const endGame = () => {
    setGameRunning(false);
    clearInterval(gameLoopRef.current);
    setShowMenu(true);
  };

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  return (
    <>
      <GameContainer>
        {currentBlocks.map(block => (
          <Block
            key={block.id}
            style={{
              backgroundColor: block.color.hex,
              left: block.x,
              top: block.y
            }}
          />
        ))}
        {COLORS.map((color, index) => {
          const width = `${100 / COLORS.length}%`;
          return (
            <Zone
              key={color.name}
              style={{
                left: `${(index * 100) / COLORS.length}%`,
                width,
                backgroundColor: color.hex
              }}
            >
              ⬆
            </Zone>
          );
        })}
        <Score>Score: {score}</Score>
        <Combo>Combo: x{combo}</Combo>
        <Timer>{Math.ceil(timeLeft)}</Timer>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Color Match</h2>
          {score > 0 && <p>Final Score: {score}</p>}
          <div>
            <DifficultyButton
              $selected={gameSpeed === 2}
              onClick={() => setGameSpeed(2)}
            >
              Easy
            </DifficultyButton>
            <DifficultyButton
              $selected={gameSpeed === 3}
              onClick={() => setGameSpeed(3)}
            >
              Medium
            </DifficultyButton>
            <DifficultyButton
              $selected={gameSpeed === 4}
              onClick={() => setGameSpeed(4)}
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

export default ColorMatch; 