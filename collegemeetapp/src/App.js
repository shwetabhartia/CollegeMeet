import React from 'react';
import LoginPage from './login/LoginPage';
import DashboardPage from './dashboard/DashboardPage';
import { connect } from 'react-redux';

import './App.css';

const App = ({ uid }) => (
      <div className="App">
        {uid === '' 
        ?
        <LoginPage>
        </LoginPage>
        :
        <DashboardPage>
        </DashboardPage>
        }
      </div>
);

const mapStateToProps = ({ session }) => ({
  uid: session.uid
})

export default connect(mapStateToProps)(App);

