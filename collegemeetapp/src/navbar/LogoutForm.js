import React, { Component } from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';
import { startSession } from '../actions';
import { store } from '..';
import { navigateHomePage, navigateUserPage } from '../navigation';


class LogoutForm extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        store.dispatch(startSession('', ''))
        this.forceUpdate()
        navigateHomePage()
    }

    handleSelect(e) {
        switch(e) {
            case 1:
                navigateUserPage(store.getState().session.uid)
                break;  
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <Navbar.Form pullRight>
                    <Button bsStyle="primary" onClick={this.handleLogout}>Logout</Button>
                </Navbar.Form>
                <Nav pullRight>
                    <NavItem eventKey={1} onSelect={this.handleSelect}>Profile</NavItem>
                </Nav>
            </div>
        )
    }
}

export default LogoutForm;