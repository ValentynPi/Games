import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.dark};
  padding: 20px;
`;

export const Header = styled.header`
  text-align: center;
  padding: 40px;
  background: ${props => props.theme.colors.darker};
  margin-bottom: 30px;

  h1 {
    margin: 0;
    color: ${props => props.theme.colors.light};
    font-size: 2.5em;
  }
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const GameCard = styled.div`
  background: ${props => props.theme.colors.darker};
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const GamePreview = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.$background.startsWith('http') 
    ? `url(${props.$background})`
    : props.$background};
  background-size: cover;
  background-position: center;
  border-bottom: 3px solid ${props => props.theme.colors.primary};
`;

export const GameInfo = styled.div`
  padding: 20px;

  h2 {
    margin: 0 0 10px 0;
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.light};
    font-size: 0.9em;
    opacity: 0.8;
  }
`;

export const PlayButton = styled.div`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  margin-top: 15px;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`; 