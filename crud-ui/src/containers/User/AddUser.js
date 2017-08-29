import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import APIManager from 'api';
import { setEntities } from 'actions/entities';
import Box from 'components/Box';
import Link from 'components/Link';
import Heading from 'components/Heading';
import Textbox from 'components/Textbox';
import Button from 'components/Button';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setEntities,
};

class AddUser extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    setEntities: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newUserId: null,
      message: null,
      messages: {},
    };
  }

  componentDidMount() {
    this.clave.focus();
  }

  componentDidUpdate() {
    if (this.state.newUserId) {
      this.props.history.push(`/?highlight=${this.state.newUserId}`);
    }
  }

  addUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const [year, month, day] = this.fechanacimiento.value.split('-');
      const date = (year && month && day) ? `${year}-${month}-${day}` : '';

      const user = await APIManager.user.create(
        this.clave.value,
        this.nombre.value,
        this.apellido.value,
        date,
      );

      this.props.setEntities(user);
      this.setState({
        newUserId: user.result,
      });
    } catch (err) {
      this.setState({
        messages: err.errors,
      });
    }
  }

  render() {
    return (
      <Grid>
        <Row center={'xs'}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Heading level={2}>
                <Link to={'/usuarios/'}>Usuarios</Link>
                {' > '}
                Agregar usuario
              </Heading>
              <form onSubmit={this.addUser}>
                <Textbox
                  label="Clave"
                  placeholder="Clave"
                  errorMessage={this.state.messages.clave}
                  maxLength={3}
                  textAlign="left"
                  innerRef={(x) => { this.clave = x; }}
                />
                <Textbox
                  label="Nombre"
                  placeholder="Nombre"
                  errorMessage={this.state.messages.nombre}
                  maxLength={20}
                  innerRef={(x) => { this.nombre = x; }}
                />
                <Textbox
                  label="Apellido"
                  placeholder="Apellido"
                  errorMessage={this.state.messages.apellido}
                  maxLength={20}
                  innerRef={(x) => { this.apellido = x; }}
                />
                <Textbox
                  label="Fecha de nacimiento"
                  placeholder="Fecha de nacimiento"
                  errorMessage={this.state.messages.fechanacimiento}
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  type="date"
                  innerRef={(x) => { this.fechanacimiento = x; }}
                />
                <Row>
                  <Col xs={6}>
                    <Button
                      block
                      onClick={() => this.props.history.push('/')}
                    >
                      Cancelar
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button block primary type="submit">
                      Agregar
                    </Button>
                  </Col>
                </Row>
              </form>
            </Box>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUser));
