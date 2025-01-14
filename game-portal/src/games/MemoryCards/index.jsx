import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContainer } from '../../components/GameContainer';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { Card, CardFront, CardBack, Stats, DifficultyButton } from './styles';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', 
                '🐷', '🐸', '🐵', '🦄', '🐙', '🦋'];

const MemoryCards = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [gridSize, setGridSize] = useState(16);
  const navigate = useNavigate();

  const createCard = (emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false
  });

  const startGame = () => {
    // Create pairs of cards
    const gameEmojis = EMOJIS.slice(0, gridSize/2);
    const cardEmojis = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => createCard(emoji, index));
    
    setCards(cardEmojis);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(true);
    setShowMenu(false);
  };

  const flipCard = (cardId) => {
    if (flippedCards.length >= 2 || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      checkMatch([flippedCards[0], cardId]);
    }
  };

  const checkMatch = (selectedCards) => {
    setTimeout(() => {
      const [first, second] = selectedCards;
      const newCards = [...cards];

      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setMatches(m => m + 1);
      } else {
        newCards[first].isFlipped = false;
        newCards[second].isFlipped = false;
      }

      setCards(newCards);
      setFlippedCards([]);
    }, 1000);
  };

  useEffect(() => {
    let timer;
    if (gameStarted && matches < gridSize/2) {
      timer = setInterval(() => {
        setTimeElapsed(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, matches, gridSize]);

  useEffect(() => {
    if (matches === gridSize/2 && matches > 0) {
      setGameStarted(false);
      setShowMenu(true);
    }
  }, [matches, gridSize]);

  return (
    <>
      <GameContainer>
        <Stats>
          <div>Moves: {moves}</div>
          <div>Time: {timeElapsed}s</div>
        </Stats>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, 1fr)`,
          gap: '10px',
          padding: '20px'
        }}>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              $isFlipped={card.isFlipped}
              $isMatched={card.isMatched}
              onClick={() => !card.isFlipped && flipCard(index)}
            >
              <CardFront>{card.emoji}</CardFront>
              <CardBack />
            </Card>
          ))}
        </div>
      </GameContainer>

      {showMenu && (
        <Menu>
          <h2>Memory Cards</h2>
          {moves > 0 && (
            <p>
              {matches === gridSize/2 
                ? `Completed in ${timeElapsed} seconds with ${moves} moves!`
                : `Game Over!`}
            </p>
          )}
          <div>
            <DifficultyButton
              $selected={gridSize === 16}
              onClick={() => setGridSize(16)}
            >
              Easy (4x4)
            </DifficultyButton>
            <DifficultyButton
              $selected={gridSize === 24}
              onClick={() => setGridSize(24)}
            >
              Medium (4x6)
            </DifficultyButton>
            <DifficultyButton
              $selected={gridSize === 36}
              onClick={() => setGridSize(36)}
            >
              Hard (6x6)
            </DifficultyButton>
          </div>
          <Button as="button" onClick={startGame}>
            {moves === 0 ? 'Start Game' : 'Play Again'}
          </Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Menu>
      )}
    </>
  );
};

export default MemoryCards; 