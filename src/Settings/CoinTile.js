import React from 'react';
import { AppContext } from '../AppProvider';
import { SelectableTile, DisabledTile, DeletableTile } from '../Shared/Tile';
import CoinHeaderGrid from '../Settings/CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection ? () => {
    removeCoin(coinKey);
  } : () => {
    addCoin(coinKey);
  }
}

export default function({coinKey, topSection}) {
  return (
    <AppContext.Consumer>
      {
        ({coinList, addCoin, removeCoin, isInFavourites}) => {
          let coin = coinList[coinKey];

          let TileClass = SelectableTile;
          if ( topSection ) {
            TileClass = DeletableTile;
          } else if ( isInFavourites(coinKey) ) {
            TileClass = DisabledTile;
          }

          return (
            <TileClass onClick={ clickCoinHandler(topSection, coinKey, addCoin, removeCoin) }>
              <CoinHeaderGrid name={coin.CoinName}
                              symbol={coin.Symbol}
                              topSection={topSection} />
              <CoinImage coin={coin} />
            </TileClass>
          );
        }
      }
    </AppContext.Consumer>
  );
}