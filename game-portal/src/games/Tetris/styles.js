import styled from 'styled-components';

export const TetrisBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(20, 30px);
  gap: 1px;
  background-color: #111;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid #333;
`;

export const Cell = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.$color || '#000'};
  border: ${props => props.$color ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #111'};
  border-radius: 2px;
`;

export const StatsPanel = styled.div`
  background-color: #111;
  padding: 20px;
  border-radius: 4px;
  border: 2px solid #333;
  color: white;
  min-width: 150px;
`;

export const NextPieceDisplay = styled.div`
  margin-bottom: 20px;
  
  h3 {
    margin: 0 0 10px 0;
    text-align: center;
  }
`;

export const Score = styled.div`
  font-size: 1.2em;
  margin: 10px 0;
`;

export const Level = styled.div`
  font-size: 1.2em;
  margin: 10px 0;
`;

export const Lines = styled.div`
  font-size: 1.2em;
  margin: 10px 0;
`; 