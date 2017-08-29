import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(ReactRouterLink)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: background-color, border-bottom-style 0.5s ease;
  border-bottom: 3px solid transparent;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    border-bottom-style: groove;
    border-bottom-color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;

export default Link;
