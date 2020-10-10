import React from 'react';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import styled, { css } from 'styled-components';


function App() {
  return (
    <AppLayout>
      <NavBar />
      <p>React crypto-currency monitor</p>
    </AppLayout>
  );
}

export default App;
