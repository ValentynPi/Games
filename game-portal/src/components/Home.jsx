import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { games } from './GameList';
import { CoinDisplay } from './CoinDisplay';
import { useCoins } from '../contexts/CoinContext';
import { useInventory } from '../contexts/InventoryContext';

const HomeContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: #fff;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(79, 172, 254, 0.3);
  }

  p {
    font-size: 1.2rem;
    color: #a0aec0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
`;

const GameCard = styled(Link)`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
    }

    img {
      transform: scale(1.05);
    }

    h2 {
      color: #4facfe;
    }
  }
`;

const GameThumbnail = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const GameInfo = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  p {
    color: #a0aec0;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

const GamePrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${props => props.price === 0 ? '#48bb78' : '#4facfe'};

  &::before {
    content: '${props => props.price === 0 ? '🎮 Free' : '💎'}';
    font-size: 1.2rem;
  }
`;

const OwnedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2d8a4e;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1;
`;

export const Home = () => {
  const { coins } = useCoins();
  const { ownedGames, purchaseGame } = useInventory();

  const handlePurchase = (e, game) => {
    e.preventDefault();
    if (coins >= game.price && !ownedGames.includes(game.id)) {
      purchaseGame(game.id, game.price);
    }
  };

  return (
    <HomeContainer>
      <CoinDisplay />
      <Header>
        <h1>Game Portal</h1>
        <p>Discover a world of exciting games with unique visual styles and challenging gameplay. Collect coins, unlock skins, and compete for high scores!</p>
      </Header>
      <GamesGrid>
        {games.map(game => {
          const isOwned = ownedGames.includes(game.id);
          return (
            <GameCard
              key={game.id}
              to={isOwned ? `/games/${game.id}` : '#'}
              onClick={e => !isOwned && handlePurchase(e, game)}
            >
              {isOwned && <OwnedBadge>Owned</OwnedBadge>}
              <GameThumbnail>
                <img src={game.thumbnail} alt={game.title} />
              </GameThumbnail>
              <GameInfo>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                {!isOwned && (
                  <GamePrice price={game.price}>
                    {game.price > 0 ? `${game.price} coins` : ''}
                  </GamePrice>
                )}
              </GameInfo>
            </GameCard>
          );
        })}
      </GamesGrid>
    </HomeContainer>
  );
}; 