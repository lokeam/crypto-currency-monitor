import React from 'react';
import { DeletableTile } from '../Shared/Tile';
import styled from 'styled-components';

export const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeletableTile}:hover & {
    display: block;
    color: red;
  }
`;

export default function( { name, symbol, topSection } ) {
  return (
    <CoinHeaderGrid>
      <div>{name}</div>
      { topSection ?
        (<DeleteIcon>X</DeleteIcon>) :
        (<CoinSymbol>{symbol}</CoinSymbol>)
      }
    </CoinHeaderGrid>
  );
}