import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';
import { AppContext } from '../AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

import { coinList } from 'cryptocompare';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  place-self: center left;
  border: 1px solid;
  height: 25px;
  color: #1163c9;
`;

const handleFilter = _.debounce( (inputVal, coinList, setFilteredCoins) => {
  
  // Grab all coin symbols
  let coinSymbols = Object.keys(coinList);


  // Grab list of coin names and filter using fuzzy search 
  let coinNames = coinSymbols.map( symbol => coinList[symbol].CoinName);
  let allStringsToSearch = coinSymbols.concat(coinNames);
  let fuzzyResults = fuzzy.filter( inputVal, allStringsToSearch, {}).map(
    result => result.string);

  // pick the names of coins from coinList
  let filteredCoins = _.pickBy(coinList, (result, symbolKey) => {
    let coinName = result.CoinName;
    return (_.includes(fuzzyResults, symbolKey, ) || _.includes(fuzzyResults, coinName));
  });

  setFilteredCoins( filteredCoins );


}, 350 );

function filterCoins(event, setFilteredCoins, coinList) {
  let inputVal = event.target.value;

  if ( !inputVal ) {
    setFilteredCoins(null);
    return;
  }
 
  handleFilter(inputVal, coinList, setFilteredCoins);
}

export default function() {
  return (
    <AppContext.Consumer>
      {
        ({setFilteredCoins, coinList}) =>
          <SearchGrid>
            <h2>Search for coins</h2>
            <SearchInput onKeyUp={ (event) => filterCoins(event, setFilteredCoins, coinList) }/>
          </SearchGrid>
      }
    </AppContext.Consumer>
  );
}