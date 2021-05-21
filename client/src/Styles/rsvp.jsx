import styled from 'styled-components';

export const RSVPModalInput = styled.input`
& {
  margin-left: 10px;
  margin-top: 10px;
  width: 70%;
  font-size: 14px;
  background: transparent;
  border: none;
  color: ${props => props.theme.text};
  border-bottom: 1px solid ${props => props.theme.text};
  font-family: 'Raleway', sans-serif;
  }
&:: placeholder {
  color: rgb(100, 100, 100)
  font-family: 'Raleway', sans-serif;
}
&: focus {
  border-bottom: 1px solid ${props => props.theme.text};
  outline: none;
}
`;