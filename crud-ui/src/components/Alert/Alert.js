import styled from 'styled-components';
import PropTypes from 'prop-types';

const Alert = styled.div`
  color: ${props => props.theme.alert[props.type].text};
  background-color: ${props => props.theme.alert[props.type].background};
  padding: 0.8rem 0.5rem;
  border-radius: .3rem;
`;

Alert.propTypes = {
  children: PropTypes.string.isRequired,

};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
