import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  display: block;
  font-weight: bold;
  text-align: ${props => props.textAlign};
  text-transform: uppercase;
`;

const ErrorMessage = styled.label`
  color: red;
  display: block;
  text-align: ${props => props.textAlign || 'left'};
  max-height: 3125rem;
  visibility: ${props => props.children ? 'visible' : 'hidden'};
`;

const Input = styled.input`
  background-color: transparent;
  outline: none;
  border: 0;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.primary};
  border-bottom: 0.0625rem solid #aaa;
  box-shadow: 0 0 0 0 #ddd inset;
  padding-top: 0;
  padding-right: 0.3125rem;
  padding-left: 0.3125rem;
  padding-bottom: 0.0625rem;
  text-align: ${props => props.textAlign};
  width: 100%;
  margin-bottom: ${props => props.errorMessage ? '0' : '1.3125rem'};

  &:focus {
    border-bottom-width: 0.125rem;
    padding-bottom: 0;
    border-bottom-color: ${props => props.theme.colors.primary};
  }
`;

const TextboxContainer = styled.div`
  padding: 0.5rem 0;
`;

const Textbox = ({ label, value, type, errorMessage, innerRef, textAlign, ...rest }) => (
  <TextboxContainer>
    <Label textAlign={textAlign}>{label}</Label>
    <Input
      type={type}
      defaultValue={value}
      textAlign={textAlign}
      innerRef={innerRef}
      errorMessage={errorMessage}
      {...rest}
    />
    <ErrorMessage>{errorMessage}</ErrorMessage>
  </TextboxContainer>
);

Textbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  innerRef: PropTypes.func,
  textAlign: PropTypes.string,
};

Textbox.defaultProps = {
  label: '',
  value: null,
  type: 'text',
  errorMessage: null,
  innerRef: null,
  textAlign: 'left',
};

export default Textbox;
