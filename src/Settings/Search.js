import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

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

export default function() {
  return (
    <SearchGrid>
      <h2>Search for coins</h2>
      <SearchInput />
    </SearchGrid>
  );
}