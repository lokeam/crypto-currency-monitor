import React from 'react';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import Settings from './Settings';
import Content from './Shared/Content';

import { AppProvider } from './AppProvider';
import styled, { css } from 'styled-components';


function App() {
  return (
    <AppLayout>
      <AppProvider>
        <NavBar />
        <Content>
          <Settings />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
