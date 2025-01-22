import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { 
  GameBoard, 
  Block, 
  LevelCounter, 
  MovesCounter,
  Controls,
  GameInfo,
  HintText,
  DIFFICULTY_COLORS,
  TutorialOverlay,
  TutorialBox,
  CoinReward,
  PerfectBonus,
  Timer,
  HintButton,
  UndoButton,
  RedoButton,
  ControlButtons,
  TimeBonus,
  SoundButton
} from './styles';
import { useCoins } from '../../contexts/CoinContext';
import { CoinDisplay } from '../../components/CoinDisplay';
import useSound from 'use-sound';

// Mock sound function for when sound files are not available
const mockSound = () => {};
const mockSoundHook = [mockSound];

// Since we don't have the actual sound files yet, we'll use empty strings
// This will make the sounds silent but the game will still work
const moveSound = '';
const winSound = '';
const selectSound = '';
const perfectSound = '';

const BOARD_SIZE = 6;
const CELL_SIZE = 80;
const MAIN_BLOCK_COLOR = '#e74c3c';
const VERTICAL_BLOCK_COLOR = '#3498db';
const HORIZONTAL_BLOCK_COLOR = '#2ecc71';

// Update the LEVELS constant with properly designed, solvable puzzles
const LEVELS = [
  // Level 1 - Tutorial (Simple slide right)
  {
    blocks: [
      { id: 'main', x: 1, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 0, y: 0, length: 2, isHorizontal: false },
    ],
    exitY: 2,
    difficulty: 'Tutorial',
    minMoves: 2
  },
  // Level 2 - Very Easy
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 1, length: 2, isHorizontal: false },
      { id: '2', x: 2, y: 3, length: 2, isHorizontal: true },
    ],
    exitY: 2,
    difficulty: 'Very Easy',
    minMoves: 4
  },
  // Level 3 - Easy
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 0, length: 2, isHorizontal: false },
      { id: '2', x: 2, y: 3, length: 2, isHorizontal: true },
      { id: '3', x: 4, y: 1, length: 2, isHorizontal: false },
    ],
    exitY: 2,
    difficulty: 'Easy',
    minMoves: 6
  },
  // Level 4 - Medium
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 0, length: 3, isHorizontal: false },
      { id: '2', x: 3, y: 1, length: 2, isHorizontal: true },
      { id: '3', x: 3, y: 3, length: 2, isHorizontal: true },
      { id: '4', x: 5, y: 0, length: 2, isHorizontal: false },
    ],
    exitY: 2,
    difficulty: 'Medium',
    minMoves: 8
  },
  // Level 5 - Medium+
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 0, length: 2, isHorizontal: true },
      { id: '2', x: 2, y: 1, length: 2, isHorizontal: false },
      { id: '3', x: 3, y: 3, length: 2, isHorizontal: true },
      { id: '4', x: 4, y: 0, length: 3, isHorizontal: false },
    ],
    exitY: 2,
    difficulty: 'Medium',
    minMoves: 10
  },
  // Level 6 - Hard
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 0, length: 2, isHorizontal: false },
      { id: '2', x: 2, y: 3, length: 2, isHorizontal: true },
      { id: '3', x: 3, y: 1, length: 2, isHorizontal: true },
      { id: '4', x: 4, y: 2, length: 2, isHorizontal: false },
      { id: '5', x: 5, y: 0, length: 2, isHorizontal: false }
    ],
    exitY: 2,
    difficulty: 'Hard',
    minMoves: 12
  },
  // Level 7 - Hard+
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 0, length: 2, isHorizontal: true },
      { id: '2', x: 2, y: 1, length: 2, isHorizontal: false },
      { id: '3', x: 3, y: 3, length: 2, isHorizontal: true },
      { id: '4', x: 4, y: 0, length: 2, isHorizontal: false },
      { id: '5', x: 4, y: 3, length: 2, isHorizontal: false }
    ],
    exitY: 2,
    difficulty: 'Hard',
    minMoves: 15
  },
  // Level 8 - Expert
  {
    blocks: [
      { id: 'main', x: 0, y: 2, length: 2, isHorizontal: true, isMain: true },
      { id: '1', x: 2, y: 0, length: 2, isHorizontal: false },
      { id: '2', x: 2, y: 3, length: 2, isHorizontal: true },
      { id: '3', x: 3, y: 1, length: 2, isHorizontal: true },
      { id: '4', x: 4, y: 2, length: 2, isHorizontal: false },
      { id: '5', x: 4, y: 4, length: 2, isHorizontal: true }
    ],
    exitY: 2,
    difficulty: 'Expert',
    minMoves: 18
  }
];

// Difficulty multipliers for coin rewards
const DIFFICULTY_MULTIPLIERS = {
  'Tutorial': 0.5,
  'Very Easy': 1,
  'Easy': 1.5,
  'Medium': 2,
  'Hard': 2.5,
  'Expert': 3
};

const TIME_BONUS_THRESHOLD = 60; // seconds

const UnblockMe = () => {
  const [currentLevel, setCurrentLevel] = useState(() => {
    const saved = localStorage.getItem('unblockme_level');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [blocks, setBlocks] = useState(LEVELS[currentLevel].blocks);
  const [moves, setMoves] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('unblockme_completed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [earnedCoins, setEarnedCoins] = useState(0);
  
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('unblockme_sound');
    return saved ? JSON.parse(saved) : true;
  });

  // Sound hooks with fallback
  const soundHooks = {
    move: useSound(moveSound, { volume: 0.5, soundEnabled }) || mockSoundHook,
    win: useSound(winSound, { volume: 0.5, soundEnabled }) || mockSoundHook,
    select: useSound(selectSound, { volume: 0.3, soundEnabled }) || mockSoundHook,
    perfect: useSound(perfectSound, { volume: 0.5, soundEnabled }) || mockSoundHook
  };

  const playMove = soundHooks.move[0];
  const playWin = soundHooks.win[0];
  const playSelect = soundHooks.select[0];
  const playPerfect = soundHooks.perfect[0];

  const navigate = useNavigate();
  const { addCoins } = useCoins();

  const [lastMoveTime, setLastMoveTime] = useState(0);
  const MOVE_DELAY = 100; // ms between moves

  const moveCountedRef = useRef(false);
  const levelCompletedRef = useRef(false);

  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const TUTORIAL_STEPS = [
    {
      title: "Welcome to Unblock Me!",
      text: "The goal is to get the red block to the exit on the right side.",
      highlight: "main"
    },
    {
      title: "Select a Block",
      text: "Click on any block to select it. The selected block will be highlighted.",
      highlight: null
    },
    {
      title: "Move Blocks",
      text: "Use arrow keys or WASD to move the selected block. Horizontal blocks can only move left/right, vertical blocks can only move up/down.",
      highlight: null
    },
    {
      title: "Reach the Exit",
      text: "Move other blocks out of the way to create a path for the red block to reach the exit.",
      highlight: "main"
    },
    {
      title: "Ready to Play!",
      text: "Try to complete each level with the minimum number of moves. Good luck!",
      highlight: null
    }
  ];

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    localStorage.setItem('unblockme_level', currentLevel.toString());
    localStorage.setItem('unblockme_completed', JSON.stringify([...completedLevels]));
    localStorage.setItem('unblockme_sound', JSON.stringify(soundEnabled));
  }, [currentLevel, completedLevels, soundEnabled]);

  const startGame = () => {
    if (gameWon && currentLevel < LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setBlocks(LEVELS[currentLevel + 1].blocks);
    } else {
      setBlocks(LEVELS[currentLevel].blocks);
    }
    setMoves(0);
    setTimer(0);
    setShowMenu(false);
    setGameWon(false);
    setSelectedBlock(null);
    setEarnedCoins(0);
    setMoveHistory([]);
    setCurrentMoveIndex(-1);
    setHintsUsed(0);
    setIsTimerRunning(true);
    levelCompletedRef.current = false;
  };

  const handleLevelComplete = useCallback(() => {
    if (!levelCompletedRef.current) {
      setIsTimerRunning(false);
      
      const difficulty = LEVELS[currentLevel].difficulty;
      const baseCoins = 50;
      const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty];
      const perfectBonus = moves <= LEVELS[currentLevel].minMoves ? 25 : 0;
      const timeBonus = timer <= TIME_BONUS_THRESHOLD ? 15 : 0;
      const hintPenalty = hintsUsed * -5;

      const totalCoins = Math.max(0, Math.round(
        (baseCoins + perfectBonus + timeBonus + hintPenalty) * difficultyMultiplier
      ));

      setEarnedCoins(totalCoins);
      addCoins(totalCoins);

      if (perfectBonus > 0) {
        soundHooks.perfect[0]();
      }
      soundHooks.win[0]();

      levelCompletedRef.current = true;
    }
  }, [currentLevel, moves, timer, hintsUsed, addCoins, soundHooks]);

  const addToHistory = useCallback((newBlocks) => {
    setMoveHistory(prev => {
      const newHistory = prev.slice(0, currentMoveIndex + 1);
      newHistory.push(newBlocks);
      return newHistory;
    });
    setCurrentMoveIndex(prev => prev + 1);
  }, [currentMoveIndex]);

  const checkCollision = useCallback((blocks, movedBlock) => {
    const movedBounds = {
      left: movedBlock.x,
      right: movedBlock.x + (movedBlock.isHorizontal ? movedBlock.length : 1),
      top: movedBlock.y,
      bottom: movedBlock.y + (movedBlock.isHorizontal ? 1 : movedBlock.length)
    };

    return blocks.some(block => {
      if (block.id === movedBlock.id) return false;

      const blockBounds = {
        left: block.x,
        right: block.x + (block.isHorizontal ? block.length : 1),
        top: block.y,
        bottom: block.y + (block.isHorizontal ? 1 : block.length)
      };

      return !(movedBounds.right <= blockBounds.left ||
               movedBounds.left >= blockBounds.right ||
               movedBounds.bottom <= blockBounds.top ||
               movedBounds.top >= blockBounds.bottom);
    });
  }, []);

  const moveBlock = useCallback((direction) => {
    const now = Date.now();
    if (now - lastMoveTime < MOVE_DELAY) return;
    
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const blockIndex = newBlocks.findIndex(b => b.id === selectedBlock?.id);
      if (blockIndex === -1) return prevBlocks;
      
      const block = { ...newBlocks[blockIndex] };
      let newPos = { ...block };

      // Calculate new position
      if (block.isHorizontal && (direction === 'LEFT' || direction === 'RIGHT')) {
        newPos.x = block.x + (direction === 'LEFT' ? -1 : 1);
      } else if (!block.isHorizontal && (direction === 'UP' || direction === 'DOWN')) {
        newPos.y = block.y + (direction === 'UP' ? -1 : 1);
      } else {
        return prevBlocks;
      }

      // Boundary checking
      if (newPos.x < 0 || 
          newPos.y < 0 || 
          newPos.y + (block.isHorizontal ? 1 : block.length) > BOARD_SIZE ||
          (newPos.x + (block.isHorizontal ? block.length : 1) > BOARD_SIZE && 
           !(block.isMain && block.y === LEVELS[currentLevel].exitY))) {
        return prevBlocks;
      }

      // Check collision
      if (checkCollision(newBlocks, newPos)) {
        return prevBlocks;
      }

      // Update block position
      newBlocks[blockIndex] = newPos;
      
      // Play move sound
      soundHooks.move[0]();

      // Add to history and count move
      if (!moveCountedRef.current) {
        setMoves(prev => prev + 1);
        moveCountedRef.current = true;
      }

      // Special case for main block reaching exit
      if (block.isMain && newPos.x + block.length > BOARD_SIZE) {
        if (block.y === LEVELS[currentLevel].exitY) {
          setGameWon(true);
          setShowMenu(true);
          setCompletedLevels(prev => new Set([...prev, currentLevel]));
          handleLevelComplete();
        }
      }

      setLastMoveTime(now);
      addToHistory(newBlocks);
      return newBlocks;
    });
  }, [
    lastMoveTime,
    selectedBlock,
    currentLevel,
    soundHooks,
    checkCollision,
    addToHistory,
    handleLevelComplete
  ]);

  const handleBlockClick = useCallback((block) => {
    if (gameWon) return;
    soundHooks.select[0]();
    if (selectedBlock?.id !== block.id) {
      moveCountedRef.current = false;
    }
    setSelectedBlock(block);
  }, [gameWon, selectedBlock, soundHooks]);

  // Initialize move history when level changes
  useEffect(() => {
    if (blocks && blocks.length > 0) {
      setMoveHistory([blocks]);
      setCurrentMoveIndex(0);
    }
  }, [blocks]);

  const showNextHint = () => {
    setHintsUsed(prev => prev + 1);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 2000);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const startTutorial = () => {
    setShowTutorial(true);
    setTutorialStep(0);
    setCurrentLevel(0);
    setBlocks(LEVELS[0].blocks);
    setMoves(0);
    setShowMenu(false);
    setGameWon(false);
    setSelectedBlock(null);
  };

  const nextTutorialStep = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
    }
  };

  useEffect(() => {
    const handleKeyUp = () => {
      moveCountedRef.current = false;
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedBlock || gameWon || showMenu) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveBlock('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveBlock('RIGHT');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          moveBlock('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moveBlock('DOWN');
          break;
        case 'Escape':
          setSelectedBlock(null);
          break;
        case 'z':
        case 'Z':
          if (e.ctrlKey || e.metaKey) {
            if (currentMoveIndex > 0) {
              setCurrentMoveIndex(prev => prev - 1);
              setBlocks(moveHistory[currentMoveIndex - 1]);
              setMoves(prev => prev - 1);
            }
          }
          break;
        case 'y':
        case 'Y':
          if (e.ctrlKey || e.metaKey) {
            if (currentMoveIndex < moveHistory.length - 1) {
              setCurrentMoveIndex(prev => prev + 1);
              setBlocks(moveHistory[currentMoveIndex + 1]);
              setMoves(prev => prev + 1);
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlock, gameWon, showMenu, currentMoveIndex, moveBlock, moveHistory]);

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
      <GameContainer>
        <GameBoard $exitY={LEVELS[currentLevel].exitY}>
          {blocks.map(block => (
            <Block
              key={block.id}
              $isHorizontal={block.isHorizontal}
              $isMain={block.isMain}
              $length={block.length}
              $isSelected={selectedBlock?.id === block.id}
              $isHighlighted={showHint && block.isMain}
              style={{
                transform: `translate(${block.x * CELL_SIZE}px, ${block.y * CELL_SIZE}px)`,
                backgroundColor: block.isMain ? MAIN_BLOCK_COLOR :
                               block.isHorizontal ? HORIZONTAL_BLOCK_COLOR :
                               VERTICAL_BLOCK_COLOR
              }}
              onClick={() => handleBlockClick(block)}
            />
          ))}
          {showTutorial && (
            <TutorialOverlay>
              <TutorialBox>
                <h3>{TUTORIAL_STEPS[tutorialStep].title}</h3>
                <p>{TUTORIAL_STEPS[tutorialStep].text}</p>
                <Button onClick={nextTutorialStep}>
                  {tutorialStep < TUTORIAL_STEPS.length - 1 ? 'Next' : 'Start Playing'}
                </Button>
              </TutorialBox>
            </TutorialOverlay>
          )}
        </GameBoard>
        <Controls>
          <GameInfo>
            <LevelCounter $difficulty={LEVELS[currentLevel].difficulty}>
              Level: {currentLevel + 1}
              <span>{LEVELS[currentLevel].difficulty}</span>
            </LevelCounter>
            <MovesCounter $overMinMoves={moves > LEVELS[currentLevel].minMoves}>
              Moves: <span>{moves}</span> (Min: {LEVELS[currentLevel].minMoves})
            </MovesCounter>
            <Timer>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Timer>
          </GameInfo>
          <ControlButtons>
            <UndoButton onClick={() => {
              if (currentMoveIndex > 0) {
                setCurrentMoveIndex(prev => prev - 1);
                setBlocks(moveHistory[currentMoveIndex - 1]);
                setMoves(prev => prev - 1);
              }
            }} disabled={currentMoveIndex <= 0}>↩</UndoButton>
            <RedoButton onClick={() => {
              if (currentMoveIndex < moveHistory.length - 1) {
                setCurrentMoveIndex(prev => prev + 1);
                setBlocks(moveHistory[currentMoveIndex + 1]);
                setMoves(prev => prev + 1);
              }
            }} disabled={currentMoveIndex >= moveHistory.length - 1}>↪</RedoButton>
            <HintButton onClick={showNextHint} disabled={hintsUsed >= 3}>💡</HintButton>
            <SoundButton onClick={toggleSound}>{soundEnabled ? '🔊' : '🔇'}</SoundButton>
          </ControlButtons>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Controls>
        {selectedBlock && (
          <HintText>
            Use arrow keys to move the selected block
            <br />
            Press ESC to deselect
          </HintText>
        )}
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Unblock Me</h2>
          <p>Help the red block escape by moving other blocks out of the way</p>
          <p>Click a block to select it, then use arrow keys to move</p>
          {gameWon && (
            <>
              <p>Level Complete!</p>
              <p>Moves: {moves} (Minimum: {LEVELS[currentLevel].minMoves})</p>
              <p>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
              <p>Difficulty: {LEVELS[currentLevel].difficulty}</p>
              <CoinReward>
                +{earnedCoins} Coins!
                {moves <= LEVELS[currentLevel].minMoves && (
                  <PerfectBonus>Perfect Solution!</PerfectBonus>
                )}
                {timer <= TIME_BONUS_THRESHOLD && (
                  <TimeBonus>Speed Bonus!</TimeBonus>
                )}
                {hintsUsed > 0 && (
                  <div style={{ color: '#e74c3c', fontSize: '0.8em' }}>
                    Hint Penalty: -{hintsUsed * 5} coins
                  </div>
                )}
              </CoinReward>
              {currentLevel < LEVELS.length - 1 ? (
                <p>Ready for the next level?</p>
              ) : (
                <p>Congratulations! You've completed all levels!</p>
              )}
            </>
          )}
          <Button onClick={startGame}>
            {gameWon ? 
              (currentLevel < LEVELS.length - 1 ? 'Next Level' : 'Play Again') : 
              'Start Game'}
          </Button>
          <Button onClick={startTutorial}>Tutorial</Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </div>
  );
};

export default UnblockMe; 