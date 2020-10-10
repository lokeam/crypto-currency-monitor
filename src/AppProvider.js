import React, { Component, createContext } from 'react';

export const AppContext = createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'settings',
      setPage: this.setPage
    }
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