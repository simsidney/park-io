import styled, { createGlobalStyle } from 'styled-components';
import React from 'react';

export const Body = createGlobalStyle`
  body {
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 18px;
    margin: 0px;
    scroll-behavior: smooth;
  }

  .rsvpModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: 500ms ease-in-out;
    z-index: 5
  }

  .rsvpModalOverlay-in {
    opacity: 1;
  }

  .rsvpModalOverlay-out {
    opacity: 0;
  }
`;

export const dark = {
  border: '#002a60',
  outline: '#cccccc',
  text: '#cccccc',
  alphaBg: 'rgba(17, 17, 17, 0.5)',
  bg: 'rgb(17, 17, 17)',
  bluGry: '#cccccc',
  blkGry: '#cccccc',
  invertWht: 1,
  faintBluGry:'rgba(205, 227, 253, 0.33)'
}