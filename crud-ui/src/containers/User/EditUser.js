import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import APIManager from 'api';
import { setEntities } from 'actions/entities';
import Box from 'components/Box';
import Heading from 'components/Heading';
import Link from 'components/Link';
import Textbox from 'components/Textbox';
import Button from 'components/Button';
import { denormalize } from 'normalizr';
import { USER_SCHEMA } from '../../resources/schemas';

const mapStateToProps = (state, props) => ({
  user: denormalize(props.match.params.userId, USER_SCHEMA, state.entities),
});

const mapDispatchToProps = {
  setEntities,
};

class EditUser extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object,
    setEntities: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      message: null,
      messages: {},
      descripcion: '',
    };
  }

  async componentWillMount() {
    try {
      const data = await APIManager.user.getById(this.props.match.params.userId);
      this.props.setEntities(data);
      this.setState({ isReady: true });
    } catch (err) {
      this.setState({
        messages: err.errors,
      });
    }
  }

  componentDidMount() {
    // this.descripcion.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        descripcion: nextProps.user.clave,
      });
    }
  }

  editUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { userId } = this.props.match.params;
      const [year, month, day] = this.fechanacimiento.value.split('-');
      const date = (year && month && day) ? `${year}-${month}-${day}` : '';

      await APIManager.user.update(
        userId,
        this.clave.value,
        this.nombre.value,
        this.apellido.value,
        date,
      );

      this.props.history.push('/usuarios');
    } catch (err) {
      this.setState({
        messages: err.errors,
      });
    }
  }

  render() {
    if (!this.state.isReady) {
      return <div>Cargando</div>;
    }
    return (
      <Grid>
        <Row center={'xs'}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Heading level={2}>
                <Link to={'/usuarios/'}>Usuarios</Link>
                {' > '}
                Editar usuario
              </Heading>
              <form onSubmit={this.editUser}>
                <Textbox
                  label="Clave"
                  placeholder="Clave"
                  errorMessage={this.state.messages.clave}
                  maxLength={3}
                  textAlign="left"
                  disabled={!this.state.isReady}
                  value={this.props.user.clave}
                  innerRef={(x) => { this.clave = x; }}
                />
                <Textbox
                  label="Nombre"
                  placeholder="Nombre"
                  errorMessage={this.state.messages.nombre}
                  maxLength={20}
                  disabled={!this.state.isReady}
                  value={this.props.user.nombre}
                  innerRef={(x) => { this.nombre = x; }}
                />
                <Textbox
                  label="Apellido"
                  placeholder="Apellido"
                  errorMessage={this.state.messages.apellido}
                  maxLength={20}
                  disabled={!this.state.isReady}
                  value={this.props.user.apellido}
                  innerRef={(x) => { this.apellido = x; }}
                />
                <Textbox
                  label="Fecha de nacimiento"
                  placeholder="Fecha de nacimiento"
                  errorMessage={this.state.messages.fechanacimiento}
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  type="date"
                  disabled={!this.state.isReady}
                  value={this.props.user.fechanacimiento}
                  innerRef={(x) => { this.fechanacimiento = x; }}
                />
                <Row>
                  <Col xs={6}>
                    <Button
                      block
                      onClick={() => this.props.history.push('/usuarios')}
                    >
                      Cancelar
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button block primary type="submit">
                      Actualizar
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUser));
