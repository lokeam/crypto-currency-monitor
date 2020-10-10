import React from 'react';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import { AppProvider } from './AppProvider';
import styled, { css } from 'styled-components';


function App() {
  return (
    <AppLayout>
      <AppProvider>
        <NavBar />
        <p>React crypto-currency monitor</p>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
