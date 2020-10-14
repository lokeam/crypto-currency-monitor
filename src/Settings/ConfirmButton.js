import React from 'react';
import { AppContext } from '../AppProvider';
import styled from 'styled-components';

const ConfirmButton = styled.div`
  margin: 20px;
  color: red;
  cursor: pointer;
`;

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export default function() {
  return (
    <AppContext.Consumer>
      {({confirmFavourites}) => (
        <CenterDiv>
          <ConfirmButton onClick={confirmFavourites}>
            Confirm Favourites
          </ConfirmButton>
        </CenterDiv>
      )}
    </AppContext.Consumer>
  );
}