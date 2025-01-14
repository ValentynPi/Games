import styled from 'styled-components';

export const Card = styled.div`
  width: 120px;
  height: 120px;
  background: ${props => props.theme.colors.darker};
  border-radius: 10px;
  cursor: ${props => props.$isMatched ? 'default' : 'pointer'};
  transition: transform 0.3s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  opacity: ${props => props.$isMatched ? 0.7 : 1};
  position: relative;

  &:hover {
    transform: ${props => props.$isMatched ? 'rotateY(180deg)' : props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(15deg)'};
  }
`;

export const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background: ${props => props.theme.colors.primary};
  border-radius: 10px;
  transform: rotateY(180deg);
`;

export const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: ${props => props.theme.colors.darker};
  border-radius: 10px;
`;

export const Stats = styled.div`
  color: white;
  font-size: 24px;
  margin: 20px;
  text-align: center;

  div {
    margin: 10px 0;
  }
`;

export const DifficultyButton = styled.button`
  background: ${props => props.$selected ? props.theme.colors.danger : props.theme.colors.secondary};
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  border: none;

  &:hover {
    background: ${props => props.$selected ? props.theme.colors.danger : props.theme.colors.primary};
  }
`; 