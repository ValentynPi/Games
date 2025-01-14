import styled from 'styled-components';

export const GameContainer = styled.div`
  position: relative;
  width: ${props => props.width || props.theme.sizes.gameWidth};
  height: ${props => props.height || props.theme.sizes.gameHeight};
  background: ${props => props.background || props.theme.colors.darker};
  border: 2px solid ${props => props.theme.colors.primary};
  overflow: hidden;
`; 