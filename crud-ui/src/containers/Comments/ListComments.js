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
import { setEntities } from 'actions/entities';
import { USER_SCHEMA } from '../../resources/schemas';

const mapStateToProps = (state, props) => ({
  user: denormalize(props.match.params.userId, USER_SCHEMA, state.entities),
});

const mapDispatchToProps = {
  setEntities,
};

class ListComments extends Component {
  static propTypes = {
    user: PropTypes.shape(),
    setEntities: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      message: null,
      messages: {},
    };
  }

  async componentWillMount() {
    this.loadComments();
  }

  loadComments = async () => {
    try {
      const user = await APIManager.user.getById(this.props.match.params.userId);
      this.props.setEntities(user);
      this.setState({ isReady: true });
    } catch (err) {
      this.setState({
        messages: err.errors,
      });
    }
  }

  removeComment = async (id) => {
    try {
      await APIManager.comment.remove(id);
      this.loadComments();
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

    const { user } = this.props;

    const columns = [
      {
        id: 'descripcion',
        text: 'Descripción',
      },
      {
        id: 'estatus',
        text: 'Estatus',
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
                <Link to={'/usuarios/'}>Usuarios</Link>
                {' > '}
                {`Comentarios de ${user.nombre} ${user.apellido}`}
                {' '}
                <small>
                  <Link to={`/usuarios/${this.props.match.params.userId}/comentarios/agregar`}>
                    [Agregar]
                  </Link>
                </small>
              </Heading>
              {
                user.comentarios.length === 0 &&
                (<Alert style={{ textAlign: 'center' }}>
                  {`
                    El usuario aún no cuenta con comentarios,
                    haga click en el enlace superior para 
                    agregar su primer comentario.
                  `}
                </Alert>)
              }
              {
                user.comentarios.length > 0 &&
                <Table
                  columns={columns}
                  data={
                    this.props.user.comentarios.map(comment => ({
                      id: comment.id,
                      highlight: highlightField,
                      row: [
                        {
                          id: 'descripcion',
                          component: comment.descripcion,
                        },
                        {
                          id: 'estatus',
                          component: comment.estatus,
                        },
                        {
                          id: 'meta',
                          component: (
                            <ColumnMeta>
                              <Link to={`/usuarios/${user.id}/comentarios/${comment.id}/editar`}>Editar</Link>
                              <Button
                                danger
                                onClick={() => {
                                  if (window.confirm('¿Está seguro de eliminar este comentario?')) {
                                    this.removeComment(comment.id);
                                  }
                                }}
                              >
                                Eliminar
                              </Button>
                            </ColumnMeta>
                          ),
                        },
                      ],
                    }))
                  }
                />
              }
            </Box>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListComments));
