import {
  SET_ENTITIES,
  RESET_ENTITIES,
} from '../constants';

export function setEntities(entities) {
  return {
    type: SET_ENTITIES,
    response: entities,
  };
}

export function resetEntity(entity) {
  return {
    type: RESET_ENTITIES,
    entity,
  };
}
