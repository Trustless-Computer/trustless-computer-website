import React from 'react';
import { Outlet } from 'react-router-dom';
import Meta from './Meta';
import Footer from './Footer';
import Header from './Header';
import styled, { DefaultTheme } from 'styled-components';

const HEADER_HEIGHT = 80;
const FO0TER_HEIGHT = 80;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-left: 6%;
  padding-right: 6%;
  background-color: ${({ theme }) => theme.bg1};

  ${({ theme }: { theme: DefaultTheme }) => theme.deprecated_mediaWidth.deprecated_upToExtraSmall`
      padding-left: 4%;
      padding-right: 4%;
  `}
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  align-self: center;
  width: 100%;

  > div {
    width: 100%;
  }
`;

const Layout = () => {
  return (
    <Container>
      <Meta />
      <Header height={HEADER_HEIGHT} />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer height={FO0TER_HEIGHT} />
    </Container>
  );
};

export default Layout;
