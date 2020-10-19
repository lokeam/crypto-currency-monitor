import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppProvider';
import PriceTile from './PriceTile';

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin: 40px 0 0 0;
`;

export default function() {
  return (
    <AppContext.Consumer>
      {
        ({prices}) => (
          <PriceGrid>
            {
              /* get coin symbol (first key) from price */
            prices.map( (price, index) =>
              (<PriceTile price={price}
                          index={index}
                          key={`${index}-${price}`}/>) )
            }
          </PriceGrid>
        )
      }
    </AppContext.Consumer>
  )
}