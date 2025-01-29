import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.isLandingPage ? '0' : '20px'};
`;

function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';
  const isLandingPage = location.pathname === '/';

  return (
    <LayoutContainer>
      {user && !isAuthPage && !isLandingPage && <Navigation />}
      <MainContent isLandingPage={isLandingPage}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}

export default Layout; 