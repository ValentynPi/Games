import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #ecf0f1;
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #bdc3c7;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SignUpButton = styled(Button)`
  background-color: #2ecc71;
  color: white;

  &:hover {
    background-color: #27ae60;
  }
`;

const SignInButton = styled(Button)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
`;

const FeatureCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  width: 300px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #ecf0f1;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #bdc3c7;
`;

function Landing() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Game Portal</Title>
      <Subtitle>
        Your gateway to endless gaming entertainment. Play classic games, earn coins,
        and unlock amazing skins!
      </Subtitle>
      
      <ButtonContainer>
        <SignUpButton onClick={() => navigate('/signup')}>
          Sign Up
        </SignUpButton>
        <SignInButton onClick={() => navigate('/signin')}>
          Sign In
        </SignInButton>
      </ButtonContainer>

      <Features>
        <FeatureCard>
          <FeatureIcon>🎮</FeatureIcon>
          <FeatureTitle>Classic Games</FeatureTitle>
          <FeatureDescription>
            Enjoy timeless classics like Snake, Tetris, Pong, and more!
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🪙</FeatureIcon>
          <FeatureTitle>Earn Coins</FeatureTitle>
          <FeatureDescription>
            Play games to earn coins and unlock special features
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🎨</FeatureIcon>
          <FeatureTitle>Custom Skins</FeatureTitle>
          <FeatureDescription>
            Personalize your gaming experience with unique skins
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
}

export default Landing; 