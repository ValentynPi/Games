import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { games } from './GameList';
import { CoinDisplay } from './CoinDisplay';
import { useCoins } from '../contexts/CoinContext';
import { useInventory } from '../contexts/InventoryContext';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 48px;
  margin-bottom: 40px;
  text-shadow: 0 0 10px rgba(45, 138, 78, 0.5);
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
`;

const GameCard = styled(Link)`
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  text-decoration: none;
  color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid #2d8a4e;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(45, 138, 78, 0.3);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background-image: ${props => props.thumbnail ? `url(${props.thumbnail})` : 'none'};
    background-size: cover;
    background-position: center;
    opacity: 0.5;
  }
`;

const GameTitle = styled.h2`
  margin: 160px 0 0 0;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  z-index: 1;
`;

const GameDescription = styled.p`
  margin: 10px 0;
  color: #cccccc;
  text-align: center;
  z-index: 1;
`;

const GamePrice = styled.div`
  color: #ffd700;
  font-weight: bold;
  font-size: 18px;
  z-index: 1;
  padding: 5px 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  margin-top: auto;
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
      <Title>Game Portal</Title>
      <GameGrid>
        {games.map(game => {
          const isOwned = ownedGames.includes(game.id);
          return (
            <GameCard
              key={game.id}
              to={isOwned ? `/games/${game.id}` : '#'}
              onClick={e => !isOwned && handlePurchase(e, game)}
              thumbnail={game.thumbnail}
            >
              {isOwned && <OwnedBadge>Owned</OwnedBadge>}
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              {!isOwned && (
                <GamePrice>{game.price} Coins</GamePrice>
              )}
            </GameCard>
          );
        })}
      </GameGrid>
    </HomeContainer>
  );
}; 