import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import { CoinHeaderGrid } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../AppProvider';

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

/* If price has changed within last 24 hours, change the color of the text */
const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`;

const numberFormatter = number => {
  return +(number + '').slice(0, 7);
}

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
    display: grid;
    ${fontSize3};
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    justify-items: right;
  `}

  ${props => props.currentFavourite && css`
    ${greenBoxShadow};
    pointer-events: none;
  `}
`;

function ChangePercent( { data }) {
  return (
    <JustifyRight>
      <ChangePct red={ data.CHANGEPCT24HOUR < 0 }>
        { numberFormatter( data.CHANGEPCT24HOUR ) }
      </ChangePct>
  </JustifyRight>
  );
}

function PriceTile({ symbol, data, currentFavourite, setCurrentFavourite }) {
  console.log('priceTile, currentFavourite: ', currentFavourite);
  return (
    <PriceTileStyled currentFavourite={currentFavourite}
                     onClick={() => setCurrentFavourite(symbol)}>
      <CoinHeaderGrid>
        <div> { symbol } </div>
        <ChangePercent data={ data } />
      </CoinHeaderGrid>
      <TickerPrice>
        ${ numberFormatter(data.PRICE) }
      </TickerPrice>
    </PriceTileStyled>
  )
}

function PriceTileCompact({ symbol, data, currentFavourite, setCurrentFavourite }) {
  return (
    <PriceTileStyled compact
                     currentFavourite={currentFavourite}
                     onClick={() => setCurrentFavourite(symbol)}>
        <JustifyLeft> { symbol } </JustifyLeft>
        <ChangePercent data={ data } />
      <div>
        ${ numberFormatter(data.PRICE) }
      </div>
    </PriceTileStyled>
  )
}

export default function({ price, index }) { 
  console.log('price: ', price);
  let symbol = Object.keys(price)[0];
  let data = price[symbol]['USD'];

  /* if the top row has less than 5 items display the top functional component,
     else display the PriceTileCompact component
  */
  let TileClass = index < 5 ? PriceTile : PriceTileCompact;

  return (
    <AppContext.Consumer>
      {
        ({currentFavourite, setCurrentFavourite}) =>
          <TileClass symbol={ symbol }
                     data={ data }
                     currentFavourite={ currentFavourite === symbol }
                     setCurrentFavourite={ setCurrentFavourite }>
            { symbol } { data.PRICE }
          </TileClass>
      }
    </AppContext.Consumer>
  )
}