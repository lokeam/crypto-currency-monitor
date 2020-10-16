import React, { Component, createContext } from 'react';
import _ from 'lodash';

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
      favourites: ['BTC', 'DOGE', 'ETH', 'XMR'],
      ...this.saveSettings(),
      confirmFavourites: this.confirmFavourites
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
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
    console.log(coinList);
  }

  saveSettings() {
    let cryptoData = JSON.parse(localStorage.getItem('cryptoMonitor'));
    if ( !cryptoData ) {
      return {
        page: 'settings',
        firstVisit: true
      }
    }
    let { favourites } = cryptoData
    return { favourites };
  }

  confirmFavourites = () => {
    console.log('ding');
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoMonitor', JSON.stringify({
      favourites: this.state.favourites
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