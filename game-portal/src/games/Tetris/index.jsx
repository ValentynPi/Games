import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../../contexts/CoinContext';
import { useInventory } from '../../contexts/InventoryContext';
import { CoinDisplay } from '../../components/CoinDisplay';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { 
  TetrisBoard, 
  Cell, 
  StatsPanel, 
  NextPieceDisplay, 
  Score, 
  Level, 
  Lines 
} from './styles';

// Tetromino shapes
const TETROMINOES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: '#00f0f0',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#0000f0',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#f0a000',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#f0f000',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#00f000',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#a000f0',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#f00000',
  },
};

const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_DROP_TIME = 1000;

const GameContainerStyled = styled.div`
  width: ${BLOCK_SIZE * BOARD_WIDTH}px;
  height: ${BLOCK_SIZE * BOARD_HEIGHT}px;
  border: 2px solid #2d8a4e;
  position: relative;
  background-color: #1a1a1a;
`;

const Block = styled.div`
  width: ${BLOCK_SIZE}px;
  height: ${BLOCK_SIZE}px;
  position: absolute;
  transition: all 0.1s linear;
  ${({ skin }) => {
    if (skin?.block) {
      return `
        background: ${skin.block.background || 'linear-gradient(135deg, #64B5F6, #1976D2)'};
        box-shadow: ${skin.block.boxShadow || '0 0 5px rgba(25, 118, 210, 0.5)'};
        border: ${skin.block.border || '1px solid #1565C0'};
      `;
    }
    return `
      background: linear-gradient(135deg, #64B5F6, #1976D2);
      box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
      border: 1px solid #1565C0;
    `;
  }}
`;

const Tetris = () => {
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  
  const navigate = useNavigate();
  const { addCoins } = useCoins();
  const { getEquippedSkin } = useInventory();
  const equippedSkin = getEquippedSkin('tetris');
  const boardRef = useRef(null);

  // Generate random tetromino
  const generateTetromino = useCallback(() => {
    const pieces = Object.keys(TETROMINOES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape: TETROMINOES[randomPiece].shape,
      color: TETROMINOES[randomPiece].color,
      name: randomPiece,
    };
  }, []);

  // Check collisions
  const checkCollision = useCallback((piece, pos) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  // Rotate piece
  const rotatePiece = useCallback((piece) => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    );
    return { ...piece, shape: rotated };
  }, []);

  // Clear completed lines
  const clearLines = useCallback(() => {
    let linesCleared = 0;
    const newBoard = board.reduce((acc, row) => {
      if (row.every(cell => cell)) {
        linesCleared++;
        acc.unshift(Array(BOARD_WIDTH).fill(0));
      } else {
        acc.push(row);
      }
      return acc;
    }, []);

    if (linesCleared > 0) {
      setScore(prev => prev + (linesCleared * 100 * level));
      setLines(prev => {
        const newLines = prev + linesCleared;
        if (Math.floor(newLines / 10) > Math.floor(prev / 10)) {
          setLevel(l => l + 1);
          setDropTime(time => Math.max(time * 0.8, 100));
        }
        return newLines;
      });
      setBoard(newBoard);
    }
  }, [board, level]);

  // Move piece
  const movePiece = useCallback((dir) => {
    if (!currentPiece || isPaused) return;

    const newPos = { ...position, x: position.x + dir };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    }
  }, [currentPiece, position, checkCollision, isPaused]);

  // Drop piece
  const dropPiece = useCallback(() => {
    if (!currentPiece || isPaused) return;

    const newPos = { ...position, y: position.y + 1 };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    } else {
      // Lock piece
      const newBoard = [...board];
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = position.y + y;
            if (boardY < 0) {
              setGameOver(true);
              setGameRunning(false);
              setShowMenu(true);
              return;
            }
            newBoard[boardY][position.x + x] = currentPiece.color;
          }
        });
      });

      setBoard(newBoard);
      clearLines();

      // Set next piece
      setCurrentPiece(nextPiece);
      setNextPiece(generateTetromino());
      setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    }
  }, [currentPiece, position, board, checkCollision, clearLines, generateTetromino, nextPiece, isPaused]);

  // Update keyboard event handling
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning || isPaused || !boardRef.current) return;

      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1);
          break;
        case 'ArrowRight':
          movePiece(1);
          break;
        case 'ArrowDown':
          dropPiece();
          break;
        case 'ArrowUp':
          const rotated = rotatePiece(currentPiece);
          if (!checkCollision(rotated, position)) {
            setCurrentPiece(rotated);
          }
          break;
        case ' ':
          while (!checkCollision(currentPiece, { ...position, y: position.y + 1 })) {
            setPosition(pos => ({ ...pos, y: pos.y + 1 }));
          }
          dropPiece();
          break;
        case 'Escape':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    if (boardRef.current) {
      boardRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, currentPiece, position, movePiece, dropPiece, rotatePiece, checkCollision, isPaused]);

  // Drop timer
  useEffect(() => {
    let dropTimer;
    if (gameRunning && !isPaused) {
      dropTimer = setInterval(dropPiece, dropTime);
    }
    return () => clearInterval(dropTimer);
  }, [dropPiece, dropTime, gameRunning, isPaused]);

  // Update startGame to focus the board
  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(generateTetromino());
    setNextPiece(generateTetromino());
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    setScore(0);
    setLines(0);
    setLevel(1);
    setDropTime(INITIAL_DROP_TIME);
    setGameOver(false);
    setIsPaused(false);
    setGameRunning(true);
    setShowMenu(false);
    
    if (boardRef.current) {
      boardRef.current.focus();
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#2c3e50',
      gap: '20px'
    }}>
      <CoinDisplay />
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'flex-start'
      }}>
        <TetrisBoard 
          ref={boardRef} 
          tabIndex="0"
          onKeyDown={(e) => e.preventDefault()} // Prevent scrolling with arrow keys
        >
          {board.map((row, y) => 
            row.map((cell, x) => (
              <Cell 
                key={`${y}-${x}`} 
                $color={cell}
              />
            ))
          )}
          {currentPiece && currentPiece.shape.map((row, y) => 
            row.map((cell, x) => (
              cell ? (
                <Cell
                  key={`piece-${y}-${x}`}
                  $color={currentPiece.color}
                  style={{
                    position: 'absolute',
                    top: `${(position.y + y) * 30}px`,
                    left: `${(position.x + x) * 30}px`,
                  }}
                />
              ) : null
            ))
          )}
        </TetrisBoard>

        <StatsPanel>
          <NextPieceDisplay>
            <h3>Next Piece</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 30px)',
              justifyContent: 'center',
              backgroundColor: '#000',
              padding: '10px',
              borderRadius: '4px'
            }}>
              {nextPiece && nextPiece.shape.map((row, y) => 
                row.map((cell, x) => (
                  <Cell
                    key={`next-${y}-${x}`}
                    $color={cell ? nextPiece.color : undefined}
                  />
                ))
              )}
            </div>
          </NextPieceDisplay>
          <Score>Score: {score}</Score>
          <Level>Level: {level}</Level>
          <Lines>Lines: {lines}</Lines>
        </StatsPanel>
      </div>

      {showMenu && (
        <Menu>
          <h2>Tetris</h2>
          <p>Use arrow keys to move</p>
          <p>Up arrow to rotate</p>
          <p>Space to drop</p>
          {gameOver && (
            <>
              <p>Game Over!</p>
              <p>Score: {score}</p>
              <p>Level: {level}</p>
              <p>Lines: {lines}</p>
            </>
          )}
          <Button onClick={startGame}>
            {gameOver ? 'Play Again' : 'Start Game'}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Menu
          </Button>
        </Menu>
      )}

      {isPaused && (
        <Menu>
          <h2>Paused</h2>
          <Button onClick={() => setIsPaused(false)}>Resume</Button>
          <Button onClick={() => navigate('/')}>Quit</Button>
        </Menu>
      )}
    </div>
  );
};

export default Tetris; 