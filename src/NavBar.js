import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    display: grid;
    grid-template-columns: 180px auto 100px 100px;
  }
`;

export default function() {
  return (
    <Nav>
      <ul>
        <li>Navbar - Logo</li>
        <li></li>
        <li>Dashboard</li>
        <li>Settings</li>
      </ul>
    </Nav>
  )
}