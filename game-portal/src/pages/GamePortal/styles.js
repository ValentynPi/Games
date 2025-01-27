import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const PortalContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
`;

export const ShopCard = styled.div`
  width: 200px;
  height: 60px;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  animation: ${bounceIn} 0.5s ease-out;
  margin-bottom: 30px;
  align-self: flex-end;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.5);
    background: linear-gradient(45deg, #FFA500, #FFD700);
  }
`;

export const ShopIcon = styled.span`
  font-size: 24px;
  animation: ${pulse} 2s infinite;
`;

export const ShopTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5em;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin: 0;
`;

export const GamesGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
  margin-top: 2rem;
`;

export const GamesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
`;

export const GameCard = styled.div`
  background: #2c3e50;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
  aspect-ratio: 16/9;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

    img {
      transform: scale(1.1);
    }

    h3 {
      background: rgba(0, 0, 0, 0.8);
    }
  }
`;

export const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const GameTitle = styled.h3`
  color: white;
  font-size: 1.5em;
  margin: 0;
  padding: 15px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0;
  width: 100%;
  backdrop-filter: blur(5px);
  transition: background 0.3s ease;
`; 