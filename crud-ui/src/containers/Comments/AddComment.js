import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import APIManager from 'api';
import { setEntities } from 'actions/entities';
import Box from 'components/Box';
import Heading from 'components/Heading';
import Textbox from 'components/Textbox';
import Button from 'components/Button';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setEntities,
};

class AddComment extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    setEntities: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newCommentId: null,
      message: null,
      messages: {},
    };
  }

  componentDidMount() {
    this.descripcion.focus();
  }

  componentDidUpdate() {
    if (this.state.newCommentId) {
      const { userId } = this.props.match.params;
      const { newCommentId } = this.state;
      this.props.history.push(`/usuarios/${userId}/comentarios?highlight=${newCommentId}`);
    }
  }

  addComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const comment = await APIManager.comment.create(
        this.descripcion.value,
        this.props.match.params.userId,
      );

      this.props.setEntities(comment);
      this.setState({
        newCommentId: comment.result,
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
              <Heading level={2}>Agregar comentario</Heading>
              <form onSubmit={this.addComment}>
                <Textbox
                  label="Descripción"
                  placeholder="Escriba su comentario"
                  errorMessage={this.state.messages.descripcion}
                  maxLength={50}
                  textAlign="left"
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddComment));
