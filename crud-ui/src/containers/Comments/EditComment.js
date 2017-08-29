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
import { COMMENT_SCHEMA } from '../../resources/schemas';

const mapStateToProps = (state, props) => ({
  comment: denormalize(props.match.params.commentId, COMMENT_SCHEMA, state.entities),
});

const mapDispatchToProps = {
  setEntities,
};

class EditComment extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    comment: PropTypes.object,
    setEntities: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    comment: null,
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
      const { commentId, userId } = this.props.match.params;
      const comment = await APIManager.comment.getByCommentAndUserId(
        commentId,
        userId,
      );

      this.props.setEntities(comment);
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
    if (nextProps.comment) {
      this.setState({
        descripcion: nextProps.comment.descripcion,
      });
    }
  }

  editComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { commentId, userId } = this.props.match.params;
      await APIManager.comment.update(
        commentId,
        userId,
        this.descripcion.value,
      );
      this.props.history.push(`/usuarios/${this.props.match.params.userId}/comentarios`);
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
                <Link to={`/usuarios/${this.props.match.params.userId}/comentarios`}>Comentarios</Link>
                {' > '}
                Editar comentario
              </Heading>
              <form onSubmit={this.editComment}>
                <Textbox
                  label="Descripción"
                  placeholder="Escriba su comentario"
                  errorMessage={this.state.messages.descripcion}
                  maxLength={50}
                  disabled={!this.state.isReady}
                  textAlign="left"
                  value={this.props.comment.descripcion}
                  innerRef={(x) => { this.descripcion = x; }}
                />
                <Row>
                  <Col xs={6}>
                    <Button
                      block
                      onClick={() => this.props.history.push(`/usuarios/${this.props.match.params.userId}/comentarios`)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditComment));
