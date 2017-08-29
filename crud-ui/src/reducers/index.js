import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import entities from './entities';

const reducers = combineReducers({
  routing,
  entities,
});

export default reducers;
