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
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  
  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #4CAF50;
    text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  button {
    margin: 0.5rem;
    min-width: 150px;
  }
  
  div {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
`; 