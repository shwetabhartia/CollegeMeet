import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { sendLoginRequest } from '../actions';
import { store } from '..';


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {email:'', password:''}
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
       this.setState({email: e.target.value})
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value})
    }

    handleSubmit(e) {
        let email = this.state.email;
        let password = this.state.password;
        this.setState({email: '', password: ''});
        store.dispatch(sendLoginRequest(email, password));
    }

    render() {
        return (
            <Navbar.Form pullRight>
                <FormGroup>
                    <FormControl type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    {' '}
                    <FormControl type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </FormGroup>
                {' '}
                <Button bsStyle="primary" onClick={this.handleSubmit}>Login</Button>
            </Navbar.Form>
        )
    }
}

export default LoginForm;