import { combineReducers } from 'redux';
import login from './loginReducer';
import userPage from './userPageReducer';
import topicPage from './topicPageReducer';
import session from './session';
import dashboardPage from './dashboard';

const rootReducer = combineReducers({
  login,
  userPage,
  topicPage,
  dashboardPage,
  session
});

export default rootReducer;
