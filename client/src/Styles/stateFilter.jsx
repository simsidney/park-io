import styled from 'styled-components';

export const StateFilterSelect = styled.select`
  & {
    display: flex;
    place-items: center;
    place-content: center;
    border: 2px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #0056c5;
    width: 100%;
    height: 40px;
    font-family: 'Raleway', sans-serif;
    font-size: 1em;
    font-weight: bold;
    transition: background 0.5s;
  }
`;