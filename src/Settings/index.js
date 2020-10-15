import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';

export default function() {
  return (
    <Page name="settings">
      <p>React crypto-currency monitor</p>
      <ConfirmButton />
      <CoinGrid />
    </Page>

  );
};