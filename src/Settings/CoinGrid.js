import { coinList } from 'cryptocompare';
import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';

export const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export default function() {
  return (
    <AppContext.Consumer>
      {
        ({coinList}) => <CoinGrid>
          {Object.keys(coinList).map(
            coinKey =>
          <div>{coinKey}</div>
            )
          }
        </CoinGrid>

      }
    </AppContext.Consumer>
  );
}