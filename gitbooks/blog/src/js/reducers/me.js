import Types from '../actionTypes';
import { combineReducers } from 'redux'

function ceshi(state = {
  name: ''
}, action) {
  switch (action.type) {
    case Types.CESHI:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  ceshi
});
