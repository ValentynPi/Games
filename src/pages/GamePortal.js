import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';

const Container = styled.div`
  min-height: 100vh;
  background: #2c3e50;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  padding: 40px;
  color: white;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameCard = styled.div`
  background: #34495e;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  color: white;
`;

function GamePortal() {
  const games = [
    { title: 'Flappy Bird', path: '/flappy-bird', description: 'Guide your bird through pipes!' },
    { title: 'Snake', path: '/snake', description: 'Classic snake game!' },
    { title: 'Pong', path: '/pong', description: 'Classic arcade tennis game!' },
    // Add other games...
  ];

  return (
    <Container>
      <Header>
        <h1>Game Portal</h1>
      </Header>
      <GamesGrid>
        {games.map(game => (
          <GameCard key={game.path}>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <Button to={game.path}>Play Now</Button>
          </GameCard>
        ))}
      </GamesGrid>
    </Container>
  );
}

export default GamePortal; 