import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
  color: white;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 1s ease-out;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #95a5a6;
  margin-bottom: 2rem;
`;

export const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const GameCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-out;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
    border-color: ${props => props.$color || props.theme.colors.primary};
  }
`;

export const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: transform 0.3s ease;

  ${GameCard}:hover & {
    transform: scale(1.05);
  }
`;

export const GameInfo = styled.div`
  padding: 1.5rem;
`;

export const GameTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
`;

export const GameDescription = styled.p`
  color: #95a5a6;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const PlayButton = styled.button`
  background: ${props => props.$color || props.theme.colors.primary};
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    background: ${props => props.$color ? `${props.$color}dd` : props.theme.colors.secondary};
  }

  &:active {
    transform: translateY(0);
  }
`; 