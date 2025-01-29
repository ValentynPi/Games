import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCoins } from '../contexts/CoinContext';

const NavbarContainer = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;

const CoinDisplay = styled.div`
  color: #f1c40f;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '🪙';
  }
`;

const Navbar = () => {
  const { coins } = useCoins();

  return (
    <NavbarContainer>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/shop">Shop</StyledLink>
      </NavLinks>
      <CoinDisplay>{coins} Coins</CoinDisplay>
    </NavbarContainer>
  );
};

export default Navbar; 