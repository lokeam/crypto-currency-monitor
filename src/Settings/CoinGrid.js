import { coinList } from 'cryptocompare';
import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';
import CoinTile from '../Settings/CoinTile';

export const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin: 40px 0 0 0;
`;

// Filters results for the lower coinGrid, below favourites
function getLowerSectionCoins( coinList, filteredCoins ) {
  return ( filteredCoins && Object.keys(filteredCoins) ) ||
    Object.keys(coinList).slice(0, 100);
}

// only get the first 100 of the coins
function getCoinsToDisplay( coinList, topSection, favourites, filterCoins ) {
  // display either favourites or a slice of the top x coins
  return topSection ? favourites : getLowerSectionCoins(coinList, filterCoins);
}

export default function({topSection}) {
  return (
    <AppContext.Consumer>
      {
        ({coinList, favourites, filteredCoins}) => <CoinGrid>
          {getCoinsToDisplay(coinList, topSection, favourites, filteredCoins).map(
            coinKey => <CoinTile topSection={topSection}
                                 key={coinKey}
                                 coinKey={coinKey} />
            )
          }
        </CoinGrid>
      }
    </AppContext.Consumer>
  );
}