import { FETCH_POSTS } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload.components
      };
    default:
      return state;
  }
}
