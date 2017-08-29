import {
  SET_ENTITIES,
  RESET_ENTITIES,
} from '../constants';

const initialState = {
  users: {},
  comments: {},
};

const entities = (state = initialState, action) => {
  if (action.type === SET_ENTITIES && action.response) {
    if (Array.isArray(action.response)) {
      return action.response.reduce((prev, current) =>
        Object.assign({}, prev, current.entities), state);
    }

    if (action.response.entities) {
      return Object.assign({}, state, action.response.entities);
    }
  }

  if (action.type === RESET_ENTITIES) {
    return Object.assign({}, state, {
      users: initialState.users,
    });
  }

  return state;
};

export default entities;
