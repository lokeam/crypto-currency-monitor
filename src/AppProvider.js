import React, { Component, createContext } from 'react';

const cryptoComp = require('cryptocompare');
cryptoComp.setApiKey(`${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`);

export const AppContext = createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      setPage: this.setPage,
      ...this.saveSettings(),
      confirmFavourites: this.confirmFavourites
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
  }

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
    return {};
  }

  confirmFavourites = () => {
    console.log('ding');
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoMonitor', JSON.stringify({
      test: 'hello'
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