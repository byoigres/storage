import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Navigation from 'components/Navigation';

const GridContainer = styled(Grid)`
  margin-top: 4rem;
`;

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element.isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  };
  render() {
    const { children } = this.props;

    return (
      <GridContainer>
        <Navigation
          isFixed
          title={<Link to="/">CRUD</Link>}
          menuItems={[]}
        />
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {children}
          </Col>
        </Row>
      </GridContainer>
    );
  }
}

export default MainLayout;
