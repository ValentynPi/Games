import styled from 'styled-components';

export const TetrisBoard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(20, 30px);
  gap: 1px;
  background-color: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #2d8a4e;
  box-shadow: 0 0 20px rgba(45, 138, 78, 0.3);
  outline: none;
`;

export const Cell = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.$color || '#111'};
  border: ${props => props.$color ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #222'};
  border-radius: 2px;
  box-shadow: ${props => props.$color ? 'inset 0 0 8px rgba(255, 255, 255, 0.1)' : 'none'};
  transition: background-color 0.1s ease;
`;

export const StatsPanel = styled.div`
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #2d8a4e;
  color: white;
  min-width: 200px;
  box-shadow: 0 0 20px rgba(45, 138, 78, 0.3);

  h3 {
    color: #4CAF50;
    text-align: center;
    margin-bottom: 15px;
    text-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
  }
`;

export const NextPieceDisplay = styled.div`
  margin-bottom: 20px;
  
  h3 {
    margin: 0 0 10px 0;
    text-align: center;
  }

  > div {
    border: 1px solid #2d8a4e;
    box-shadow: inset 0 0 10px rgba(45, 138, 78, 0.2);
  }
`;

export const Score = styled.div`
  font-size: 1.2em;
  margin: 15px 0;
  color: #E0E0E0;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

export const Level = styled.div`
  font-size: 1.2em;
  margin: 15px 0;
  color: #4CAF50;
  text-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
`;

export const Lines = styled.div`
  font-size: 1.2em;
  margin: 15px 0;
  color: #64B5F6;
  text-shadow: 0 0 5px rgba(100, 181, 246, 0.3);
`; 