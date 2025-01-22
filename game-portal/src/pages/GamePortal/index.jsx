import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Header, 
  Title, 
  Subtitle,
  GameGrid, 
  GameCard, 
  GameImage, 
  GameInfo,
  GameTitle, 
  GameDescription,
  PlayButton
} from './styles';

const games = [
  {
    id: 'pong',
    title: 'Pong',
    description: 'Classic table tennis game with modern graphics and smooth controls.',
    image: 'https://via.placeholder.com/300x200/333/fff?text=Pong',
    color: '#3498db'
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Guide your snake through the arena, collecting food and avoiding collisions.',
    image: 'https://via.placeholder.com/300x200/333/fff?text=Snake',
    color: '#2ecc71'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Stack and clear blocks in this timeless puzzle game with a modern twist.',
    image: 'https://via.placeholder.com/300x200/333/fff?text=Tetris',
    color: '#e74c3c'
  },
  {
    id: 'doodlejump',
    title: 'Doodle Jump',
    description: 'Jump your way up through platforms in this endless climber.',
    image: 'https://via.placeholder.com/300x200/333/fff?text=DoodleJump',
    color: '#87CEEB'
  },
  {
    id: 'unblockme',
    title: 'Unblock Me',
    description: 'Classic sliding block puzzle game. Help the red block escape!',
    image: 'https://via.placeholder.com/300x200/333/fff?text=UnblockMe',
    color: '#e74c3c'
  }
];

const GamePortal = () => {
  return (
    <Container>
      <Header>
        <Title>Game Portal</Title>
        <Subtitle>Choose your game and start playing!</Subtitle>
      </Header>
      <GameGrid>
        {games.map(game => (
          <GameCard key={game.id} $color={game.color}>
            <GameImage src={game.image} alt={game.title} />
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <PlayButton as={Link} to={`/game/${game.id}`} $color={game.color}>
                Play Now
              </PlayButton>
            </GameInfo>
          </GameCard>
        ))}
      </GameGrid>
    </Container>
  );
};

export default GamePortal; 