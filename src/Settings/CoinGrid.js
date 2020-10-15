import { coinList } from 'cryptocompare';
import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';
import { SelectableTile } from '../Shared/Tile';

export const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

export default function() {
  return (
    <AppContext.Consumer>
      {
        ({coinList}) => <CoinGrid>
          {Object.keys(coinList).map(
            coinKey => <SelectableTile>{coinKey}</SelectableTile>
            )
          }
        </CoinGrid>

      }
    </AppContext.Consumer>
  );
}