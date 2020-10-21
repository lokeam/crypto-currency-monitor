import React, { Component, createContext } from 'react';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const cryptoComp = require('cryptocompare');
cryptoComp.setApiKey(`${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`);

const MAX_FAVOURITES = 10;

export const AppContext = createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavourites: this.isInFavourites,
      favourites: [],
      ...this.saveSettings(),
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavourite: this.setCurrentFavourite,
      confirmFavourites: this.confirmFavourites
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
  }

  addCoin = key => {
    let favourites = [...this.state.favourites];
    if ( favourites.length < MAX_FAVOURITES ) {
      favourites.push(key);
      this.setState({favourites})
    }
  }

  removeCoin = key => {
    let favourites = [...this.state.favourites];
    this.setState({
      favourites: _.pull(favourites, key)
    })
  }

  // helper fn to ensure that we don't keep adding the same coin to favs
  isInFavourites = key => _.includes(this.state.favourites, key);

  fetchCoins = async () => {
    // utilizes cryptocompare API to grab list of coins
    let coinList = (await cryptoComp.coinList()).Data;
    this.setState({
      coinList
    });
    //console.log(coinList);
  }

  fetchPrices = async () => {
    if ( this.state.firstVisit ) return;
    let prices = await this.prices();
    prices = prices.filter( price => Object.keys(price).length);
    console.log('app provider, prices - ', prices);
    this.setState({ prices });
  }

  prices = async () => {
    let returnData = [];

    for ( let favourite of this.state.favourites ) {
      try {
        let priceData = await cryptoComp.priceFull( favourite, 'USD' );
        returnData.push(priceData);
      } catch(error) {
        console.warn('fetch price error: ', error)
      }
    }
    return returnData;
  }

  setCurrentFavourite = symbol => {
    this.setState({
      currentFavourite: symbol
    });
    localStorage.setItem('cryptoMonitor', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavourite: symbol
    }))
  }

  saveSettings() {
    let cryptoData = JSON.parse(localStorage.getItem('cryptoMonitor'));
    if ( !cryptoData ) {
      return {
        page: 'settings',
        firstVisit: true
      }
    }
    let { favourites, currentFavourite } = cryptoData
    return { favourites, currentFavourite };
  }

  setFilteredCoins = filteredCoins => this.setState({filteredCoins});

  confirmFavourites = () => {
    let currentFavourite = this.state.favourites[0];
    console.log('confirmFavourites, currentFavourite: ', currentFavourite);

    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavourite,
    }, () => {
      this.fetchPrices();
    });
    localStorage.setItem('cryptoMonitor', JSON.stringify({
      favourites: this.state.favourites,
      currentFavourite
    }));
  }

  setPage = page => this.setState({page});

  render() {
    return(
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}