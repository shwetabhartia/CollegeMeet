import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import NavItems from './NavItems';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import './Navbar.css';

const AppNavbar = ({ uid }) => (
    <div>
        <Navbar inverse>
            <NavItems></NavItems>
            {uid === ''
            ? <LoginForm></LoginForm>
            : <LogoutForm></LogoutForm>}
        </Navbar>
    </div>
)

const mapStateToProps = ({ session }) => ({
    uid: session.uid
})

export default connect(mapStateToProps)(AppNavbar);