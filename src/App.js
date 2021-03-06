import React from 'react';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import Settings from './Settings';
import Dashboard from './Dashboard';
import Content from './Shared/Content';

import { AppProvider } from './AppProvider';
import styled, { css } from 'styled-components';


function App() {
  return (
    <AppLayout>
      <AppProvider>
        <NavBar />
        <Content>
          <Dashboard />
          <Settings />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
