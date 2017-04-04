import React, { Component } from 'react';
import { store } from '../index';
import { PageHeader, Button, FormGroup, Form, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { sendCreateUserRequest } from '../actions/index';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {email:'', password:'', firstname:'', lastname:'', description:''}
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }


  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleFirstNameChange(e) {
    this.setState({firstname: e.target.value})
  }

  handleLastNameChange(e) {
    this.setState({lastname: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleSubmit(e) {
    store.dispatch(sendCreateUserRequest(this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.description))
    this.setState({email: '', password: '', firstname: '', lastname: '', description: ''})
    browserHistory.push('/createUser')
  }

  render() {
    return (
      <div className="Login" id="inner">
        <PageHeader>Sign Up<br /><small>It's free, and always will be.</small></PageHeader>
        <Form>
            Email
            <FormGroup>
              <FormControl type="text" placeholder='email@domain.edu' value={this.state.email} onChange={this.handleEmailChange}/>
            </FormGroup>
            {' '}
            Password
            <FormGroup>
              <FormControl type="password" placeholder='password' value={this.state.password} onChange={this.handlePasswordChange}/>
            </FormGroup>
            {' '}
            First Name
            <FormGroup>
              <FormControl type="text" placeholder='First Name' value={this.state.firstname} onChange={this.handleFirstNameChange}/>
            </FormGroup>
            {' '}
            Last Name
            <FormGroup>
              <FormControl type="text" placeholder='Last Name' value={this.state.lastname} onChange={this.handleLastNameChange}/>
            </FormGroup>
            {' '}
            A short description of yourself
            <FormGroup>
              <FormControl id="description" type="text" placeholder='Description' value={this.state.description} onChange={this.handleDescriptionChange}/>
            </FormGroup>
            <Button bsStyle="success" bsSize="large" onClick={this.handleSubmit}>
              Sign Up
            </Button>
          </Form>
      </div>
    )
  }
};

export default LoginPage;
