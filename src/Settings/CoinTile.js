import React from 'react';
import { AppContext } from '../AppProvider';
import { SelectableTile, DisabledTile, DeletableTile } from '../Shared/Tile';
import CoinHeaderGrid from '../Settings/CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

export default function({coinKey, topSection}) {
  return (
    <AppContext.Consumer>
      {
        ({coinList}) => {
          let coin = coinList[coinKey];

          let TileClass = SelectableTile;
          if ( topSection ) {
            TileClass = DeletableTile;
          }

          return (
            <TileClass>
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