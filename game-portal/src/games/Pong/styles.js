import styled from 'styled-components';

export const Paddle = styled.div`
  position: absolute;
  width: 15px;
  height: 100px;
  background: ${props => props.theme.colors.light};
  border-radius: 5px;
`;

export const Ball = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: ${props => props.theme.colors.danger};
  border-radius: 50%;
`;

export const ScoreDisplay = styled.div`
  position: absolute;
  top: 20px;
  ${props => props.side === 'left' ? 'left: 30%;' : 'right: 30%;'}
  color: white;
  font-size: 48px;
  font-family: 'Arial', sans-serif;
`;

export const CenterLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
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