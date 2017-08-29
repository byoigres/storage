import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table, { ColumnMeta } from 'components/Table';
import Button from 'components/Button';
import Alert from 'components/Alert';
import Link from 'components/Link';
import Heading from 'components/Heading';
import Box from 'components/Box';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import APIManager from 'api';
import { denormalize } from 'normalizr';
import {
  setEntities,
  resetEntity,
} from 'actions/entities';
import { USERS_SCHEMA } from '../../resources/schemas';

const mapStateToProps = state => ({
  users: denormalize(Object.keys(state.entities.users), USERS_SCHEMA, state.entities),
});

const mapDispatchToProps = {
  setEntities,
  resetEntity,
};

class ListUsers extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    setEntities: PropTypes.func.isRequired,
    resetEntity: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      message: null,
      messages: {},
    };
  }

  async componentWillMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      const users = await APIManager.user.list();

      if (!users.entities.users) {
        this.props.resetEntity('users');
      } else {
        this.props.setEntities(users);
      }

      this.setState({ isReady: true });
    } catch (err) {
      this.setState({
        messages: err.errors,
      });
    }
  }

  removeUser = async (id) => {
    try {
      await APIManager.user.remove(id);
      this.loadUsers();
    } catch (err) {
      this.setState({
        messages: err.errors,
      });
    }
  }

  render() {
    if (!this.state.isReady) {
      return (<div>Cargando...</div>);
    }

    const columns = [
      {
        id: 'clave',
        text: 'Clave',
      },
      {
        id: 'nombre',
        text: 'Nombre',
      },
      {
        id: 'apellido',
        text: 'Apellido',
      },
      {
        id: 'fechanacimiento',
        text: 'Fecha de nacimiento',
      },
      {
        id: 'meta',
        text: '',
      },
    ];

    let highlightField = null;

    if (this.props.location.search) {
      const query = this.props.location.search
        .replace('?', '')
        .split('&')
        .reduce((obj, i) => {
          const data = i.split('=');
          const newObj = Object.assign({}, obj);
          newObj[data[0]] = data[1];
          return newObj;
        }, {});

      highlightField = query.highlight;
    }

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Box>
              <Heading level={2}>
                Usuarios
                {' '}
                <small>
                  <Link to="/usuarios/agregar">
                    [Agregar]
                  </Link>
                </small>
              </Heading>
              {
                Object.keys(this.props.users).length === 0 &&
                (<Alert style={{ textAlign: 'center' }}>
                  {`
                    Aún no cuenta con usuarios registrados, 
                    haga click en el enlace superior para 
                    agregar su primer usuario.
                  `}
                </Alert>)
              }
              {
                Object.keys(this.props.users).length > 0 &&
                <Table
                  columns={columns}
                  data={
                    this.props.users.map(user => ({
                      id: user.id,
                      highlight: highlightField,
                      row: [
                        {
                          id: 'clave',
                          component: user.clave,
                        },
                        {
                          id: 'nombre',
                          component: user.nombre,
                        },
                        {
                          id: 'apellido',
                          component: user.apellido,
                        },
                        {
                          id: 'fechanacimiento',
                          component: user.fechanacimiento,
                        },
                        {
                          id: 'meta',
                          component: (
                            <ColumnMeta>
                              <Link to={`/usuarios/${user.id}/comentarios`}>Ver comentarios</Link>
                              <Link to={`/usuarios/${user.id}/editar`}>Editar</Link>
                              <Button
                                danger
                                disabled={user.comentarios.length > 0}
                                onClick={() => {
                                  if (window.confirm('¿Está seguro de eliminar este usuario?')) {
                                    this.removeUser(user.id);
                                  }
                                }}
                              >
                                Eliminar
                              </Button>
                            </ColumnMeta>
                          ),
                        },
                      ],
                    }),
                    )}
                />
              }
            </Box>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListUsers));
