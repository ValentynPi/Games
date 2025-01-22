import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

export const GameWrapper = styled.div`
  width: 400px;
  height: 600px;
  background: linear-gradient(180deg, #87CEEB 0%, #4682B4 100%);
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

export const DoodleCharacter = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%2332CD32"/><circle cx="35" cy="40" r="5" fill="white"/><circle cx="65" cy="40" r="5" fill="white"/><path d="M 30 60 Q 50 80 70 60" stroke="white" fill="none" stroke-width="5"/></svg>') center/contain no-repeat;
  animation: ${bounce} 0.5s ease-in-out infinite;
`;

export const Platform = styled.div`
  position: absolute;
  background: linear-gradient(90deg, #8B4513 0%, #A0522D 100%);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const GameOverText = styled.p`
  font-size: 2em;
  color: ${props => props.theme.colors.danger};
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`; 