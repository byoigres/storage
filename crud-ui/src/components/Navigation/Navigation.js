import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavigationContainer = styled.header`
  top: 0;
  left: 0;
  position: ${p => p.isFixed ? 'fixed' : 'absolute'};
  width: 100%;
  background-color: transparent;
  max-height: 3rem;
  height: 3rem;
  text-align: center;
  background-color: ${p => p.theme.colors.primary};
`;

const NavigationContent = styled.nav`
  display: inline-flex;
  justify-content: space-between;
  max-width: ${p => p.isFixed ? p.theme.mediaQueries.desktopWidth : '100%'};
  width: 100%;
  align-content: center;
`;

const Brand = styled.header`
  font-size: 1.8rem;
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  margin-right: auto;

  > a {
    color: white!important;
    text-decoration: none!important;
  }
`;

const MenuItem = styled.div`
  color: white;
  font-size: 1rem;
  padding: 0;
  display: inline-block;

  > a {
    color: white;
    text-decoration: none;
    display: inline-block;
    padding: 0.9rem;

    transition: 0.5 background-color ease;
    &:hover {
      background-color: ${props => props.theme.colors.primaryDark}
    }
  }
`;

const Navigation = ({ title, isFixed, menuItems }) => (
  <NavigationContainer isFixed={isFixed}>
    <NavigationContent isFixed={isFixed}>
      <Brand>{title}</Brand>
      {menuItems.map((item, index) => <MenuItem key={index}>{item}</MenuItem>)}
    </NavigationContent>
  </NavigationContainer>
);

Navigation.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  isFixed: PropTypes.bool,
  menuItems: PropTypes.array.isRequired,
};

Navigation.defaultProps = {
  isFixed: false,
};

export default Navigation;
