import styled from 'styled-components';

export const Menu = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  color: white;
  z-index: 1000;
  min-width: 300px;
  
  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  div {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`; 