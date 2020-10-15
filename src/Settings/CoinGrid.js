import { coinList } from 'cryptocompare';
import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';
import CoinTile from '../Settings/CoinTile';

export const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin: 40px 0 0 0;
`;

// only get the first 100 of the coins
function getCoinsToDisplay( coinList ) {
  return Object.keys(coinList).slice(0, 100);
}

export default function() {
  return (
    <AppContext.Consumer>
      {
        ({coinList}) => <CoinGrid>
          {getCoinsToDisplay(coinList).map(
            coinKey => <CoinTile key={coinKey} coinKey={coinKey} />
            )
          }
        </CoinGrid>
      }
    </AppContext.Consumer>
  );
}