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
function getCoinsToDisplay( coinList, topSection, favourites ) {
  // display either favourites or a slice of the top x coins
  return topSection ? favourites : Object.keys(coinList).slice(0, topSection ? 10 : 100);
}

export default function({topSection}) {
  return (
    <AppContext.Consumer>
      {
        ({coinList, favourites}) => <CoinGrid>
          {getCoinsToDisplay(coinList, topSection, favourites).map(
            coinKey => <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
            )
          }
        </CoinGrid>
      }
    </AppContext.Consumer>
  );
}