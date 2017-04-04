import { SEND_LOGIN_REQUEST } from '../constants/ActionTypes';

const initialState = {
  remember: false,
  email: '',
  password: ''
};

// remember : Boolean
// email : string
// password : string
export default function login(state = initialState, action) {
  switch (action.type) {
  case SEND_LOGIN_REQUEST:
    return {
      remember: action.remember,
      email: action.email,
      password: action.password
    };
  default:
    return state;
  }
}
