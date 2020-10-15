import React from 'react';
import App from '../App';
import { AppContext } from '../AppProvider';

export default function( {firstVisit} ) {
  return (
    <AppContext.Consumer>
      {({firstVisit})} => {
        firstVisit ? <div>
          Welcome to CryptoMonitor, please select some crypto currency coins to begin.
        </div> : null
      }
    </AppContext.Consumer>
  );
}