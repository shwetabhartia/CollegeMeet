import { START_SESSION } from '../constants/ActionTypes.js';

const initialState = {
  email: '',
  uid: ''
};

export default function session(state = initialState, action) {
  switch(action.type) {
  case START_SESSION:
    return {
      ...state,
      email: action.email,
      uid: action.uid
    };
  default:
    return state;
  }
};
