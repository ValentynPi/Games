import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinDisplay } from '../../components/CoinDisplay';
import {
  PortalContainer,
  GamesGrid,
  GamesRow,
  GameCard,
  GameTitle,
  GameImage,
  ShopCard,
  ShopIcon,
  ShopTitle
} from './styles';

const GAMES = [
  {
    id: 'pong',
    title: 'Pong',
    image: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/games/pong.png',
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMzZTUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSI+UG9uZzwvdGV4dD48L3N2Zz4='
  },
  {
    id: 'snake',
    title: 'Snake',
    image: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/games/snake.png',
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMzZTUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSI+U25ha2U8L3RleHQ+PC9zdmc+'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    image: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/games/tetris.png',
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMzZTUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSI+VGV0cmlzPC90ZXh0Pjwvc3ZnPg=='
  },
  {
    id: 'doodlejump',
    title: 'Doodle Jump',
    image: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/games/doodlejump.png',
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMzZTUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSI+RG9vZGxlIEp1bXA8L3RleHQ+PC9zdmc+'
  },
  {
    id: 'unblockme',
    title: 'Unblock Me',
    image: 'https://raw.githubusercontent.com/valentinbujdoso/game-portal/main/public/assets/games/unblockme.png',
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMzZTUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSJ3aGl0ZSI+VW5ibG9jayBNZTwvdGV4dD48L3N2Zz4='
  }
];

const GamePortal = () => {
  const navigate = useNavigate();

  const handleImageError = (e, fallbackImage) => {
    e.target.src = fallbackImage;
  };

  return (
    <PortalContainer>
      <CoinDisplay />
      <GamesGrid>
        <ShopCard onClick={() => navigate('/shop')}>
          <ShopIcon>🛍️</ShopIcon>
          <ShopTitle>Shop</ShopTitle>
        </ShopCard>
        <GamesRow>
          {GAMES.map(game => (
            <GameCard
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <GameImage 
                src={game.image} 
                alt={game.title} 
                onError={(e) => handleImageError(e, game.fallbackImage)}
              />
              <GameTitle>{game.title}</GameTitle>
            </GameCard>
          ))}
        </GamesRow>
      </GamesGrid>
    </PortalContainer>
  );
};

export default GamePortal; 