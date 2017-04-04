import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root';
import UserPage from './user/UserPage';
import TopicPage from './topic/TopicPage';
import AboutPage from './about/AboutPage';
import createUserPage from './login/createUserPage';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { persistStore } from 'redux-persist'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export const store=configureStore();

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRoute component={App} />
        <Route path="/about" component={AboutPage} />
        <Route path="/user" component={UserPage}>
          <Route path="/user/:uid" component={UserPage} />
        </Route>
        <Route path="/topic" component={TopicPage}>
          <Route path="/topic/:name" component={TopicPage} />
        </Route>
        <Route path="/createUser" component={createUserPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

