import React from 'react';
import { AppContext } from './AppProvider';
import styled, { css } from 'styled-components';

const Logo = styled.div`
font-size: 1.5em;
`;

const ControlButtonElement = styled.div`
  cursor: pointer;
  text-transform: capitalize;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 40px 0;

    display: grid;
    grid-template-columns: 180px auto 100px 100px;
  }
`;

function ControlButton({ name, active }) {
  return (
    <AppContext.Consumer>
      {({page, setPage}) => (
        <ControlButtonElement active={page === name}
                              onClick={ () => setPage(name) }>
        {name}
      </ControlButtonElement>
      )}
    </AppContext.Consumer>

  );
}

export default function() {
  return (
    <Nav>
      <ul>
        <li>Navbar - Logo</li>
        <li></li>
        <li>
          <ControlButton active name="dashboard"/>
        </li>
        <li>
          <ControlButton name="settings" />
        </li>
      </ul>
    </Nav>
  )
}