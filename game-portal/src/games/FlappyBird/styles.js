import styled, { keyframes } from 'styled-components';

const scrollGround = keyframes`
  from { background-position: 0 0; }
  to { background-position: -47px 0; }
`;

const flap = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-25deg) translateY(-5px); }
`;

export const Bird = styled.div`
  position: absolute;
  width: 34px;
  height: 24px;
  background-image: url('data:image/png;base64,...'); // Your bird sprite
  transform-origin: center;
  transition: transform 0.1s;
  z-index: 10;
  animation: ${flap} 0.3s infinite;
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('data:image/png;base64,...'); // Your background sprite
  background-repeat: repeat-x;
  background-position: bottom;
  z-index: 1;
`;

export const Ground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 112px;
  background-image: url('data:image/png;base64,...'); // Your ground sprite
  background-repeat: repeat-x;
  animation: ${scrollGround} 3s linear infinite;
  z-index: 2;
`;

export const Pipe = styled.div`
  position: absolute;
  width: 60px;
  background: #73C908;
  border: 2px solid #557F19;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    width: 70px;
    height: 20px;
    background: #73C908;
    left: -5px;
    border: 2px solid #557F19;
  }

  &.top::after {
    bottom: -20px;
    border-radius: 0 0 5px 5px;
  }

  &.bottom::after {
    top: -20px;
    border-radius: 5px 5px 0 0;
  }
`;

export const Score = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 48px;
  font-family: "Press Start 2P", monospace;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  z-index: 3;
`; 