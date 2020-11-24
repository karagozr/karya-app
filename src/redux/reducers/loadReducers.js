import { loadConstants as type } from '../constants';

export default function(state = 0, action) {
  switch (action.type) {
    case type.OPEN_LOAD:
      return state = state+1;
    case type.CLOSE_LOAD:
      return state===0?0:state = state-1;
    default:
      return state;
  }
}