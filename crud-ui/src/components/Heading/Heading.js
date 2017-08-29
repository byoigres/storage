import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Heading = ({ children, level, isCentered }) => {
  const Component = styled[`h${level}`]`
    margin: 0 0 1rem 0;
    text-align: ${isCentered ? 'center' : 'left'};
  `;

  return (
    <Component>
      {children}
    </Component>
  );
};

Heading.displayName = 'Heading';

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  level: PropTypes.number.isRequired,
  isCentered: PropTypes.bool,
};

Heading.defaultProps = {
  level: 1,
  isCentered: false,
};

export default Heading;
