import styled from 'styled-components';
import { darken } from 'polished';

const Button = styled.button.attrs({
  type: 'button',
})`
  font-family: '${props => props.theme.fonts.primary}';
  background-color: ${(props) => {
    if (props.primary) {
      return props.theme.colors.primary;
    }

    if (props.danger) {
      return props.theme.alert.error.background;
    }

    return 'white';
  }};
  color: ${(props) => {
    if (props.primary || props.danger) {
      return 'white';
    }

    return props.theme.colors.primary;
  }};
  ${props => props.block ? 'display: block; width: 100%;' : ''}
  font-size: 0.8em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => {
    if (props.primary) {
      return props.theme.primaryColor;
    }

    if (props.danger) {
      return props.theme.alert.error.background;
    }

    return props.theme.colors.primary;
  }};
  border-radius: 0.3125rem;
  text-transform: uppercase;

  transition: all 0.5s ease;

  &:hover {
    color: white;
    background-color: ${(props) => {
    if (props.primary) {
      return props.theme.colors.primaryDark;
    }

    if (props.danger) {
      return darken(0.2, props.theme.alert.error.background);
    }

    return props.theme.colors.primaryDark;
    // (props.primary ? props.theme.colors.primaryDark : props.theme.colors.primaryDark)
  }};
    cursor: pointer;
    box-shadow: 4px 4px 20px 0px rgba(0,0,0,0.25);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #C1C1C1;
    border-color: grey;
    color: white;
    cursor: not-allowed;
  }
`;

export default Button;
