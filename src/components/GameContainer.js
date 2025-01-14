import styled from 'styled-components';

export const GameContainer = styled.div`
  position: relative;
  width: ${props => props.width || '800px'};
  height: ${props => props.height || '600px'};
  background: ${props => props.background || '#34495e'};
  border: 2px solid #3498db;
  overflow: hidden;
`; 