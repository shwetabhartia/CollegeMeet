import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { navigateAboutPage, navigateHomePage } from '../navigation';


class NavItems extends Component {
    handleSelect(e) {
        switch(e) {
            case 1:
            navigateAboutPage();
            break;
            default:
            break;
        }
    }

    handleClick(e) {
        navigateHomePage();
    }

    render() {
        return (
            <div>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a onClick={this.handleClick} href="#">CollegeMeet</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} onSelect={this.handleSelect}>About</NavItem>
                </Nav>
            </div>
        )
    }
}

export default NavItems;