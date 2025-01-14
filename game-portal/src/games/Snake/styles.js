import styled from 'styled-components';

export const SnakeSegment = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${props => props.$isHead ? props.theme.colors.secondary : '#2ecc71'};
  border-radius: 4px;
  transition: all 0.1s linear;
`;

export const Food = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${props => props.theme.colors.danger};
  border-radius: 50%;
`;

export const Score = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
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