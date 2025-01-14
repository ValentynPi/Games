import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  GamesGrid,
  GameCard,
  GamePreview,
  GameInfo,
  PlayButton
} from './styles';

const games = [
  {
    title: 'Flappy Bird',
    path: '/flappy-bird',
    description: 'Guide your bird through pipes by tapping space. How far can you go?',
    preview: 'https://i.imgur.com/XQnHqL9.png'
  },
  {
    title: 'Snake',
    path: '/snake',
    description: 'Classic snake game with modern graphics. Collect food and grow longer, but don\'t hit the walls or yourself!',
    preview: 'https://i.imgur.com/7tZcPGf.png'
  },
  {
    title: 'Pong',
    path: '/pong',
    description: 'Classic arcade tennis game. Use your paddle to hit the ball past your opponent!',
    preview: 'linear-gradient(45deg, #95a5a6, #7f8c8d)'
  },
  {
    title: 'Color Match',
    path: '/color-match',
    description: 'Test your reflexes! Match the falling blocks with the correct color zones.',
    preview: 'linear-gradient(45deg, #e74c3c, #c0392b)'
  },
  {
    title: 'Memory Cards',
    path: '/memory-cards',
    description: 'Match pairs of cards while racing against time. Features different difficulty levels!',
    preview: 'linear-gradient(45deg, #9b59b6, #8e44ad)'
  },
  {
    title: 'Word Scramble',
    path: '/word-scramble',
    description: 'Race against the clock to unscramble words. Multiple categories available!',
    preview: 'linear-gradient(45deg, #2ecc71, #27ae60)'
  },
  {
    title: 'Brick Breaker',
    path: '/brick-breaker',
    description: 'Break all the bricks with your paddle and ball. Features power-ups and multiple levels!',
    preview: 'linear-gradient(45deg, #1abc9c, #16a085)'
  },
  {
    title: 'Math Challenge',
    path: '/math-challenge',
    description: 'Quick-fire math problems with increasing difficulty. Test your mental math skills!',
    preview: 'linear-gradient(45deg, #e67e22, #d35400)'
  },
  {
    title: 'Tetris',
    path: '/tetris',
    description: 'Classic block-stacking puzzle game. Arrange falling pieces to clear lines!',
    preview: 'linear-gradient(45deg, #3498db, #2980b9)'
  }
];

const GamePortal = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <h1>Game Portal</h1>
      </Header>
      <GamesGrid>
        {games.map((game) => (
          <GameCard key={game.path} onClick={() => navigate(game.path)}>
            <GamePreview $background={game.preview} />
            <GameInfo>
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <PlayButton>Play Now</PlayButton>
            </GameInfo>
          </GameCard>
        ))}
      </GamesGrid>
    </Container>
  );
};

export default GamePortal; 