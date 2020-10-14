import React from 'react';
import { AppContext } from '../AppProvider';
export default function({ name, children }) {
  console.log('page')
  return (
    <AppContext.Consumer>
      {
        ({page}) => {
          if ( page !== name ) {
            return null;
          }
          return (
            <div>
              {children}
            </div>
          );
        }
      }
    </AppContext.Consumer>
  );
}
