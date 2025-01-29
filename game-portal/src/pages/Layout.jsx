import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 