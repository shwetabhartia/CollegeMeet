import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './createUserPage.css';

class createUserPage extends Component { 
  render () {
    return(
      <div id="createUserJumbo">
        <Jumbotron>
          <h2>Congratulations on making your account!</h2>
          <h3>Login to view your profile!</h3>
        </Jumbotron>
      </div>
    );
  }
}

export default createUserPage;
