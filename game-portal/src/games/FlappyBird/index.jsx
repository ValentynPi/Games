import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { Bird, Background, Ground, Pipe, Score } from './styles';

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(300);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const gameLoopRef = useRef(null);
  const pipesRef = useRef([]);
  const navigate = useNavigate();

  const createPipes = () => {
    const gap = 150;
    const minHeight = 50;
    const maxHeight = 250;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;

    return {
      topHeight: height,
      bottomHeight: 600 - height - gap,
      x: 400,
      counted: false
    };
  };

  const updateGame = () => {
    if (!gameRunning) return;

    setBirdY(prev => {
      const newY = prev + birdVelocity;
      if (newY < 0 || newY > 500) {
        endGame();
        return prev;
      }
      return newY;
    });

    setBirdVelocity(prev => prev + 0.5);

    pipesRef.current = pipesRef.current.map(pipe => ({
      ...pipe,
      x: pipe.x - 1.5
    })).filter(pipe => pipe.x > -100);

    // Check collisions and update score
    pipesRef.current.forEach(pipe => {
      if (!pipe.counted && pipe.x < 160) {
        setScore(prev => prev + 1);
        pipe.counted = true;
      }
    });

    // Create new pipes
    if (pipesRef.current.length === 0 || pipesRef.current[pipesRef.current.length - 1].x < 250) {
      pipesRef.current.push(createPipes());
    }
  };

  const startGame = () => {
    setBirdY(300);
    setBirdVelocity(0);
    setScore(0);
    setShowMenu(false);
    setGameRunning(true);
    pipesRef.current = [];
    
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(updateGame, 16);
  };

  const endGame = () => {
    setGameRunning(false);
    clearInterval(gameLoopRef.current);
    if (score > highScore) setHighScore(score);
    setShowMenu(true);
  };

  const flap = () => {
    if (!gameRunning) return;
    setBirdVelocity(-7);
  };

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        flap();
      }
    };

    document.addEventListener('keydown', handleSpace);
    return () => {
      document.removeEventListener('keydown', handleSpace);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameRunning]);

  return (
    <>
      <GameContainer width="400px" height="600px" background="#70C5CE">
        <Background />
        {gameRunning && (
          <>
            <Bird
              style={{
                top: `${birdY}px`,
                transform: `rotate(${Math.min(birdVelocity * 3, 70)}deg)`
              }}
            />
            {pipesRef.current.map((pipe, index) => (
              <React.Fragment key={index}>
                <Pipe
                  className="top"
                  style={{
                    height: `${pipe.topHeight}px`,
                    left: `${pipe.x}px`
                  }}
                />
                <Pipe
                  className="bottom"
                  style={{
                    height: `${pipe.bottomHeight}px`,
                    left: `${pipe.x}px`,
                    bottom: 0
                  }}
                />
              </React.Fragment>
            ))}
          </>
        )}
        <Ground />
        <Score>{score}</Score>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Flappy Bird</h2>
          {score > 0 && <p>Score: {score}</p>}
          {highScore > 0 && <p>Best: {highScore}</p>}
          <Button as="button" onClick={startGame}>
            {score === 0 ? 'Start Game' : 'Play Again'}
          </Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </>
  );
};

export default FlappyBird; 