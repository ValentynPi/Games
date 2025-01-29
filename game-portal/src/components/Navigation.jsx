import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const CoinDisplay = styled.div`
  color: #f1c40f;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #34495e;
  border-radius: 4px;
`;

const CoinIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.2rem;
`;

const SignOutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchUserCoins = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('users')
        .select('coins')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching coins:', error);
        return;
      }

      if (data) {
        setCoins(data.coins);
      }
    };

    fetchUserCoins();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('users_db_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'users',
          filter: `id=eq.${user?.id}`
        }, 
        (payload) => {
          if (payload.new?.coins !== undefined) {
            setCoins(payload.new.coins);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Nav>
      <NavContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/games/snake">Snake</NavLink>
          <NavLink to="/games/tetris">Tetris</NavLink>
          <NavLink to="/games/pong">Pong</NavLink>
          <NavLink to="/games/unblockme">Unblock Me</NavLink>
          <NavLink to="/shop">Shop</NavLink>
        </NavLinks>
        <RightSection>
          <CoinDisplay>
            <CoinIcon>🪙</CoinIcon>
            {coins}
          </CoinDisplay>
          <SignOutButton onClick={handleSignOut}>
            Sign Out
          </SignOutButton>
        </RightSection>
      </NavContainer>
    </Nav>
  );
}

export default Navigation; 