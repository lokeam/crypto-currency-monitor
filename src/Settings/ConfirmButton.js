import React from 'react';
import { AppContext } from '../AppProvider';
import { fontSize1, greenBoxShadow, color3 } from '../Shared/Styles';
import styled from 'styled-components';

const ConfirmButton = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1}
  padding: 5px;
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